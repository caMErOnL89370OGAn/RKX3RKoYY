// 代码生成时间: 2025-08-02 12:44:48
// Import the required modules
const https = require('https');
const fs = require('fs');
const { URL } = require('url');

// Define a function to scrape content from a given URL
function scrapeContent(url, outputPath) {
  // Parse the URL to ensure it's HTTPS
  const parsedUrl = new URL(url);
  if (parsedUrl.protocol !== 'https:') {
    throw new Error('Only HTTPS URLs are supported.');
  }

  // Prepare the options for the HTTPS request
  const options = {
    hostname: parsedUrl.hostname,
    path: parsedUrl.pathname + parsedUrl.search,
    method: 'GET'
  };

  // Make the HTTPS request
  const req = https.request(options, (res) => {
    // Check the response status code
    if (res.statusCode !== 200) {
      throw new Error(`Failed to retrieve content. Status code: ${res.statusCode}`);
    }

    // Stream the response to a file
    const fileStream = fs.createWriteStream(outputPath);
    res.pipe(fileStream);

    // Handle the end of the stream
    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`Content from ${url} has been successfully scraped and saved to ${outputPath}`);
    });
  });

  // Handle request errors
  req.on('error', (e) => {
    console.error(`An error occurred: ${e.message}`);
  });

  // End the request
  req.end();
}

// Example usage
// scrapeContent('https://example.com', 'output.html');

// Export the scrapeContent function for use in other modules
module.exports = { scrapeContent };
