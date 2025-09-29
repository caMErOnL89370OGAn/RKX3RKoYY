// 代码生成时间: 2025-09-29 19:14:29
// tab_switcher.js
// 一个简单的标签页切换器，使用Node.js和Express框架

const express = require('express');
const app = express();
const port = 3000;

// 用于存储标签页状态的对象
const tabs = {
  'tab1': '内容1',
  'tab2': '内容2',
  'tab3': '内容3'
};

// 启动服务器时的回调函数
app.listen(port, () => {
  console.log(`标签页切换器服务器运行在 http://localhost:${port}`);
});

// 根路由，用于展示标签页切换器的界面
app.get('/', (req, res) => {
  res.send(
    '<h1>标签页切换器</h1>' +
    '<ul>' +
    '<li><a href="/tab1">标签1</a></li>' +
    '<li><a href="/tab2">标签2</a></li>' +
    '<li><a href="/tab3">标签3</a></li>' +
    '</ul>'
  );
});

// 动态路由，根据请求的标签页返回对应的内容
app.get('/tab:tabId', (req, res) => {
  const { tabId } = req.params;
  // 检查标签页是否存在
  if (tabs[tabId]) {
    res.send(`<h2>标签页内容：${tabId}</h2><p>${tabs[tabId]}</p>`);
  } else {
    // 如果标签页不存在，返回404错误
    res.status(404).send('标签页不存在');
  }
});

// 错误处理中间件，捕捉所有未处理的请求
app.use((req, res, next) => {
  res.status(404).send('请求的资源不存在');
});
