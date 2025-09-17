// 代码生成时间: 2025-09-18 07:23:44
const fs = require('fs');
const path = require('path');
const util = require('util');

// 引入Node.js的fs模块，使用promisify方法将同步方法转换为异步方法
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const copyFile = util.promisify(fs.copyFile);
const readdir = util.promisify(fs.readdir);
const mkdir = util.promisify(fs.mkdir);

// 定义文件备份和同步工具的主要功能
class FileBackupSyncTool {
  constructor(sourceDir, backupDir) {
    this.sourceDir = sourceDir;
    this.backupDir = backupDir;
  }

  // 同步源目录到备份目录
  async syncDirectories() {
    try {
      const sourceFiles = await readdir(this.sourceDir);
      await this.createBackupDir();

      for (const file of sourceFiles) {
        const sourceFilePath = path.join(this.sourceDir, file);
        const backupFilePath = path.join(this.backupDir, file);

        try {
          await copyFile(sourceFilePath, backupFilePath);
          console.log(`File ${file} synced successfully`);
        } catch (error) {
          console.error(`Error syncing file ${file}: ${error}`);
        }
      }
    } catch (error) {
      console.error(`Error syncing directories: ${error}`);
    }
  }

  // 创建备份目录，如果目录已存在，则忽略
  async createBackupDir() {
    try {
      await mkdir(this.backupDir, { recursive: true });
    } catch (error) {
      console.error(`Error creating backup directory: ${error}`);
    }
  }
}

// 使用示例
const sourceDirectory = './source';
const backupDirectory = './backup';
const tool = new FileBackupSyncTool(sourceDirectory, backupDirectory);
tool.syncDirectories();