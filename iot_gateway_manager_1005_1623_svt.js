// 代码生成时间: 2025-10-05 16:23:44
const http = require('http');
const { EventEmitter } = require('events');

// IoTDevice 类代表一个 IoT 设备
class IoTDevice extends EventEmitter {
  constructor(id, type) {
    super();
    this.id = id;
    this.type = type;
  }

  // 模拟设备状态更新
  updateStatus(status) {
    console.log(`Device ${this.id} status updated to ${status}`);
    this.emit('statusUpdate', { id: this.id, status: status });
  }
}

// IoTGateway 类代表 IoT 网关
class IoTGateway {
  constructor() {
    this.devices = new Map(); // 存储设备ID和对应的 IoTDevice 实例
  }

  // 添加设备到网关
  addDevice(device) {
    if (this.devices.has(device.id)) {
      throw new Error('Device already exists.');
    }
    this.devices.set(device.id, device);
    device.on('statusUpdate', this.handleStatusUpdate.bind(this));
  }

  // 移除设备
  removeDevice(deviceId) {
    if (!this.devices.has(deviceId)) {
      throw new Error('Device does not exist.');
    }
    const device = this.devices.get(deviceId);
    device.removeAllListeners(); // 移除监听器
    this.devices.delete(deviceId);
  }

  // 处理设备状态更新事件
  handleStatusUpdate(data) {
    console.log(`Status update from device ${data.id}: ${data.status}`);
  }

  // 启动网关服务器
  startServer(port) {
    const server = http.createServer((req, res) => {
      // 简单的请求处理逻辑
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'IoT Gateway is running' }));
    });

    server.listen(port, () => {
      console.log(`IoT Gateway server listening on port ${port}`);
    });
  }
}

// 创建 IoT 网关实例
const gateway = new IoTGateway();

// 创建一些设备实例
const device1 = new IoTDevice('001', 'sensor');
const device2 = new IoTDevice('002', 'actuator');

// 添加设备到网关
gateway.addDevice(device1);
gateway.addDevice(device2);

// 模拟设备状态更新
device1.updateStatus('online');
device2.updateStatus('offline');

// 启动网关服务器
gateway.startServer(3000);