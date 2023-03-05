'use strict';
'use strict';
const axios = require('axios');

const SLACK_WEBHOOK_URL_KEY = 'SLACK_WEBHOOK_URL';
const SPAM_TYPE = 'SpamNotification';
const INVALID_DATA_RESPONSE = `No message sent to slack, message type missing or type did not match '${SPAM_TYPE}'`;
const BAD_SLACK_RESPONSE = `No message sent to slack, error posting to slack webhook:`;
const SLACK_MSG_SENT_RESPONSE = `Message sent to slack message type matched '${SPAM_TYPE}'`;

const AXIOS_PARAMS = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    url: process.env[SLACK_WEBHOOK_URL_KEY],
};

async function sendSlackSpamNotify(event) {
    let response = INVALID_DATA_RESPONSE;
    const {type, destEmail, bouncedAt} = extractBouncePostBody(event);
    if (type === SPAM_TYPE) {
        const params = {
            ...AXIOS_PARAMS,
            data: {text: `Spam bounce notification. Destination email: '${destEmail}' at time: '${bouncedAt}'.`}
        };
        const result = await sendAxiosRequest(params);
        if (result.success) {
            response = SLACK_MSG_SENT_RESPONSE;
        } else {
            response = `${BAD_SLACK_RESPONSE} ${result.message}`;
        }
    }
    return {statusCode: 200, body: JSON.stringify({message: response})};
}

function extractBouncePostBody(event) {
    let body;
    try {
        body = JSON.parse(event.body);
    } catch (error) {
        console.error(error);
    }
    const {Type: type = null, Email: destEmail = 'undefined', BouncedAt: bouncedAt = 'undefined'} = body || {};
    return {type, destEmail, bouncedAt};
}

async function sendAxiosRequest(params) {
    let result = {success: true};
    let response;
    try {
        response = await axios(params);
        result.message = response.data;
    } catch (error) {
        response = error.response;
        console.error(response);
        result.success = false;
        result.message = JSON.stringify({status: response.status, statusText: response.statusText, data: response.data});
    }
    return result;
}

// noinspection JSUnusedGlobalSymbols
module.exports = {sendSlackSpamNotify};
