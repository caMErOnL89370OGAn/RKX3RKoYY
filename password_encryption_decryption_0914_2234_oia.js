// 代码生成时间: 2025-09-14 22:34:04
const crypto = require('crypto');

class PasswordManager {
  // 使用指定的算法和key加密数据
  encrypt(data, secretKey) {
    const iv = crypto.randomBytes(16); // 初始化向量
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  // 使用指定的算法和key解密数据
  decrypt(encryptedData, secretKey) {
    const [iv, encryptedText] = encryptedData.split(':');
    const ivBuffer = Buffer.from(iv, 'hex'); // 初始化向量
    const encryptedTextBuffer = Buffer.from(encryptedText, 'hex'); // 加密文本
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), ivBuffer);
    let decrypted = decipher.update(encryptedTextBuffer);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}

// 错误处理和功能测试
try {
  const passwordManager = new PasswordManager();
  const secretKey = 'my-very-secure-key';
  const originalPassword = 'my-password';
  const encryptedPassword = passwordManager.encrypt(originalPassword, secretKey);
  console.log('Encrypted:', encryptedPassword);
  const decryptedPassword = passwordManager.decrypt(encryptedPassword, secretKey);
  console.log('Decrypted:', decryptedPassword);

  if (originalPassword !== decryptedPassword) {
    throw new Error('Decryption failed, original and decrypted passwords do not match.');
  }
} catch (error) {
  console.error('Error:', error.message);
}
