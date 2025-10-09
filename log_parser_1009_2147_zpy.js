// 代码生成时间: 2025-10-09 21:47:47
const fs = require('fs');
const path = require('path');

// Configuration for log parsing
const config = {
    logFilePath: './log.txt', // Path to the log file
    dateFormat: 'YYYY-MM-DD', // Date format in the log
    startTime: '00:00:00', // Start time in the log
    endTime: '23:59:59' // End time in the log
};

/**
 * Parses a log line to extract the date, time, and message.
 * @param {string} logLine - A single line from the log file.
 * @returns {Object} An object containing the date, time, and message.
 */
function parseLogLine(logLine) {
    const regex = /^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2}) (.*)$/;
    const match = logLine.match(regex);
    if (!match) {
        throw new Error(`Invalid log line format: ${logLine}`);
    }
    return {
        date: match[1],
        time: match[2],
        message: match[3]
    };
}

/**
 * Filters log lines based on date and time.
 * @param {string[]} logLines - An array of log lines.
 * @returns {string[]} An array of filtered log lines.
 */
function filterLogLines(logLines) {
    const filteredLines = logLines.filter(line => {
        const parsedLine = parseLogLine(line);
        const logDate = `${parsedLine.date} ${parsedLine.time}`;
        const logDateTime = new Date(logDate).toLocaleString();
        const logDateObj = new Date(logDate);
        const startDateTime = new Date(`${config.dateFormat} ${config.startTime}`);
        const endDateTime = new Date(`${config.dateFormat} ${config.endTime}`);
        return logDateObj >= startDateTime && logDateObj <= endDateTime;
    });
    return filteredLines;
}

/**
 * Reads the log file and returns an array of log lines.
 * @param {string} filePath - The path to the log file.
 * @returns {string[]} An array of log lines.
 */
function readLogFile(filePath) {
    try {
        const logData = fs.readFileSync(filePath, 'utf8');
        return logData.split('\
');
    } catch (error) {
        throw new Error(`Error reading log file: ${error.message}`);
    }
}

/**
 * Main function to parse and filter the log file.
 */
function main() {
    try {
        const logLines = readLogFile(config.logFilePath);
        const filteredLines = filterLogLines(logLines);
        console.log('Filtered Log Lines:');
        filteredLines.forEach(line => console.log(line));
    } catch (error) {
        console.error('Log parsing failed:', error.message);
    }
}

// Run the main function
main();