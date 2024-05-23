var AWS = require('aws-sdk');
var fs = require('fs');
var { v4: uuidv4 } = require('uuid'); // Import the uuid package

AWS.config.update({
  region: 'eu-west-2',
});

console.log('Writing entries to Accessibilities table.');

var dynamodb = new AWS.DynamoDB.DocumentClient();
var accessibilitiesData = JSON.parse(
  fs.readFileSync('../components/data/accessibilities.json', 'utf8')
);

accessibilitiesData.forEach(function (accessibility) {
  var params = {
    TableName: 'Accessibilities',
    Item: {
      id: uuidv4(), // Generate a unique ID for each item
      name: accessibility.name,
    },
  };

  dynamodb.put(params, function (err, data) {
    if (err) {
      console.error(
        'Unable to load data into table for accessibility',
        accessibility.name,
        '. Error: ',
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log('Added', accessibility.name, 'to table.');
    }
  });
});
