const { dynamoClient } = require('./dynamo');

const params = {
  TableName: `payments`,
  KeySchema: [
    { AttributeName: 'paymentId', KeyType: 'HASH' },
    { AttributeName: 'amount', KeyType: 'RANGE' },
  ],
  AttributeDefinitions: [
    { AttributeName: 'paymentId', AttributeType: 'S' },
    { AttributeName: 'amount', AttributeType: 'S' },
  ],
  ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
};

console.log('creating tables');

dynamoClient.createTable(params, console.log);
