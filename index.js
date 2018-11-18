const AWS = require('aws-sdk');
const process = require("./src/process");

AWS.config.region = 'eu-west-1';

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
