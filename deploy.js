// Hexo 博客生成和部署脚本
const Hexo = require('hexo');

async function deploy() {
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

  console.log('部署到 GitHub Pages...');
  await hexo.call('deploy', {});

  console.log('部署完成！');
  console.log('博客地址: https://iyangjialin.github.io');
  process.exit(0);
}

deploy().catch(err => {
  console.error('错误:', err);
  process.exit(1);
});
