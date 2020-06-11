declare interface user {
    user_age: string,
    user_bizflag: string,
    user_bizsubflag: string,
    user_black_type: string,
    user_extendinfos: string,
    user_first_en_name: string,
    user_id: string,
    user_influ_level: string,
    user_is_majia: string,
    user_level: string,
    user_medal_details: string,
    user_name: string,
    user_nickname: string,
    user_third_intro: string,
    user_type: string,
    user_v: string
}

declare interface guba {
    /**
     * 股票代码
     */
    stockbar_code: string,
    /**
     * 股票名称
     */
    stockbar_name: string
}


declare interface tz {
    /**
     * 帖子唯一ID
     */
    post_id: number,
    /**
     * 发布标题
     */
    post_title: string,
    /**
     * 发布内容
     */
    post_content: string,
    /**
     * 发布时间
     */
    post_publish_time: string,

    post_guba: guba,

    post_user: user
}


declare interface userTzResp {
    data: { re: tz[] }
}