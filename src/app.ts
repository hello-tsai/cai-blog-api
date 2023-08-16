import Koa from 'koa';import router from './routes';import cors from '@koa/cors';import https from 'https';const fs = require('fs');// 使用默认配置const app = new Koa();app.proxy = true; // 信任代理头部app.use(router.routes()).use(router.allowedMethods());app.use(async ctx => {  ctx.body = 'Hello from Koa and TypeScript!';});let PORT =  8083if (process.env.NODE_ENV === 'production') {  // 或者自定义配置  app.use(cors({      origin: 'https://github.com',  // 允许来自特定域名请求      maxAge: 5,  // 秒为单位      credentials: true,  // 允许发送Cookie  }));  // 读取SSL证书文件  const options = {    key: fs.readFileSync('./server/server.key'),   // 私钥路径    cert: fs.readFileSync('./server/server.csr')  // 公钥证书路径  };// 创建HTTPS服务器  https.createServer(options, app.callback()).listen(PORT, () => {    console.log(`Koa HTTPS server is running on https://localhost:${PORT}`);  });}else {  // 此处是测试环境的配置和中间件  app.use(cors());  PORT =  9093  app.listen(PORT,'0.0.0.0', () => {    console.log(`Server is running on http://localhost:${PORT}`);  });}