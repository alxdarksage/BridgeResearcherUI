var ko = require('knockout');
var serverService = require('../../services/server_service');
var utils = require('../../utils');

var fields = ["minAgeOfConsent", "maxNumOfParticipants"];

module.exports = function() {
    var self = this;

    self.study = null;
    self.message = ko.observable("");
    self.errorFields = ko.observableArray();
    utils.observablesFor(self, fields);

    self.minAge = ko.computed(function(){
        return (self.minAgeOfConsent() == 0) ? "No age limit" : self.minAgeOfConsent();
    });
    self.maxNum = ko.computed(function(){
        return (self.maxNumOfParticipants() == 0) ? "No limit" : self.maxNumOfParticipants();
    });

    self.errorFor = function(fieldName) {
        return ko.computed(function() {
            return (self.errorFields.indexOf(fieldName) > -1) ? "error" : "";
        });
    };

    self.save = function(vm, event) {
        utils.startHandler(vm, event);
        utils.observablesToObject(self, self.study, fields);

        serverService.saveStudy(self.study)
            .then(utils.successHandler(self, event))
            .then(function(response) {
                self.study.version = response.version;
                self.message({text:"Study updated."});
            })
            .catch(utils.failureHandler(self, event));
    };

    serverService.getStudy().then(function(study) {
        self.study = study;
        utils.valuesToObservables(self, study, fields);
    });
};