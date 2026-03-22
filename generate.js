// Hexo 博客生成脚本
const Hexo = require('hexo');

async function generate() {
  console.log('初始化 Hexo...');
  const hexo = new Hexo(__dirname, {});

  await hexo.init();
  
  // 加载所有插件
  console.log('加载插件...');
  await hexo.loadPlugin(require.resolve('hexo-renderer-marked'));
  await hexo.loadPlugin(require.resolve('hexo-renderer-ejs'));
  await hexo.loadPlugin(require.resolve('hexo-renderer-stylus'));
  await hexo.loadPlugin(require.resolve('hexo-generator-archive'));
  await hexo.loadPlugin(require.resolve('hexo-generator-category'));
  await hexo.loadPlugin(require.resolve('hexo-generator-tag'));
  await hexo.loadPlugin(require.resolve('hexo-generator-sitemap'));
  await hexo.loadPlugin(require.resolve('hexo-generator-feed'));
  await hexo.loadPlugin(require.resolve('hexo-generator-searchdb'));
  
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
