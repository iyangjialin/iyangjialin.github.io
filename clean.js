// Hexo 清理脚本
const Hexo = require('hexo');

async function clean() {
  console.log('清理缓存文件...');
  const hexo = new Hexo(__dirname, {});
  await hexo.init();
  await hexo.call('clean', {});
  console.log('清理完成！');
  process.exit(0);
}

clean().catch(err => {
  console.error('错误:', err);
  process.exit(1);
});
