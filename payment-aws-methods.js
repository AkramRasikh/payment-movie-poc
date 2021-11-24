const { dynamoClient, TABLE_NAME } = require('./dynamo')

const getPayments = async () => {
    const params = {
        TableName: TABLE_NAME
    };
    const payments = await dynamoClient.scan(params).promise();
    return payments
}

const addPayment = async (singlePayment) => {
    const params = {
        TableName: TABLE_NAME,
        Item: singlePayment
    };
    return await dynamoClient.put(params).promise();
}

module.exports = {
    getPayments,
    addPayment
}