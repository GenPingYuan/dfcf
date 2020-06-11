import 'whatwg-fetch';
const headers = {
    "md5": "GYWmhK2MfuQtDc9Cj8Fbw9hGoJwQ+f3WFMKqPE+Ike79ZOfdpQ867g==",
    "Content-Type": "application/json"
}



function get(prefix) {
    prefix = prefix || "";
    return (url, loading: boolean = true) => {
        url = prefix + url;
        console.log(url)
        // window.Epg.Util.printText("请求链接：" + url);
        return fetch(url, {
            credentials: 'include',
            headers
        }).then((res) => {
            // console.log(res);
            // debugger;
            return res.json();
        }).catch((reason) => {
            // console.log("请求错误：" + reason);
        })
    }
}



function obj2params(paramObj) {
    var param = "";
    for (let item in paramObj) {
        param += "&" + item + "=" + paramObj[item];
    }
    param = param.slice(1);
    return param;
}
function post(prefix) {
    prefix = prefix || "";
    return (url, paramObj) => {
        url = prefix + url;
        return fetch(url, {
            method: "POST",
            credentials: "include",
            headers,
            body: JSON.stringify(paramObj)
        }).then((res) => {
            return res.json();
        })
    }
}


export { get, post }