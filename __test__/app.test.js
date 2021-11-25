const request = require("supertest");
const { app: mockApp } = require("../app");
const paymentMethods = require('../payment-aws-methods')
jest.mock('../payment-aws-methods')

beforeEach(() => {
  jest.clearAllMocks()
})


it('responds with payments', async () => {
  paymentMethods.getPayments.mockImplementation(() => ({ Items: [{ paymentId: 1, amount: 1000 }]}))
  await request(mockApp)
    .get('/')
    .expect(200)
    .expect([{ paymentId: 1, amount: 1000 }]);
});

it('add payment responds with 422 when no body passed', async () => {
  await request(mockApp)
    .post('/')
    .expect(422)
  expect(paymentMethods.addPayment).not.toHaveBeenCalled()
});

it('add payment responds with 200', async () => {
  await request(mockApp)
    .post('/')
    .send({ amount: 1234 })
    .expect(200)
  expect(paymentMethods.addPayment).toHaveBeenCalled()
});
