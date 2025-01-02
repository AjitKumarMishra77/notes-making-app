import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    // 'KeyConditionExpression' defines the condition for the query
    // '- userId =:userId' returns items where the 'userId' matches the given value
    KeyConditionExpression: "userId = :userId",
    // 'ExpressionAttributeValues' defines the value in the condition
    // ':userId' is the value that represents the author's user ID
    ExpressionAttributeValues: {
        ":userId": event.requestContext.identity.cognitoIdentityId,
    },
  };

  // Perform the query on DynamoDB
  const result = await dynamoDb.query(params);

  // Return the list of matching items in the response body
  return result.Items;
});
