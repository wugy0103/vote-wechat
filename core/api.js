var apis = apis || {};
exports.apis = apis;

apis.contentHeader = { 'Content-Type': 'application/json' };

// 微信API接口地址
var wechatBaseUrl = 'https://api.weixin.qq.com/cgi-bin/';
// 微信appid
apis.appid = "wx28f1b8e6ba03bc93";
// 微信appsecret
apis.appsecret = "0897e14c100d352d2bd45f4454e8bd30";
// 获取微信access_token
apis.AccessTokenUrl = wechatBaseUrl+"token";
apis.GetAccessToken = { url: apis.AccessTokenUrl, method: "GET", headers: apis.contentHeader };

// 获取微信ticket
apis.TicketUrl = wechatBaseUrl+"ticket/getticket";
apis.GetTicket = { url: apis.TicketUrl, method: "GET", headers: apis.contentHeader };

//商城地址
apis.mallBase = 'http://192.168.50.52';
// 优惠券地址
apis.mallUrl = '/coupon/getActiveCoupon';
// pms专题地址
apis.pmsBase = 'http://192.168.60.11:8184';
// 获取优惠券
apis.getActiveCouponUrl = apis.mallBase + apis.mallUrl;
apis.getActiveCoupon = { url: apis.getActiveCouponUrl, method: "GET", headers: apis.contentHeader };
