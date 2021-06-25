const config = require("./config/app");
const app = require("../app");

const { connectToDB } = require("../src/loaders/mongoose");
// // 连接数据库 监听 可以放在src的index里 也可以放在最外面与src平行的index.js
connectToDB();

async function startServer() {
  app.listen(config.port, (err) => {
    if (err) {
      process.exit(1);
      return;
    }
    console.log(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `);
  });
}

startServer();
