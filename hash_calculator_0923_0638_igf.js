// 代码生成时间: 2025-09-23 06:38:45
const crypto = require('crypto');

/**
 * HashCalculator - A tool to calculate hash values for strings.
 * @class
 */
class HashCalculator {

    /**
     * Calculates the hash value of a given string.
     * @param {string} algorithm The hash algorithm to use.
     * @param {string} input The string to hash.
     * @returns {string} The hash value of the input string.
     */
    calculateHash(algorithm, input) {
        return new Promise((resolve, reject) => {
            // Check if the algorithm is supported
            if (!crypto.getHashes().includes(algorithm)) {
                reject(new Error(`Unsupported algorithm: ${algorithm}`));
                return;
            }

            // Create a hash instance
            const hash = crypto.createHash(algorithm);

            // Update the hash with the input data
            hash.update(input);

            // Calculate the digest and resolve the promise
            hash.digest((err, buffer) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(buffer.toString('hex'));
                }
            });
        });
    }
}

/**
 * Usage example:
 * hashCalculator.calculateHash('sha256', 'Hello, World!').then(hash => {
 *     console.log(hash);
 * }).catch(err => {
 *     console.error('Error calculating hash:', err.message);
 * });
 */

// Creating an instance of HashCalculator
const hashCalculator = new HashCalculator();

// Exporting the HashCalculator class
module.exports = hashCalculator;
