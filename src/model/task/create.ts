import { IRequestMyroCompnayCreateTask } from "../task/model";

const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const create  =  async (request: IRequestMyroCompnayCreateTask) => {

    const dynamo = {
        TableName: process.env.MYROTASK_TABLE,
        Item: request
    }

    await dynamoDb.put(dynamo).promise()


}