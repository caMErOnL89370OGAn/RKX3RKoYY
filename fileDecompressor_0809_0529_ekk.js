// 代码生成时间: 2025-08-09 05:29:26
const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');

/**
 * 文件解压工具类
 */
class FileDecompressor {

  /**
   * 构造函数，设置解压的目标目录
   * @param {string} targetDirectory 目标目录路径
   */
  constructor(targetDirectory) {
    this.targetDirectory = targetDirectory;
  }

  /**
   * 解压文件
   * @param {string} filePath 要解压的文件路径
   */
  async decompressFile(filePath) {
    try {
      // 检查文件是否存在
      if (!await fs.pathExists(filePath)) {
        throw new Error('文件不存在');
      }

      // 创建目标目录（如果不存在）
      await fs.ensureDir(this.targetDirectory);

      // 读取文件并解压
      const readStream = fs.createReadStream(filePath);
      const archive = archiver('zip', { zlib: { level: 9 } }); // 压缩等级9
      const writeStream = fs.createWriteStream(path.join(this.targetDirectory, 'extracted'));

      // 监听错误
      readStream.on('error', (err) => {
        throw err;
      });

      // 监听完成
      archive.on('finish', () => {
        console.log('文件已解压完成');
      });

      // 监听警告
      archive.on('warning', (err) => {
        if (err.code === 'ENOENT') {
          throw err;
        }
        console.warn(err);
      });

      // 将读取流传输到压缩器
      readStream.pipe(archive).pipe(writeStream);

      // 完成压缩器的工作
      await archive.finalize();

    } catch (error) {
      console.error('解压文件时出错:', error.message);
    }
  }
}

// 使用示例
(async () => {
  try {
    const decompressor = new FileDecompressor('./extracted');
    await decompressor.decompressFile('./test.zip');
  } catch (error) {
    console.error('发生错误:', error.message);
  }
})();