// 代码生成时间: 2025-07-31 15:02:18
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg'); // 使用pg包作为PostgreSQL的客户端

// 数据库配置
const dbConfig = {
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
  port: 5432, // PostgreSQL默认端口
};

// 创建数据库连接池
const pool = new Pool(dbConfig);

// 定义迁移函数
async function migrate() {
  try {
    // 连接数据库
    const client = await pool.connect();
    try {
      // 获取迁移文件路径
      const migrationsPath = path.join(__dirname, 'migrations');
      // 读取所有迁移文件
      const migrations = fs.readdirSync(migrationsPath)
        .filter(file => file.endsWith('.sql'))
        .map(file => path.join(migrationsPath, file));

      // 按文件名排序（假设文件名包含版本号）
      migrations.sort();

      // 执行每个迁移文件
      for (const migration of migrations) {
        const sql = fs.readFileSync(migration, 'utf8');
        await client.query(sql);
        console.log(`Migrated ${migration}`);
      }
    } catch (error) {
      console.error('Error reading migrations:', error);
    } finally {
      // 释放客户端资源
      client.release();
    }
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
}

// 处理未捕获异常
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

// 执行迁移
migrate().catch(console.error);
