const uuid = require('uuid');

const generatePayment = () => ({
  PutRequest: {
    Item: {
      paymentId: {
        S: uuid.v1(),
      },
      amount: {
        S: (Math.floor(Math.random() * 100) + 1).toString(),
      },
    },
  },
});

module.exports = { generatePayment };
