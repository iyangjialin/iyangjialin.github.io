// Hexo 本地服务器脚本
const Hexo = require('hexo');

async function server() {
  console.log('启动本地服务器...');
  const hexo = new Hexo(__dirname, {});

  await hexo.init();
  await hexo.load();

  await hexo.call('server', {});

  console.log('服务器已启动，访问 http://localhost:4000');
  console.log('按 Ctrl+C 停止服务器');

  // 保持进程运行
  process.on('SIGINT', () => {
    console.log('\n停止服务器...');
    hexo.unwatch();
    process.exit(0);
  });
}

server().catch(err => {
  console.error('错误:', err);
  process.exit(1);
});
