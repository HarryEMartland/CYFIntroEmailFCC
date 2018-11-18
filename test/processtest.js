const process = require('../src/process');
const pipedrive = require('../src/pipedrive');
const messageSender = require('../src/messageSender');
const sinon = require('sinon');

describe('process', function () {

    let sandbox;
    beforeEach(function () {
        sandbox = sinon.createSandbox();
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('#default()', function () {
        it('should call getDeals and sendAllMessages', function () {

            const user = {id:534};
            sandbox.stub(pipedrive, 'getDeals').returns(Promise.resolve([user]));
            sandbox.stub(pipedrive, 'moveToEmailSent').returns(Promise.resolve(user));
            sandbox.stub(messageSender, 'sendAllMessage').returns(Promise.resolve(user));

            return process.default().then(function () {
                sandbox.assert.calledWith(messageSender.sendAllMessage, user);
                sandbox.assert.calledWith(pipedrive.moveToEmailSent, user);
            });
        });


        it('should call getDeals and sendAllMessages multiple', function () {

            const user1 = {id: 1};
            const user2 = {id: 2};
            const user3 = {id: 3};
            sandbox.stub(pipedrive, 'getDeals').returns(Promise.resolve([user1, user2, user3]));

            const sendAllStub = sandbox.stub(messageSender, 'sendAllMessage');
            sendAllStub.withArgs(user1).returns(Promise.resolve(user1));
            sendAllStub.withArgs(user2).returns(Promise.resolve(user2));
            sendAllStub.withArgs(user3).returns(Promise.resolve(user3));

            sandbox.stub(pipedrive, 'moveToEmailSent').returns(Promise.resolve());


            return process.default().then(function () {
                sandbox.assert.calledWith(messageSender.sendAllMessage, user1);
                sandbox.assert.calledWith(pipedrive.moveToEmailSent, user1);

                sandbox.assert.calledWith(messageSender.sendAllMessage, user2);
                sandbox.assert.calledWith(pipedrive.moveToEmailSent, user2);

                sandbox.assert.calledWith(messageSender.sendAllMessage, user3);
                sandbox.assert.calledWith(pipedrive.moveToEmailSent, user3);

            });
        });
    });
});