项目简介
========
一个简单的Express + MySQL的微信投票系统

启动方式
========
1. 在根目录运行`npm install`安装NodeJS依赖模块
2. 在根目录运行`npm start`启动服务
3. 在浏览器打开 [http://localhost:3001/](http://localhost:3001/) 

技术要点
=======
1. 对接了微信自定义分享，前端微信配置文件封装在/public/common/js/public.js下
2. 使用了NodeJS作为中间件，调用.NET或JAVA接口获取数据
3. NodeJS端获取微信签名中间件封装在/core/common/getSignature.js下

项目结构
========
注：core、public、routes、views下每一个文件夹对应一个模块

- /bin/www —— 端口配置文件
- /common —— 日志配置，错误配置等文件
- /core —— 中间件文件夹
	- /core/common —— 公共中间件
	- /core/api.js —— 接口地址配置文件
- /node_modules —— nodejs依赖模块
- /public/ —— 静态文件夹
	- /public/common —— 公共静态文件
- /routes/ —— 路由配置
	- /routes/common —— 公共中间件的路由配置
- /views/ —— 视图文件夹
	- /views/error.html —— 错误视图
