const Handlebars = require('handlebars');
const fs = require('fs');

const introSMSTemplate = Handlebars.compile(fs.readFileSync('src/messages/intro/sms.txt', 'utf8'));
const introEmailHtmlTemplate = Handlebars.compile(fs.readFileSync('src/messages/intro/email.html', 'utf8'));
const introEmailTextTemplate = Handlebars.compile(fs.readFileSync('src/messages/intro/email.txt', 'utf8'));
const introEmailSubjectTemplate = Handlebars.compile(fs.readFileSync('src/messages/intro/email.subject.txt', 'utf8'));

const instructionsEmailSubjectTemplate = Handlebars.compile(fs.readFileSync('src/messages/instructions/email.subject.txt', 'utf8'));
const instructionsEmailHtmlTemplate = Handlebars.compile(fs.readFileSync('src/messages/instructions/email.html', 'utf8'));
const instructionsEmailTextTemplate = Handlebars.compile(fs.readFileSync('src/messages/instructions/email.txt', 'utf8'));
const instructionsSMSTemplate = Handlebars.compile(fs.readFileSync('src/messages/instructions/sms.txt', 'utf8'));

const emailTextFooter = fs.readFileSync('src/messages/footer/email.txt', 'utf8');
const emailHtmlFooter = fs.readFileSync('src/messages/footer/email.html', 'utf8');

exports.getIntroSMS = function (user) {
    return introSMSTemplate(user);
};

exports.getIntroEmailText = function (user) {
    return introEmailTextTemplate(user)+emailTextFooter;
};

exports.getIntroEmailHtml = function (user) {
    return introEmailHtmlTemplate(user)+emailHtmlFooter;
};

exports.getIntroEmailSubject = function (user) {
    return introEmailSubjectTemplate(user);
};

exports.getInstructionsSMS = function (user) {
    return instructionsSMSTemplate(user);
};

exports.getInstructionsEmailText = function (user) {
    return instructionsEmailTextTemplate(user)+emailTextFooter;
};

exports.getInstructionsEmailHtml = function (user) {
    return instructionsEmailHtmlTemplate(user)+emailHtmlFooter
};

exports.getInstructionsEmailSubject = function (user) {
    return instructionsEmailSubjectTemplate(user);
};