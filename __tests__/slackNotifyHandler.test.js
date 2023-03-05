'use strict';

const handler = require('../slackNotifyHandler');

describe('Test the post to slack', () => {
    test('Will handle empty event data correctly', async () => {
        const event = {};
        let response = await handler.sendSlackSpamNotify(event);
        expect(response.statusCode).toEqual(200);
        let body = JSON.parse(response.body);
        expect(body.message).toContain(`No message sent to slack`);
        expect(body.message).toContain(`message type missing or type did not match 'SpamNotification'`);
    });
});
