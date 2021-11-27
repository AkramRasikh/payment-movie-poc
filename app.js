require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { getPayments, addPayment } = require('./payment-aws-methods');
const { paymentValidationRules, validate } = require('./validator');

app.use(bodyParser.json());

app.get('/', async function (_, res) {
  try {
    const { Items: allPayments } = await getPayments();
    res.status(200).send(allPayments);
  } catch (error) {
    res.status(400).send('err');
  }
});

app.post('/', paymentValidationRules(), validate, async function (req, res) {
  const amountReq = req.body.amount;
  try {
    await addPayment(amountReq);
    res.status(200).send('payment sent');
  } catch (error) {
    console.log('fail');
    res.status(400).send('failed to send payment');
  }
});

const port =
  process.env.NODE_ENV === 'test' ? process.env.HOST_TEST : process.env.HOST;
app.listen(port);

console.log('running on port ', port);

module.exports = {
  app,
};
