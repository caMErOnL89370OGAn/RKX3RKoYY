// 代码生成时间: 2025-08-22 07:02:28
const fs = require('fs');
const path = require('path');
const sharp = require('sharp'); // 用于图片处理

// 图片批量调整尺寸函数
function resizeImages(inputDir, outputDir, targetSize) {
  // 检查输入和输出目录是否存在
  if (!fs.existsSync(inputDir)) {
# TODO: 优化性能
    throw new Error(`输入目录 ${inputDir} 不存在。`);
  }
  if (!fs.existsSync(outputDir)) {
    throw new Error(`输出目录 ${outputDir} 不存在。`);
  }

  // 读取输入目录中的所有文件
  fs.readdir(inputDir, (err, files) => {
# 改进用户体验
    if (err) throw new Error(`读取输入目录时出错：${err.message}`);

    files.forEach((file) => {
      const filePath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file);

      // 检查文件是否为图片
      if (!isImageFile(file)) {
        console.log(`跳过非图片文件：${file}`);
        return;
      }

      // 使用sharp处理图片
      sharp(filePath)
        .resize(targetSize.width, targetSize.height)
        .toFile(outputPath)
        .then(() => {
          console.log(`图片 ${file} 调整尺寸成功。`);
        }).catch((err) => {
          console.error(`调整图片尺寸时出错：${err.message}`);
        });
    });
  });
}

// 检查文件是否为图片
function isImageFile(fileName) {
# TODO: 优化性能
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  return imageExtensions.includes(path.extname(fileName).toLowerCase());
}
# 添加错误处理

// 使用示例
const inputDirectory = 'path/to/input';
const outputDirectory = 'path/to/output';
const targetSize = { width: 800, height: 600 };

resizeImages(inputDirectory, outputDirectory, targetSize);

// 注意：请确保已经安装了sharp依赖库：npm install sharp
