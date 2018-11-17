var apis = apis || {};
exports.apis = apis;

apis.contentHeader = { 'Content-Type': 'application/json' };

// 微信API接口地址
var wechatBaseUrl = 'https://api.weixin.qq.com/cgi-bin/';
// 微信appid
apis.appid = "wx43a1633aa2771da3";
// 微信appsecret
apis.appsecret = "9167374ec28ad0492ae5abad4e7517e7";
// 获取微信access_token
apis.AccessTokenUrl = wechatBaseUrl + "token";
apis.GetAccessToken = { url: apis.AccessTokenUrl, method: "GET", headers: apis.contentHeader };

// 获取微信ticket
apis.TicketUrl = wechatBaseUrl + "ticket/getticket";
apis.GetTicket = { url: apis.TicketUrl, method: "GET", headers: apis.contentHeader };

// 登陆验证url
apis.authorizeUrl = ({ redirect_uri, scope }) => {
    return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${apis.appid}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`;
}

// 获取openid
apis.GetOpenId = (code) => {
    return {
        url: `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${apis.appid}&secret=${apis.appsecret}&code=${code}&grant_type=authorization_code`,
        method: "GET",
        headers: apis.contentHeader
    }
}

//商城地址
apis.mallBase = 'http://192.168.50.52';
// 优惠券地址
apis.mallUrl = '/coupon/getActiveCoupon';
// pms专题地址
apis.pmsBase = 'http://192.168.60.11:8184';
// 获取优惠券
apis.getActiveCouponUrl = apis.mallBase + apis.mallUrl;
apis.getActiveCoupon = { url: apis.getActiveCouponUrl, method: "GET", headers: apis.contentHeader };
