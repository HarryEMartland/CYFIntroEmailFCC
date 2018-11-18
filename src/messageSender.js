const messages = require('./messages');
const notification = require('./notification');


exports.sendAllMessage = function (user) {

    return Promise.all([
        notification.sendSMS(user.phoneNumber, messages.getIntroSMS(user)),
        notification.sendSMS(user.phoneNumber, messages.getInstructionsSMS(user)),

        notification.sendEmail(user.email, user.bcc, user.ownerEmail, messages.getIntroEmailSubject(user), messages.getIntroEmailHtml(user), messages.getIntroEmailText(user)),
        notification.sendEmail(user.email, user.bcc, user.ownerEmail, messages.getInstructionsEmailSubject(user), messages.getInstructionsEmailHtml(user), messages.getInstructionsEmailText(user))
    ]).then(()=>user);
};