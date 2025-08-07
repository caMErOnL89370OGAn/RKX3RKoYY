// 代码生成时间: 2025-08-07 19:16:24
const crypto = require('crypto');

/**
 * 哈希值计算工具
 * @param {string} input 需要计算哈希值的输入字符串
 * @param {string} algorithm 哈希算法，例如 'md5', 'sha256'
 * @returns {string} 计算得到的哈希值
 */
function calculateHash(input, algorithm = 'sha256') {
  // 使用crypto模块创建哈希
  return crypto.createHash(algorithm).update(input).digest('hex');
}

/**
 * 主函数，用于处理命令行输入
 * @param {string[]} args 命令行参数数组
 */
function main(args) {
  if (args.length < 3) {
    console.error('Usage: node hash_calculator.js [input] [algorithm]');
    process.exit(1);
  }

  const input = args[2];
  const algorithm = args[3] || 'sha256';

  try {
    const hash = calculateHash(input, algorithm);
    console.log(hash);
  } catch (error) {
    console.error('Error calculating hash:', error.message);
    process.exit(1);
  }
}

// 检查是否直接运行此脚本
if (require.main === module) {
  main(process.argv);
}

module.exports = { calculateHash };
