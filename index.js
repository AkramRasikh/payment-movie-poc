require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const uuid = require('uuid');
const { getPayments, addPayment } = require('./payment-aws-methods');
const { validationResult } = require('express-validator');

app.use(bodyParser.json())

app.get('/', async function (req, res) {
  try {
    const { Items: allPayments } = await getPayments()
    res.status(200).send(allPayments)
  } catch (error) {
    res.status(400).send('err')
  }
})
 
app.post('/', async function (req, res) {
  const errors = validationResult(req);
  if (errors) {
    res.status(422).send({ errors: errors.mapped() })
  }
  
  const uuid1 = uuid.v1();
  const paymentReq = req.body.payment
  try {
    await addPayment({ paymentId: uuid1, amount: paymentReq })
    res.send('payment sent!')
  } catch (error) {
    res.status(400)
  }
})
 
app.listen(3002)