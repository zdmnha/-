// 京东口令
// [rule: raw [\s\S]*[(|)|#|@|$|%|¥|￥|!|！]([0-9a-zA-Z]{10,14})[(|)|#|@|$|%|¥|￥|!|！][\s\S]*]

var jcode = param(1);

function main() {
    var ret = call("jd_cmd")(jcode)
    var exports = {}
    if (!ret) {
        return
    }
    queries = ret.queries
    //cj组队瓜分
    if (ret.raw.indexOf("https://cjhydz-isv.isvjcloud.com/wxTeam/activity") != -1) {
        exports["jd_cjhy_activityId"] = queries["activityId"]
    }
    //zd组队瓜分
    if (ret.raw.indexOf("https://lzkjdz-isv.isvjcloud.com/wxTeam/activity2") != -1) {
        exports["jd_zdjr_activityId"] = queries["activityId"]
    }
    //集卡抽奖
    if (ret.raw.indexOf("https://lzkjdz-isv.isvjcloud.com/wxCollectCard/activity") != -1) {
        exports["M_WX_COLLECT_CARD_URL"] = ret.raw
    }
    //开卡有礼
    if (ret.raw.indexOf("https://cjhy-isv.isvjcloud.com/wxInviteActivity/openCard/invitee/7914251") != -1) {
        exports["VENDER_ID"] = queries["venderId"]
    }
    //微订制
    if (ret.raw.indexOf("https://cjhydz-isv.isvjcloud.com/microDz/invite/activity/wx/view/index/5695831") != -1) {
        exports["jd_cjhy_activityId60"] = queries["activityId"]
    }
    //分享有礼
    if (ret.raw.indexOf("https://lzkjdz-isv.isvjcloud.com/wxShareActivity/activity/7902457") != -1) {
        exports["jd_fxyl_activityId"] = queries["activityId"]
    }
    //加购有礼
    if (ret.raw.indexOf("https://lzkj-isv.isvjcloud.com/wxCollectionActivity/activity") != -1) {
        exports["M_WX_ADD_CART_URL"] = ret.raw
    }
    if (ret.raw.indexOf("https://lzkj-isv.isvjcloud.com/lzclient") != -1) {
        exports["M_WX_LUCK_DRAW_URL"] = ret.raw
    }
    //加购有礼2
    if (ret.raw.indexOf("https://lzkj-isv.isvjcloud.com/wxCollectionActivity/activity2") != -1) {
        exports["M_WX_ADD_CART_URL"] = ret.raw
    }
    var text = []
    for (var key in exports) {
        text.push(fmt.Sprintf("export %s=\"%s\"", key, exports[key]))
    }
    if(text.length==0){
        sendText(ret.raw)
    }else{
        var ret = text.join("\n")
        sendText(ret)
        breakIn(ret)
    }
}

main()
