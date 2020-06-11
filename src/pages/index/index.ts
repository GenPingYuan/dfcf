import {getUserTz} from "@/api";

require("./index.less")

class index {

    userConfig: Object[];

    timer: number  = 5;

    constructor() {
        document.body.insertAdjacentHTML("beforeend",require("./index.ejs")());
        this.init()
    }

    template(res: userTzResp): string {
        let temp = new Array();
        let {user_id, user_nickname} = res.data.re[0].post_user;
        let htmlt = this.optionTemp(res);
        if (document.getElementById(user_id)) {
            document.getElementById(user_id).innerHTML = htmlt;
            return "";
        } else {
            temp.push(`<div class="tz card col-lg-3  float-left">
                       <div class="card-title text-center h3">${user_nickname}</div>
                       <div class="card-body" id="${user_id}">${htmlt}</div>
                   </div>`);
            return temp.join("");
        }
    }

    optionTemp(res: userTzResp): string {
        let temp = new Array();

        res.data.re.map(tz => {
            temp.push(`<div class="card">
                            <div class="col-lg-12">标题: ${tz.post_title}</div>
                           <div class="col-lg-12">时间：${tz.post_publish_time}</div>
                           <div class="col-lg-12">股票：<i class="alert-danger">${tz.post_guba.stockbar_code}-${tz.post_guba.stockbar_name}</i></div>
                        </div>
                        `
            )
        });
        return temp.join("")
    }

    init() {
        this.userConfig = <Object[]>require("@/config/userConfig.js");
        this.refreshData();

        setInterval(() => {
            document.getElementById("timer").innerText = this.timer + "";
            this.timer --;
            if(this.timer === 0) {
                this.refreshData();
                this.timer = 5;
            }
        }, 1000)
    }

    refreshData() {
        this.userConfig.map(user => {
            getUserTz(user["userId"],20).then((res) => {
                document.body.insertAdjacentHTML("beforeend", this.template(res))
            })
        })
    }
}

new index()