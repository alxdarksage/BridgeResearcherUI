var ko = require('knockout');
var serverService = require('../../services/server_service');
var utils = require('../../utils');
// importing root here generates all sorts of weird behavior. Note that we have to create a root variable in the
// root.js file... it's not CommonJS. Not sure what's going on here.
// var root = require('../../root');

var fields = ['message', 'name', 'sponsorName', 'technicalEmail', 'supportEmail',
    'consentNotificationEmail', 'identifier', 'strictUploadValidationEnabled'];

module.exports = function() {
    var self = this;

    utils.observablesFor(self, fields);
    self.publishedObs = ko.observable(false);

    self.save = function(vm, event) {
        utils.startHandler(self, event);
        utils.observablesToObject(self, self.study, fields);

        serverService.saveStudy(self.study)
            .then(function(response) {
                self.study.version = response.version;
            })
            .then(utils.successHandler(vm, event, "Study information saved."))
            .catch(utils.failureHandler(vm, event));
    };
    self.publicKey = function() {
        if (self.study) {
            // It finds this and it works...
            root.openDialog('publickey', {study: self.study});
        }
    };

    serverService.getStudy().then(function(study) {
        self.study = study;
        utils.valuesToObservables(self, study, fields);
    });
};
