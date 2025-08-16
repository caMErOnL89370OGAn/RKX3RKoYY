// 代码生成时间: 2025-08-16 16:59:30
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// 用户权限管理系统
class UserPermissionManager {

  // 构造函数
  constructor() {
    this.permissions = new Map(); // 存储用户权限的映射
  }

  // 添加用户权限
  addPermission(userId, permission) {
    this.permissions.set(userId, permission);
    console.log(`Permission added for user ${userId}: ${permission}`);
  }

  // 删除用户权限
  removePermission(userId) {
    if (this.permissions.has(userId)) {
      this.permissions.delete(userId);
      console.log(`Permission removed for user ${userId}`);
    } else {
      console.error(`No permission found for user ${userId}`);
    }
  }

  // 获取用户权限
  getPermission(userId) {
    if (this.permissions.has(userId)) {
      return this.permissions.get(userId);
    } else {
      console.error(`No permission found for user ${userId}`);
      return null;
    }
  }

  // 保存权限数据到文件
  savePermissionsToFile() {
    try {
      const permissionsJSON = JSON.stringify(Array.from(this.permissions.entries()));
      fs.writeFileSync('permissions.json', permissionsJSON);
      console.log('Permissions saved to file successfully');
    } catch (error) {
      console.error('Failed to save permissions to file:', error);
    }
  }

  // 从文件加载权限数据
  loadPermissionsFromFile() {
    try {
      const permissionsJSON = fs.readFileSync('permissions.json');
      const permissionsArray = JSON.parse(permissionsJSON);
      permissionsArray.forEach(([key, value]) => {
        this.permissions.set(key, value);
      });
      console.log('Permissions loaded from file successfully');
    } catch (error) {
      console.error('Failed to load permissions from file:', error);
    }
  }
}

// 示例用法
const userManager = new UserPermissionManager();

// 添加权限
userManager.addPermission('user1', 'admin');
userManager.addPermission('user2', 'editor');

// 获取权限
console.log('User1 Permission:', userManager.getPermission('user1'));

// 删除权限
userManager.removePermission('user1');

// 保存和加载权限
userManager.savePermissionsToFile();
userManager.loadPermissionsFromFile();