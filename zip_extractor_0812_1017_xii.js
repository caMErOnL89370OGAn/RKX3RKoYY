// 代码生成时间: 2025-08-12 10:17:27
const fs = require('fs');
const path = require('path');
const { createWriteStream } = require('fs');
const yazl = require('yazl');
const yazlZipFile = require('yazl/ZipFile');

const unzip = require('unzip');

// Function to extract a ZIP file into a specified directory.
function extractZipFile(zipFilePath, extractToDirectory) {
  // Ensure the zip file path and extraction directory are valid.
  if (!fs.existsSync(zipFilePath)) {
    throw new Error('The zip file does not exist.');
  }
  if (!fs.existsSync(extractToDirectory)) {
    throw new Error('The extraction directory does not exist.');
  }

  // Create a readable stream for the zip file.
  const readStream = fs.createReadStream(zipFilePath);

  // Create a writable stream for unzipping the content.
  const extractStream = unzip.Extract({ path: extractToDirectory });

  // Pipe the read stream through the extract stream.
  readStream.pipe(extractStream);

  // Listen for errors.
  extractStream.on('error', (error) => {
    throw new Error('Error extracting the zip file: ' + error.message);
  });

  // Listen for the finish event to confirm extraction is complete.
  extractStream.on('finish', () => {
    console.log('Extraction complete.');
  });
}

// Function to create a ZIP file from a directory.
function createZipFile(directoryPath, zipFilePath) {
  // Ensure the directory path is valid.
  if (!fs.existsSync(directoryPath)) {
    throw new Error('The directory does not exist.');
  }

  // Create a new zip file.
  const zipFile = new yazl.ZipFile();

  // Add the directory and its contents to the zip file.
  zipFile.addDirectory(directoryPath, '', (error) => {
    if (error) {
      throw new Error('Error adding directory to zip: ' + error.message);
    }
    // Write the zip file to the file system.
    zipFile.outputStream
      .pipe(createWriteStream(zipFilePath))
      .on('close', () => {
        console.log('Zip file created successfully.');
      });
    zipFile.end();
  });
}

// Example usage:
// To extract a zip file:
// extractZipFile('./example.zip', './extracted-content');

// To create a zip file:
// createZipFile('./content-to-zip', './new-archive.zip');

module.exports = {
  extractZipFile,
  createZipFile
};