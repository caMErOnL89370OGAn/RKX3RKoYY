// 代码生成时间: 2025-09-16 19:30:01
const EventEmitter = require('events');
const fs = require('fs').promises;
const path = require('path');

// 用户权限管理事件发射器
class PermissionManager extends EventEmitter {}

// 用户权限的存储结构
const permissionsStore = new Map();

// 载入权限数据，从文件中读取
async function loadPermissions() {
  try {
    const data = await fs.readFile(path.join(__dirname, 'permissions.json'), 'utf8');
    const permissions = JSON.parse(data);
    permissionsStore.clear();
    for (const [userId, roles] of Object.entries(permissions)) {
      permissionsStore.set(userId, roles);
    }
  } catch (error) {
    console.error('Error loading permissions:', error);
    throw error;
  }
}

// 保存权限数据到文件
async function savePermissions() {
  try {
    const data = JSON.stringify(Array.from(permissionsStore.entries()));
    await fs.writeFile(path.join(__dirname, 'permissions.json'), data);
  } catch (error) {
    console.error('Error saving permissions:', error);
    throw error;
  }
}

// 添加用户权限
async function addPermission(userId, role) {
  // 检查权限是否已存在
  if (permissionsStore.has(userId) && permissionsStore.get(userId).includes(role)) {
    throw new Error('Permission already exists.');
  }
  permissionsStore.set(userId, [...permissionsStore.get(userId) || [], role]);
  await savePermissions();
}

// 删除用户权限
async function removePermission(userId, role) {
  // 检查用户是否存在
  if (!permissionsStore.has(userId)) {
    throw new Error('User not found.');
  }
  // 检查权限是否存在
  const roles = permissionsStore.get(userId);
  if (!roles.includes(role)) {
    throw new Error('Permission not found.');
  }
  const updatedRoles = roles.filter((r) => r !== role);
  permissionsStore.set(userId, updatedRoles);
  await savePermissions();
}

// 获取用户权限
function getPermissions(userId) {
  if (!permissionsStore.has(userId)) {
    throw new Error('User not found.');
  }
  return permissionsStore.get(userId);
}

// 初始化权限管理器
async function initializePermissionManager() {
  await loadPermissions();

  // 注册事件监听器
  permissionManager.on('addPermission', async (userId, role) => {
    await addPermission(userId, role);
  });
  permissionManager.on('removePermission', async (userId, role) => {
    await removePermission(userId, role);
  });
}

// 实例化权限管理器
const permissionManager = new PermissionManager();

// 导出模块
module.exports = {
  permissionManager,
  addPermission,
  removePermission,
  getPermissions,
  initializePermissionManager
};

// 注意：
// - 权限数据存储在当前目录下的permissions.json文件中。
// - 在实际部署中，应考虑使用数据库存储权限数据。
// - 权限管理器的设计允许通过事件监听器扩展更多功能。
