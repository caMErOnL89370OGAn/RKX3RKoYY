// 代码生成时间: 2025-09-24 16:34:34
const fs = require('fs');
const path = require('path');

// 用户权限管理系统
class UserPermissionSystem {
    // 构造函数，存储权限数据
    constructor() {
        this.permissions = {};
    }

    // 加载权限数据
    loadPermissions(filePath) {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            this.permissions = JSON.parse(data);
        } catch (error) {
            console.error('Error loading permissions:', error);
            throw error;
        }
    }

    // 保存权限数据
    savePermissions(filePath) {
        try {
            const data = JSON.stringify(this.permissions, null, 2);
            fs.writeFileSync(filePath, data);
        } catch (error) {
            console.error('Error saving permissions:', error);
            throw error;
        }
    }

    // 添加用户权限
    addUserPermission(userId, permission) {
        if (!this.permissions[userId]) {
            this.permissions[userId] = [];
        }
        this.permissions[userId].push(permission);
    }

    // 删除用户权限
    removeUserPermission(userId, permission) {
        if (this.permissions[userId]) {
            const index = this.permissions[userId].indexOf(permission);
            if (index > -1) {
                this.permissions[userId].splice(index, 1);
            }
        }
    }

    // 检查用户是否有权限
    hasPermission(userId, permission) {
        return this.permissions[userId] ? this.permissions[userId].includes(permission) : false;
    }
}

// 使用示例
const permissionsPath = path.join(__dirname, 'permissions.json');
const system = new UserPermissionSystem();
try {
    system.loadPermissions(permissionsPath);
    // 添加用户权限
    system.addUserPermission('user1', 'admin');
    // 检查用户权限
    console.log(system.hasPermission('user1', 'admin')); // 应输出 true
    // 删除用户权限
    system.removeUserPermission('user1', 'admin');
    // 保存权限数据
    system.savePermissions(permissionsPath);
} catch (error) {
    console.error('System error:', error);
}