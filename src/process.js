const pipedrive = require('./pipedrive');
const messageSender = require('./messageSender');


module.exports.default = function () {

    return pipedrive.getDeals()
        .then(function (users) {
            return Promise.all(users.map(function (user) {
                return messageSender.sendAllMessage(user)
                    .then(pipedrive.moveToEmailSent)
            }))
        })
};