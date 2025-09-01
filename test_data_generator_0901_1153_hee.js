// 代码生成时间: 2025-09-01 11:53:07
const fs = require('fs');
const path = require('path');
const faker = require('faker');

// Configuration for the test data generator
const config = {
  outputFolder: './test_data',
  numberOfRecords: 100
};

// Ensure the output folder exists
if (!fs.existsSync(config.outputFolder)) {
  fs.mkdirSync(config.outputFolder);
}

// Function to generate a single test record
function generateTestRecord() {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zipCode: faker.address.zipCode(),
    phone: faker.phone.phoneNumber(),
    dateOfBirth: faker.date.past(50),
    jobTitle: faker.name.jobTitle(),
    company: faker.company.companyName()
  };
}

// Function to generate multiple test records and write them to a file
function generateTestData() {
  try {
    const testRecords = [];
    for (let i = 0; i < config.numberOfRecords; i++) {
      testRecords.push(generateTestRecord());
    }

    // Write test records to a JSON file
    const outputFile = path.join(config.outputFolder, 'test_data.json');
    fs.writeFileSync(outputFile, JSON.stringify(testRecords, null, 2), 'utf8');

    console.log('Test data generated successfully and saved to:', outputFile);
  } catch (error) {
    console.error('An error occurred while generating test data:', error.message);
  }
}

// Run the test data generator
generateTestData();