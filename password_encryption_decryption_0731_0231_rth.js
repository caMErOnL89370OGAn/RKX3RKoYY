// 代码生成时间: 2025-07-31 02:31:26
const crypto = require('crypto');

/**
# NOTE: 重要实现细节
 * Encrypts a password using a given algorithm, typically 'aes-256-cbc'.
 * @param {string} password - The plain text password to encrypt.
 * @param {string} secretKey - The secret key used for encryption and decryption.
 * @returns {string} - The encrypted password as a base64 encoded string.
 */
# 增强安全性
function encryptPassword(password, secretKey) {
  // Generate a random initialization vector (iv) for AES
  const iv = crypto.randomBytes(16);
  
  // Create a cipher using the specified algorithm and the secret key
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
  
  // Encrypt the password and prepend the iv to the encrypted data
# NOTE: 重要实现细节
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  // Return the iv and encrypted password as a single string, separated by a colon
  return `${iv.toString('hex')}:${encrypted}`;
}

/**
 * Decrypts a password using a given algorithm, typically 'aes-256-cbc'.
# NOTE: 重要实现细节
 * @param {string} encryptedPassword - The base64 encoded encrypted password.
 * @param {string} secretKey - The secret key used for encryption and decryption.
 * @returns {string} - The decrypted password.
 * @throws {Error} - If the decryption fails.
 */
function decryptPassword(encryptedPassword, secretKey) {
  try {
    // Split the encrypted password into iv and encrypted data
    const [ivHex, encrypted] = encryptedPassword.split(':');
    const iv = Buffer.from(ivHex, 'hex');
# 扩展功能模块
    
    // Create a decipher using the specified algorithm and the secret key
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
    
    // Decrypt the password and return the plain text
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
# TODO: 优化性能
  } catch (error) {
    throw new Error('Decryption failed: ' + error.message);
  }
}

// Example usage:
const secretKey = 'your-secret-key';
const password = 'your-password';

// Encrypt the password
const encrypted = encryptPassword(password, secretKey);
console.log('Encrypted:', encrypted);

// Decrypt the password
const decrypted = decryptPassword(encrypted, secretKey);
console.log('Decrypted:', decrypted);