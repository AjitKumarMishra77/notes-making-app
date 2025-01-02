const config = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-api-prod-serverlessdeploymentbucket-qwx9eeigl0gf",
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://qeoqhqe7hg.execute-api.us-east-1.amazonaws.com/prod",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_JpKBVkiH8",
    APP_CLIENT_ID: "242b71a2h5or3pmvv6bbitorau",
    IDENTITY_POOL_ID: "us-east-1:af3c4225-5992-4e85-886c-3244590e20e7",
  },
  MAX_ATTACHMENT_SIZE: 5000000,
};

export default config;
