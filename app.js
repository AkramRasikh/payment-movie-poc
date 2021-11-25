require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const uuid = require('uuid');
const { getPayments, addPayment } = require('./payment-aws-methods');
const { paymentValidationRules, validate } = require('./validator');

app.use(bodyParser.json())

app.get('/', async function (_, res) {
  try {
    const { Items: allPayments } = await getPayments()
    res.status(200).send(allPayments)
  } catch (error) {
    res.status(400).send('err')
  }
})
 
app.post('/', paymentValidationRules(), validate, async function (req, res) {
  const uuid1 = uuid.v1();
  const paymentReq = req.body.payment
  try {
    await addPayment({ paymentId: uuid1, amount: paymentReq })
    return res.status(200).send('payment sent')
  } catch (error) {
    return res.status(400).send()
  }
})
 
app.listen(process.env.HOST)

module.exports = {
  app
}