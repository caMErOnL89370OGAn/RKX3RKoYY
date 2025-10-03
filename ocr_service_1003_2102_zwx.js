// 代码生成时间: 2025-10-03 21:02:41
const { Tesseract } = require('tesseract.js');

class OCRService {
  
  /**
   * Constructor for OCRService
   * @param {string} lang - Language code for OCR recognition
   */
  constructor(lang = 'eng') {
    this.lang = lang;
  }

  /**
   * Recognize text from an image file
   * @param {string} filePath - Path to the image file
   * @returns {Promise<string>} - Promise that resolves with the recognized text or rejects with an error
   */
  async recognizeText(filePath) {
    try {
      // Ensure the file path is valid
      if (!filePath) {
        throw new Error('File path is required');
      }

      // Perform OCR on the image file
      const result = await Tesseract.recognize(
        filePath,
        this.lang,
        { logger: m => console.log(m) } // Optional: Log the OCR process
      );

      // Return the recognized text
      return result.text;
    } catch (error) {
      // Handle any errors that occur during the OCR process
      console.error('OCR error:', error.message);
      throw error;
    }
  }
}

// Usage example
const ocrService = new OCRService();

// Replace 'path/to/image.png' with the actual path to the image file you want to process
ocrService.recognizeText('path/to/image.png')
  .then(text => console.log('Recognized Text:', text))
  .catch(error => console.error('Failed to recognize text:', error));