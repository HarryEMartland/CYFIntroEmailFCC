const messages = require('../src/messages');
const messageSender = require('../src/messageSender');
const notification = require('../src/notification');
const sinon = require('sinon');

describe('messageSender', function () {

    let sandbox;
    beforeEach(function () {
        sandbox = sinon.createSandbox();
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('#sendAllMessages', function () {

        it('should call get messages and send them', function () {

            const introSMS = "intro sms";
            const introEmailHtml = "intro email html";
            const introEmailText = "intro email text";
            const instructionsSMS = "instructions sms";
            const instructionsEmailHtml = "instructions email html";
            const instructionsEmailText = "instructions email text";
            const introEmailSubject = "intro subject";
            const instructionEmailSubject = "instruc sub";
            const user = {
                phoneNumber: 432432432,
                email: "test@test.com",
                bcc: "bcc@test.com",
                ownerEmail: "manchester@cyf.io"
            };

            sandbox.stub(messages, 'getIntroSMS').returns(introSMS);
            sandbox.stub(messages, 'getIntroEmailSubject').returns(introEmailSubject);
            sandbox.stub(messages, 'getIntroEmailHtml').returns(introEmailHtml);
            sandbox.stub(messages, 'getIntroEmailText').returns(introEmailText);
            sandbox.stub(messages, 'getInstructionsSMS').returns(instructionsSMS);
            sandbox.stub(messages, 'getInstructionsEmailSubject').returns(instructionEmailSubject);
            sandbox.stub(messages, 'getInstructionsEmailHtml').returns(instructionsEmailHtml);
            sandbox.stub(messages, 'getInstructionsEmailText').returns(instructionsEmailText);

            sandbox.stub(notification, 'sendSMS').returns(Promise.resolve());
            sandbox.stub(notification, 'sendEmail').returns(Promise.resolve());

            const promise = messageSender.sendAllMessage(user);

            sandbox.assert.calledWith(messages.getIntroSMS, user);
            sandbox.assert.calledWith(messages.getIntroEmailHtml, user);
            sandbox.assert.calledWith(messages.getIntroEmailText, user);
            sandbox.assert.calledWith(messages.getIntroEmailSubject, user);
            sandbox.assert.calledWith(messages.getInstructionsSMS, user);
            sandbox.assert.calledWith(messages.getInstructionsEmailHtml, user);
            sandbox.assert.calledWith(messages.getInstructionsEmailText, user);
            sandbox.assert.calledWith(messages.getInstructionsEmailSubject, user);

            sandbox.assert.calledWith(notification.sendSMS, user.phoneNumber, introSMS);
            sandbox.assert.calledWith(notification.sendSMS, user.phoneNumber, instructionsSMS);
            sandbox.assert.calledWith(notification.sendEmail, user.email, user.bcc, user.ownerEmail, instructionEmailSubject, instructionsEmailHtml, instructionsEmailText);
            sandbox.assert.calledWith(notification.sendEmail, user.email, user.bcc, user.ownerEmail, introEmailSubject, introEmailHtml, introEmailText);

            return promise;
        })

    })
});