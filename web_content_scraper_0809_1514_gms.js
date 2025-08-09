// 代码生成时间: 2025-08-09 15:14:51
const https = require('https');
const fs = require('fs');
const { URL } = require('url');

// 定义错误处理函数
function handleError(error) {
  console.error('An error occurred:', error.message);
}

// 定义网页内容抓取函数
function scrapeWebContent(url, outputPath) {
  // 确保URL格式正确
  try {
    const parsedUrl = new URL(url);
    if (!parsedUrl.protocol.startsWith('https')) {
      throw new Error('Only HTTPS protocol is supported');
    }
  } catch (error) {
    handleError(error);
    return;
  }

  // 发送HTTPS请求
  https.get(url, (response) => {
    const { statusCode } = response;
    if (statusCode !== 200) {
      const error = new Error(`Server responded with status code ${statusCode}`);
      handleError(error);
      return;
    }

    // 打开文件流准备写入内容
    const fileStream = fs.createWriteStream(outputPath);
    response.pipe(fileStream);
    fileStream.on('finish', () => {
      fileStream.close();
      console.log('Content scraped and saved to:', outputPath);
    });
  });
}

// 示例用法
const url = 'https://www.example.com';
const outputPath = 'output.html';
scrapeWebContent(url, outputPath);

// 模块导出
module.exports = {
  scrapeWebContent
};