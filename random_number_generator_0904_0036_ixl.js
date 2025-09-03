// 代码生成时间: 2025-09-04 00:36:46
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

/**
 * Generates a random integer within a given range.
 * @param {number} min - The minimum value of the range (inclusive).
 * @param {number} max - The maximum value of the range (inclusive).
 * @returns {number} A random integer within the specified range.
 * @throws {Error} If min is greater than max or if either min or max is not a number.
 */
function generateRandomNumber(min, max) {
  // Check if both min and max are numbers
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('Both min and max must be numbers.');
  }

  // Check if min is less than or equal to max
  if (min > max) {
    throw new Error('The minimum value must be less than or equal to the maximum value.');
  }

  // Generate a random integer between min and max
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * Export the generateRandomNumber function for use by other modules.
 */
module.exports = {
  generateRandomNumber
};