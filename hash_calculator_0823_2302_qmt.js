// 代码生成时间: 2025-08-23 23:02:52
const crypto = require('crypto');

/**
 * 哈希值计算工具
 * @module hashCalculator
 */

/**
 * 计算文件的哈希值
 * @param {string} filePath - 文件的路径
 * @param {string} algorithm - 哈希算法（如 'sha256'）
 * @returns {Promise<string>} - 文件的哈希值
 */
function calculateFileHash(filePath, algorithm = 'sha256') {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash(algorithm);
    const fileStream = require('fs').createReadStream(filePath);

    fileStream.on('data', (chunk) => {
      hash.update(chunk);
    });

    fileStream.on('end', () => {
      resolve(hash.digest('hex'));
    });

    fileStream.on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * 计算字符串的哈希值
 * @param {string} str - 要计算哈希值的字符串
 * @param {string} algorithm - 哈希算法（如 'sha256'）
 * @returns {string} - 字符串的哈希值
 */
function calculateStringHash(str, algorithm = 'sha256') {
  return crypto.createHash(algorithm).update(str).digest('hex');
}

// 导出模块
module.exports = {
  calculateFileHash,
  calculateStringHash
};