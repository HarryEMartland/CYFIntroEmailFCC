const assert = require('assert');
const process = require('../src/process');
const pipedrivetest = require('../src/pipedrive');
const messages = require('../src/messages');
const messageSender = require('../src/messageSender');
const notification = require('../src/notification');
const sinon = require('sinon');
const fetch = require('node-fetch');
const proxyquire = require('proxyquire');
const pipedrive = require('../src/pipedrive');


describe('pipedrive', function () {

    let sandbox;
    beforeEach(function () {
        sandbox = sinon.createSandbox();
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('#getDeals()', function () {
        it('should covert to nice json', function () {

            sandbox.stub(fetch, 'Promise').returns(Promise.resolve({
                json: () => Promise.resolve({
                    data: [{
                        id: 432,
                        cc_email: "deal123@pipedrive.com",
                        person_name: "bob",
                        person_id: {
                            email: [{value: "applicant1@test.com"}],
                            phone: [{value: "6545832543"}]
                        },
                        user_id: {
                            email: "london@test.com"
                        }
                    }, {
                        id: 87654,
                        cc_email: "deal765@pipedrive.com",
                        person_name: "sandra",
                        user_id: {
                            email:"manchester@test.com"
                        },
                        person_id: {
                            email: [{value: "applicant2@test.com"}],
                            phone: [{value: "32345"}]
                        }
                    }]
                })
            }));

            return pipedrive.getDeals().then(function (deals) {
                assert.equal(deals[0].id, 432);
                assert.equal(deals[0].name, "bob");
                assert.equal(deals[0].email, "applicant1@test.com");
                assert.equal(deals[0].cc, "deal123@pipedrive.com");
                assert.equal(deals[0].ownerEmail, "london@test.com");
                assert.equal(deals[0].phoneNumber, "6545832543");

                assert.equal(deals[1].id, 87654);
                assert.equal(deals[1].name, "sandra");
                assert.equal(deals[1].email, "applicant2@test.com");
                assert.equal(deals[1].cc, "deal765@pipedrive.com");
                assert.equal(deals[1].ownerEmail, "manchester@test.com");
                assert.equal(deals[1].phoneNumber, "32345");
            })

        });

        it('should convert phone numbers to +44', function () {
            sandbox.stub(fetch, 'Promise').returns(Promise.resolve({
                json: () => Promise.resolve({
                    data: [{
                        id: 432,
                        cc_email: "deal123@pipedrive.com",
                        person_name: "bob",
                        person_id: {
                            email: [{value: "applicant1@test.com"}],
                            phone: [{value: "0765473890"}]
                        },
                        user_id: {
                            email: "london@test.com"
                        }
                    }]
                })
            }));

            return pipedrive.getDeals().then(function (deals) {
                assert.equal(deals[0].phoneNumber, "+44765473890");
            })
        })
    });
});