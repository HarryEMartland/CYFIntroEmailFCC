const fetch = require('node-fetch');

const pipedriveKey = process.env.PIPEDRIVE_KEY;
const pipedriveBaseUrl = 'https://api.pipedrive.com/v1/';

const USERS = {
    MANCHESTER: 2643534
};

const STAGES = {
    GENERAL_APPLICATION: 1,
    EMAIL_SENT: 20,
};

function mapDeals(deal) {
    return {
        id: deal.id,
        email: deal.person_id.email[0].value,
        phoneNumber: deal.person_id.phone[0].value,
        ownerEmail: deal.user_id.email,
        cc: deal.cc_email,
        name: deal.person_name
    }
}

exports.getDeals = function () {
    return fetch(pipedriveBaseUrl + 'deals?&user_id=' + USERS.MANCHESTER + '&stage_id=' + STAGES.GENERAL_APPLICATION + '&status=open&start=0&api_token=' + pipedriveKey + '&limit=1')
        .then(function (value) {
            return value.json()
        }).then(function (value) {
            return (value.data || []).map(mapDeals);
        });
};

exports.moveToEmailSent =function(deal) {
    return fetch(pipedriveBaseUrl + '/deals/' + deal.id + '?api_token=' + pipedriveKey, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"stage_id": STAGES.EMAIL_SENT})
    }).then(() => deal);
};

