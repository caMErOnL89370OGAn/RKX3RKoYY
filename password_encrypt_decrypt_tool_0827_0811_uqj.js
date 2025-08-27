// 代码生成时间: 2025-08-27 08:11:07
const crypto = require('crypto');

/**
 * Encrypts a password using the specified algorithm.
 * @param {string} password - The password to encrypt.
 * @param {string} algorithm - The encryption algorithm to use (e.g., 'aes-256-cbc').
 * @param {string} key - The encryption key.
 * @returns {Promise<string>} The encrypted password.
 */
function encryptPassword(password, algorithm = 'aes-256-cbc', key) {
  return new Promise((resolve, reject) => {
    if (!password || !key) {
      reject(new Error('Password and key are required for encryption.'));
      return;
    }

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    resolve({ encrypted, iv });
  });
}

/**
 * Decrypts a password using the specified algorithm.
 * @param {string} encrypted - The encrypted password to decrypt.
 * @param {string} algorithm - The decryption algorithm to use (e.g., 'aes-256-cbc').
 * @param {string} key - The decryption key.
 * @param {string} iv - The initialization vector used for encryption.
 * @returns {Promise<string>} The decrypted password.
 */
function decryptPassword(encrypted, algorithm = 'aes-256-cbc', key, iv) {
  return new Promise((resolve, reject) => {
    if (!encrypted || !key || !iv) {
      reject(new Error('Encrypted password, key, and IV are required for decryption.'));
      return;
    }

    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    resolve(decrypted);
  });
}

// Example usage:
const password = 'your_password_here';
const key = 'your_secret_key_here';

encryptPassword(password, 'aes-256-cbc', key)
  .then(({ encrypted, iv }) => {
    console.log('Encrypted:', encrypted);
    return decryptPassword(encrypted, 'aes-256-cbc', key, iv);
  })
  .then(decrypted => {
    console.log('Decrypted:', decrypted);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });