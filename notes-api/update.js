import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body); // Parse the request body

  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    Key: {
        userId: event.requestContext.identity.cognitoIdentityId, // The ID of the author
      noteId: event.pathParameters.id, // The ID of the note from the path
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the values in the update expression
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": data.attachment || null, // If no attachment, set to null
      ":content": data.content || null, // If no content, set to null
    },
    // 'ReturnValues' specifies if and how to return the item's attributes
    // 'ALL_NEW' returns all attributes of the item after the update
    ReturnValues: "ALL_NEW",
  };

  // Perform the update on DynamoDB
  await dynamoDb.update(params);

  // Return success status
  return { status: true };
});
