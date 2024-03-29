import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be removed
    // - 'id': path parameter
    Key: {
      id: event.pathParameters.id
    }
  };

  await dynamoDb.delete(params);

  return { status: true };
});