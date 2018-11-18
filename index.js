const AWS = require('aws-sdk');
const process = require("./src/process");

AWS.config.region = 'eu-west-1';
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

exports.handler = function (event, context, callback) {
    return process()
        .catch(function (error) {
            console.error(error);
            callback(error, null);
        })
        .then(function () {
            callback(null, null);
        });
};
