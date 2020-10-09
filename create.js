import * as uuid from 'uuid'
import handler from './libs/handler-lib'
import dynamoDb from './libs/dynamodb-lib'

export const main = handler(async (event, context) => {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body)
  const params = {
    TableName: process.env.tableName,
    // 'Item' contains the attributes of the item to be created
    // - 'id': a unique uuid
    // - 'name': parsed from request body
    // - 'comment': parsed from request body
    // - 'imageUrl': parsed from request body
    // - 'yumFactor': parsed from request body
    Item: {
      id: uuid.v1(),
      name: data.name,
      comment: data.comment,
      imageUrl: data.imageUrl,
      yumFactor: data.yumFactor
    }
  }

  await dynamoDb.put(params)

  return params.Item
})
