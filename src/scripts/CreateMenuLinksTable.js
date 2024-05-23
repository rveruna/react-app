const AWS = require('aws-sdk');

// Set the region to your desired region
AWS.config.update({ region: 'eu-west-2' });

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: 'MenuLinks',
  KeySchema: [
    { AttributeName: 'href', KeyType: 'HASH' },
    { AttributeName: 'text', KeyType: 'RANGE' },
  ],
  AttributeDefinitions: [
    { AttributeName: 'class', AttributeType: 'S' },
    { AttributeName: 'href', AttributeType: 'S' },
    { AttributeName: 'text', AttributeType: 'S' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
  LocalSecondaryIndexes: [
    {
      IndexName: 'ClassIndex',
      KeySchema: [
        { AttributeName: 'href', KeyType: 'HASH' },
        { AttributeName: 'class', KeyType: 'RANGE' },
      ],
      Projection: {
        ProjectionType: 'KEYS_ONLY',
      },
    },
  ],
};

dynamodb.createTable(params, (err, data) => {
  if (err) {
    console.error(
      'Unable to create table. Error JSON:',
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      'Created table with description:',
      JSON.stringify(data, null, 2)
    );
  }
});
