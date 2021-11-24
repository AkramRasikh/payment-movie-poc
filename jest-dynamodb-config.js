module.exports = {
  tables: [
    {
      TableName: `payments`,
      KeySchema: [{AttributeName: 'paymentId', KeyType: 'HASH'}, {AttributeName: 'amount', KeyType: 'RANGE'}],
      AttributeDefinitions: [{AttributeName: 'paymentId', AttributeType: 'S'}, {AttributeName: 'amount', AttributeType: 'S'}],
      ProvisionedThroughput: {ReadCapacityUnits: 1, WriteCapacityUnits: 1},
    },
  ],
};