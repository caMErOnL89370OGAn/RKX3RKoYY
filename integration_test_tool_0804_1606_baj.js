// 代码生成时间: 2025-08-04 16:06:47
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// 配置测试环境
const testConfig = {
  testDirectory: path.join(__dirname, 'tests'),
  testFilePattern: /\.test\.js$/,
  testCommand: 'mocha'
};

// 函数：运行测试
function runTests() {
  console.log('Starting integration tests...');

  // 读取测试目录中的所有文件
  fs.readdir(testConfig.testDirectory, (err, files) => {
    if (err) {
      console.error('Error reading test directory:', err);
      return;
    }

    // 过滤出测试文件
    const testFiles = files.filter(file => testConfig.testFilePattern.test(file));

    // 检查是否有测试文件
    if (testFiles.length === 0) {
      console.log('No test files found.');
      return;
    }

    // 构建测试命令
    const command = `${testConfig.testCommand} '${testFiles.join(' ')}'`;

    // 执行测试命令
    const testProcess = spawn('npm', ['run', command], {
      stdio: 'inherit',
      cwd: testConfig.testDirectory
    });

    testProcess.on('close', (code) => {
      if (code === 0) {
        console.log('All tests passed.');
      } else {
        console.error('Some tests failed.');
      }
    });
  });
}

// 暴露模块
module.exports = {
  runTests
};

// 如果直接运行此文件，则执行测试
if (require.main === module) {
  runTests();
}