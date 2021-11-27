const { dynamoClient, TABLE_NAME } = require('./aws/dynamo');
const uuid = require('uuid');

const getPayments = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const payments = await dynamoClient.scan(params).promise();
  return payments;
};

const addPayment = async (amount) => {
  const uuid1 = uuid.v1();
  const params = {
    TableName: TABLE_NAME,
    Item: {
      paymentId: uuid1,
      amount,
    },
  };
  return await dynamoClient.put(params).promise();
};

module.exports = {
  getPayments,
  addPayment,
};
