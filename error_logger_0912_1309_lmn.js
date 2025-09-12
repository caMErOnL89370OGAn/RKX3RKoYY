// 代码生成时间: 2025-09-12 13:09:51
const fs = require('fs');
const path = require('path');

// Configuration for the logger
const config = {
  logDirectory: './logs', // Directory to store log files
  logFileName: 'error.log', // Name of the log file
  maxLogFileSize: 10485760, // Maximum size of the log file in bytes (10MB)
  backups: 5 // Number of backup log files to keep
};

// Ensure the log directory exists
if (!fs.existsSync(config.logDirectory)) {
  fs.mkdirSync(config.logDirectory);
}

/**
 * Writes an error message to the log file.
 *
 * @param {string} message - The error message to log.
 * @returns {void}
 */
function logError(message) {
  const logFilePath = path.join(config.logDirectory, config.logFileName);
  const currentSize = fs.existsSync(logFilePath) ? fs.statSync(logFilePath).size : 0;

  // Check if the log file has reached its maximum size
  if (currentSize + message.length > config.maxLogFileSize) {
    rotateLogFiles();
  }

  // Append the error message to the log file
  fs.appendFileSync(logFilePath, message + '
');
}

/**
 * Rotates log files by creating a new log file and renaming the old ones.
 *
 * @returns {void}
 */
function rotateLogFiles() {
  const logFilePath = path.join(config.logDirectory, config.logFileName);
  for (let i = config.backups; i > 0; i--) {
    const currentLogFileName = `${config.logFileName}${i === 1 ? '' : `.${i - 1}`}`;
    const nextLogFileName = `${config.logFileName}.${i}`;
    const currentLogFile = path.join(config.logDirectory, currentLogFileName);
    const nextLogFile = path.join(config.logDirectory, nextLogFileName);

    // Rename current log file to next log file
    if (fs.existsSync(currentLogFile)) {
      fs.renameSync(currentLogFile, nextLogFile);
    }
  }
  // Create a new log file
  fs.closeSync(fs.openSync(path.join(config.logDirectory, config.logFileName), 'w'));
}

/**
 * Example usage of the error logger.
 *
 * @returns {void}
 */
function exampleUsage() {
  try {
    // Simulate an error
    throw new Error('Something went wrong!');
  } catch (error) {
    // Log the error
    logError(error.message);
  }
}

// Run the example usage
exampleUsage();

// Export the logError function for use in other modules
module.exports = { logError };
