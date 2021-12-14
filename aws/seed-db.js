const { dynamoClient } = require('./dynamo');
const { generatePayment } = require('./generate-payment');

let paymentsArr = [];

for (let i = 0; i < 25; i++) {
  const paymentItem = generatePayment();
  paymentsArr.push(paymentItem);
}

var params = {
  RequestItems: {
    payments: paymentsArr,
  },
};

dynamoClient.batchWriteItem(params, function (err, data) {
  if (err) console.log(err, err.stack);
  // an error occurred
  else console.log(data); // successful response
  /*
   data = {
   }
   */
});
