// 代码生成时间: 2025-08-20 14:20:20
 * It retrieves CPU, memory, and disk usage statistics and prints them.
 */

const os = require('os');
const fs = require('fs');
const util = require('util');

// Promisify for asynchronous file system operations
const readFile = util.promisify(fs.readFile);

// Function to get CPU information
async function getCpuInfo() {
    try {
        // Get CPU architecture and model
        const arch = os.arch();
        const model = os.cpus()[0].model;
        console.log('CPU Architecture:', arch);
        console.log('CPU Model:', model);
    } catch (error) {
        console.error('Error fetching CPU info:', error);
    }
}

// Function to get memory information
async function getMemoryInfo() {
    try {
        // Get memory usage statistics
        const memFree = os.freemem();
        const memTotal = os.totalmem();
        console.log('Memory Free:', memFree, 'bytes');
        console.log('Memory Total:', memTotal, 'bytes');
    } catch (error) {
        console.error('Error fetching memory info:', error);
    }
}

// Function to get disk information
async function getDiskInfo() {
    try {
        // Get disk usage statistics
        const diskInfo = await readFile('/proc/diskstats', 'utf8');
        console.log('Disk Information:', diskInfo);
    } catch (error) {
        console.error('Error fetching disk info:', error);
    }
}

// Main function to initiate monitoring
async function monitorSystemPerformance() {
    try {
        await getCpuInfo();
        await getMemoryInfo();
        await getDiskInfo();
    } catch (error) {
        console.error('Error during system performance monitoring:', error);
    }
}

// Run the system performance monitor
monitorSystemPerformance();