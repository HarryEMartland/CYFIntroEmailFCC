const Handlebars = require('handlebars');
const fs = require('fs');
const showdown = require('showdown');
const converter = new showdown.Converter();

const introSMSTemplate = Handlebars.compile(fs.readFileSync('src/messages/intro/sms.txt', 'utf8'));
const introEmailTemplate = Handlebars.compile(fs.readFileSync('src/messages/intro/email.md', 'utf8'));
const introEmailSubjectTemplate = Handlebars.compile(fs.readFileSync('src/messages/intro/email.subject.txt', 'utf8'));

const instructionsEmailSubjectTemplate = Handlebars.compile(fs.readFileSync('src/messages/instructions/email.subject.txt', 'utf8'));
const instructionsEmailTemplate = Handlebars.compile(fs.readFileSync('src/messages/instructions/email.md', 'utf8'));
const instructionsSMSTemplate = Handlebars.compile(fs.readFileSync('src/messages/instructions/sms.txt', 'utf8'));

exports.getIntroSMS = function (user) {
    return introSMSTemplate(user);
};

exports.getIntroEmailText = function (user) {
    return introEmailTemplate(user);
};

exports.getIntroEmailHtml = function (user) {
    return converter.makeHtml(exports.getIntroEmailText(user))
};

exports.getIntroEmailSubject = function (user) {
    return introEmailSubjectTemplate(user);
};

exports.getInstructionsSMS = function (user) {
    return instructionsSMSTemplate(user);
};

exports.getInstructionsEmailText = function (user) {
    return instructionsEmailTemplate(user);
};

exports.getInstructionsEmailHtml = function (user) {
    return converter.makeHtml(exports.getInstructionsEmailText(user))
};

exports.getInstructionsEmailSubject = function (user) {
    return instructionsEmailSubjectTemplate(user);
};