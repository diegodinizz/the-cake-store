import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'id': path parameter
    Key: {
      id: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET #n = :name, #c = :comment, imageUrl = :imageUrl, yumFactor = :yumFactor",
    ExpressionAttributeValues: {
      ":yumFactor": data.yumFactor || null,
      ":imageUrl": data.imageUrl || null,
      ":comment": data.comment || null,
      ":name": data.name || null,
    },
    // name and comment conflicts with a DynamoDB reserved word. Define an expression attribute name to use in the place of the reserved word
    ExpressionAttributeNames: {
      "#n": "name",
      "#c": "comment",
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  await dynamoDb.update(params);

  return { status: true };
});