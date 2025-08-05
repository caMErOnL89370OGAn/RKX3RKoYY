// 代码生成时间: 2025-08-05 12:09:23
const EventEmitter = require('events');

// 定义购物车类
class ShoppingCart extends EventEmitter {
  // 构造函数
  constructor() {
    super();
    this.items = [];
  }

  // 添加商品到购物车
  addItem(item) {
    if (!item || typeof item !== 'object') {
      throw new Error('Invalid item');
    }

    const existingItemIndex = this.items.findIndex(
      (existingItem) => existingItem.id === item.id
    );

    if (existingItemIndex > -1) {
      this.items[existingItemIndex].quantity += item.quantity;
    } else {
      this.items.push({ ...item, quantity: item.quantity });
    }

    this.emit('itemAdded', item);
  }

  // 从购物车删除商品
  removeItem(itemId) {
    const itemIndex = this.items.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) {
      throw new Error('Item not found');
    }

    this.items.splice(itemIndex, 1);
    this.emit('itemRemoved', itemId);
  }

  // 更新购物车中商品的数量
  updateItemQuantity(itemId, quantity) {
    const itemIndex = this.items.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) {
      throw new Error('Item not found');
    }

    if (quantity <= 0) {
      this.removeItem(itemId);
    } else {
      this.items[itemIndex].quantity = quantity;
      this.emit('itemUpdated', this.items[itemIndex]);
    }
  }

  // 获取购物车中的商品列表
  getItems() {
    return this.items;
  }
}

// 使用示例
const cart = new ShoppingCart();

cart.on('itemAdded', (item) => {
  console.log(`Item added: ${JSON.stringify(item)}`);
});

cart.on('itemRemoved', (itemId) => {
  console.log(`Item with ID ${itemId} removed`);
});

cart.on('itemUpdated', (item) => {
  console.log(`Item updated: ${JSON.stringify(item)}`);
});

try {
  // 添加商品到购物车
  cart.addItem({ id: 1, name: 'Apple', price: 0.50, quantity: 2 });
  // 更新商品数量
  cart.updateItemQuantity(1, 5);
  // 删除商品
  cart.removeItem(1);
} catch (error) {
  console.error(error.message);
}

// 输出购物车中的商品列表
console.log('Shopping Cart:', JSON.stringify(cart.getItems(), null, 2));