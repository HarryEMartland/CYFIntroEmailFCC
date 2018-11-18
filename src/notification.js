const AWS = require('aws-sdk');

const SNS = AWS.SNS;
const SES = AWS.SES;

module.exports.sendEmail = function (to, bcc, from, subject, htmlBody, textBody) {
    const params = {
        Destination: {
            BccAddresses: [bcc],
            ToAddresses: [to]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: htmlBody
                },
                Text: {
                    Charset: "UTF-8",
                    Data: textBody
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject
            }
        },
        Source: from,
        ReplyToAddresses: [from],
    };
    return SES.sendEmail(params).promise()
};

module.exports.sendSMS = function (phoneNumber, message) {

    const params = {
        Message: message,
        MessageStructure: 'string',
        PhoneNumber: phoneNumber,
        MessageAttributes: {
            'AWS.SNS.SMS.SenderID': {
                DataType: 'String',
                StringValue: 'CYF'
            }
        }
    };

    return SNS.publish(params).promise();
};