// 代码生成时间: 2025-10-14 03:02:26
const { Client, Pool } = require('pg');
// 客户关系管理模块

// 数据库配置
const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

// 客户类
class Customer {
  // 构造函数
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  // 获取客户信息
  static async getCustomerById(id) {
    const client = await pool.connect();
    try {
      const res = await client.query('SELECT * FROM customers WHERE id = $1', [id]);
      client.release();
      return res.rows[0] ? new Customer(res.rows[0].id, res.rows[0].name, res.rows[0].email) : null;
    } catch (err) {
      console.error('Failed to get customer', err);
      client.release();
      throw err;
    }
  }

  // 添加新客户
  static async addCustomer(name, email) {
    const client = await pool.connect();
    try {
      const res = await client.query('INSERT INTO customers (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
      client.release();
      return new Customer(res.rows[0].id, res.rows[0].name, res.rows[0].email);
    } catch (err) {
      console.error('Failed to add customer', err);
      client.release();
      throw err;
    }
  }
}

// 启动服务器
const express = require('express');
const app = express();
app.use(express.json());

// 获取客户信息的路由
app.get('/customer/:id', async (req, res) => {
  try {
    const customer = await Customer.getCustomerById(req.params.id);
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).send('Customer not found');
    }
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// 添加新客户的路由
app.post('/customer', async (req, res) => {
  try {
    const customer = await Customer.addCustomer(req.body.name, req.body.email);
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});