// Hexo 博客生成脚本
const Hexo = require('hexo');

async function generate() {
  console.log('初始化 Hexo...');
  const hexo = new Hexo(__dirname, {});

  await hexo.init();

  // 手动加载渲染器
  console.log('加载渲染器...');
  await hexo.loadPlugin(require.resolve('hexo-renderer-marked'));
  await hexo.loadPlugin(require.resolve('hexo-renderer-ejs'));
  await hexo.loadPlugin(require.resolve('hexo-renderer-stylus'));

  await hexo.load();

  console.log('生成静态文件...');
  await hexo.call('generate', {});

  console.log('生成完成！');
  process.exit(0);
}

generate().catch(err => {
  console.error('错误:', err);
  process.exit(1);
});
