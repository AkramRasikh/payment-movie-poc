const AWS = require('aws-sdk');

// endpoint: 'http://localhost:9000',
// region: process.env.REGION,

AWS.config.update({
  region: 'local',
  accessKeyId: 'x',
  secretAccessKey: 'x',
  endpoint: 'http://localhost:8000',
});

// const dynamoClient = new AWS.DynamoDB.DocumentClient();
const dynamoClient = new AWS.DynamoDB();

const TABLE_NAME = 'payments';

module.exports = {
  dynamoClient,
  TABLE_NAME,
};

// const params = {
//   TableName: 'payments',
//   Item: {
//     paymentId: 1234567,
//     amount: 10000,
//   },
// };
