var apis = apis || {};
exports.apis = apis;

apis.contentHeader = { 'Content-Type': 'application/json' };

// 微信API接口地址
var wechatBaseUrl = 'https://api.weixin.qq.com/cgi-bin/';
// 微信appid
apis.appid = "wx4ce4c73bd3de16d8";
// 微信appsecret
apis.appsecret = "8870969e8a9b730a23356303a51673f1";
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
