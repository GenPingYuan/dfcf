const path = require("path");
var glob = require("globby");
const { AutoWebPlugin } = require("web-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const autoPlugin = new AutoWebPlugin("./src/pages", {
  template: function(pageName) {
      return path.resolve(__dirname, "index.html");
  }
});

// CSS入口配置
var CSS_PATH = {
  css: {
    pattern: ["./src/theme/[^_]*.less"],
    src: path.join(__dirname, "src"),
    dst: path.resolve(__dirname, "./dist")
  }
};

// 遍历除所有需要打包的CSS文件路径
function getCSSEntries(config) {
  var fileList = glob.sync(config.pattern);
  var entry = fileList.reduce(function(previous, current) {
    var filePath = path.parse(path.relative(config.src, current));
    var withoutSuffix = path.join(filePath.dir, filePath.name);
    previous[withoutSuffix] = path.resolve(__dirname, current);
    return previous;
  }, {});
  return entry;
}


var lessLoader = {
    test: /\.(le|c)ss$/,
    use: ExtractTextPlugin.extract({
      use: [
        "css-loader",
        "postcss-loader"
      ]
    })
}

var resolveConfig = {
    extensions: [".ts", ".js", ".json", ".png"],
    alias: {
      "@": path.resolve(__dirname, "src/"),
    }
}

let urlLoader = function(publicPath){
    return {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 0,
              // outputPath: '/',  //通过该属性设置，打包输出的路径多一层
              name: "[path][name].[ext]",
              publicPath: publicPath
            }
          }
        ]
      }
}

var cssModule = {
  devtool: "cheap-module-eval-source-map",
  context: path.resolve(__dirname),
  entry: getCSSEntries(CSS_PATH.css),
  output: {
    path: CSS_PATH.css.dst,
    filename: "[name].css"
  },
  module: {
    rules: [
      lessLoader,
      urlLoader("../")
    ]
  },
  resolve: resolveConfig,
  plugins: [new CleanWebpackPlugin(), new ExtractTextPlugin("[name].css")]
};


var jsModule = {
  entry: autoPlugin.entry(),
  // entry: path.resolve(__dirname,"./src/pages/index/index.tsx"),
  output: {
    filename: "[name][hash:8].js",
    path: path.resolve(__dirname, "./dist")
  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader"
        ],
        exclude: [/node_modules/]
      }
      ,{
        test: /\.ts$/,
        use: ["babel-loader", "awesome-typescript-loader"]
        // use: ["awesome-typescript-loader"],
        // exclude: [/node_modules/]
      },
      {
        test: /\.js$/,
        use: ["babel-loader"]
      },
      {
        test: /\.ejs$/,
        use: ["ejs-compiled-loader"]
        // exclude: [/node_modules/]
      },
      {
        test: /\.json$/,
        use: ["json-loader"]
      },
      {
        test: /\.yaml$/,
        use: ["json-loader", "yaml-loader"]
      },
      urlLoader("./")
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name][hash:8].css"
    }),
    autoPlugin
  ],
  resolve: resolveConfig,
  devtool: "source-map",

  performance: {
    maxAssetSize: 300000, // 整数类型（以字节为单位）
    maxEntrypointSize: 500000 // 整数类型（以字节为单位）
  },
  devServer: {
    host: "0.0.0.0",
    port: 6789,
    // hot: false,
    // inline: false,
    proxy: {
      "/api": {
        target: "https://i.eastmoney.com/",
        changeOrigin: true,
        secure: true // 接受 运行在 https 上的服务
      }

    }
  }
};

// module.exports = [cssModule,jsModule];
module.exports = [jsModule];

