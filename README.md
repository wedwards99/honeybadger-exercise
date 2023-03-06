## Honeybadger Exercise

This is a simple POST endpoint the will send a message to slack if the posted object is for an email bounced because it violated spam protection.

This runs as an AWS Lambda function written in NodeJS triggered by an API Gateway POST request.

In order to deploy and run this you will require:

1. An AWS account see: https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/
2. NodeJS installed see: https://nodejs.org/en/download/
3. Serverless framework installed see: https://www.serverless.com/framework/docs/getting-started
4. A slack webhook URL see: https://api.slack.com/messaging/webhooks

### Deploying the application

After cloning or unzipping the application run `npm install` and run the unit test: `npm test` to make sure everything is installed ok.

![](readme-images/install.png?raw=true)


To deploy the endpoint to AWS:

1. Set the environment variable **SLACK_WEBHOOK_URL** with the URL of your Slack channel webhook.
2. Run the serverless deployment command ```serverless deploy --stage dev``` which will return the AWS assigned URL for the POST request.


![](readme-images/deploy.png?raw=true)

### Running the Slack notification endpoint

Use Postman, Insomnia or curl to test the endpoint, only messages with the Type *SpamNotification* should trigger the slack message.


![](readme-images/api-call-slack-msg.png?raw=true)



### What would I do next?

1. There is only one unit test that covers the simplest of cases, more tests need to be added to give close to complete coverage and test as many outcomes and problems as possible.
2. Add some tidier input parsing and validation like Joi or other.
3. Make the Slack message prettier.
4. Map the API gateway URL domain with a custom branded domain.  The URL would look something like(ish): https://api.honeybadger.com/slackSpamNotify