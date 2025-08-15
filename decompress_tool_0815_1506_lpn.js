// 代码生成时间: 2025-08-15 15:06:54
const fs = require('fs').promises;
const path = require('path');
const zlib = require('zlib');
const tar = require('tar');

/**
 * Decompress a compressed file to a specified directory.
 * @param {string} sourceFilePath - The path to the compressed file.
 * @param {string} destinationDir - The directory where the files will be decompressed.
 * @returns {Promise<void>} - A promise that resolves when the decompression is complete.
 */
async function decompressFile(sourceFilePath, destinationDir) {
  // Check if the source file exists
  try {
    await fs.access(sourceFilePath);
  } catch (error) {
    throw new Error(`Source file does not exist: ${sourceFilePath}`);
  }

  // Check if the destination directory exists, if not create it
  try {
    await fs.access(destinationDir);
  } catch (error) {
    await fs.mkdir(destinationDir, { recursive: true });
  }

  // Decompress the file
  try {
    const sourceStream = fs.createReadStream(sourceFilePath);
    const gzip = zlib.createGunzip();
    const extract = tar.extract(destinationDir);
    sourceStream
      .pipe(gzip)
      .pipe(extract)
      .on('error', (error) => {
        throw new Error(`Failed to decompress file: ${error.message}`);
      })
      .on('finish', () => {
        console.log('Decompression completed successfully.');
      });
  } catch (error) {
    throw error;
  }
}

/**
 * Example usage of the decompressFile function.
 */
(async () => {
  try {
    await decompressFile('path/to/your/compressed/file.tar.gz', 'path/to/destination/directory');
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
})();