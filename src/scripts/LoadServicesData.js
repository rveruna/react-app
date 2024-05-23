const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Import the uuid package

// Configure AWS SDK
AWS.config.update({
  region: 'eu-west-2',
});

console.log('Writing entries to Services table.');

const dynamodb = new AWS.DynamoDB.DocumentClient();

// Read the JSON file
const filePath = path.join(__dirname, '../components/data/services.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Function to upload data to DynamoDB
const uploadData = async () => {
  for (const item of data) {
    const params = {
      TableName: 'Services', // Change to your DynamoDB table name
      Item: {
        id: item.id, // Use the id from the item, or uuidv4() if you need to generate a new one
        name: item.name,
      },
    };

    try {
      await dynamodb.put(params).promise();
      console.log(`Added ${item.name} to table.`);
    } catch (err) {
      console.error(
        `Unable to add ${item.name}. Error JSON:`,
        JSON.stringify(err, null, 2)
      );
    }
  }
};

// Call the function to upload data
uploadData()
  .then(() => {
    console.log('Data upload complete.');
  })
  .catch((err) => {
    console.error('Data upload failed. Error:', err);
  });
