var ko = require('knockout');
var root = require('../../root');
var utils = require('../../utils');
var serverService = require('../../services/server_service');

var fields = ['email','name','firstName','lastName','sharingScope','notifyByEmail',
    'dataGroups[]','healthCode','allDataGroups[]','attributes[]','externalId','languages', 'roles'];
    
var persistedFields = ['firstName','lastName','sharingScope','notifyByEmail','dataGroups[]','languages'];

var usersEmail = null;

serverService.addSessionStartListener(function(session) {
    usersEmail = session.email;
});
serverService.addSessionEndListener(function() {
    usersEmail = null;
});

function formatList(list) {
    return (list || []).sort().map(function(el) {
        return utils.formatTitleCase(el);
    }).join(", ");
}

module.exports = function(params) {
    var self = this;
    
    utils.observablesFor(self, fields);
    self.emailObs(decodeURIComponent(params.email));
    self.healthCodeObs('N/A');
    
    self.signOutUser = function(vm, event) {
        utils.startHandler(vm, event);
        var signOutEmail = vm.emailObs();
        
        if (signOutEmail === usersEmail) {
            serverService.signOut();    
        } else {
            serverService.signOutUser(vm.emailObs())
                .then(utils.successHandler(vm, event, "User signed out."))
                .catch(utils.failureHandler(vm, event));
        }
    };
    self.save = function(vm, event) {
        var object = {}
        utils.observablesToObject(vm, object, persistedFields);
        self.study.userProfileAttributes.map(function(key) {
            object[key] = self[key+"Obs"]();
        });
        
        utils.startHandler(vm, event);
        var email = vm.emailObs();

        // New APIs coming to update more than this. 
        serverService.updateDataGroups(email, object)
            .then(utils.successHandler(vm, event, "Data groups updates."))
            .catch(utils.failureHandler(vm, event));
    };
    
    self.study = null;
    serverService.getStudy().then(function(study) {
        self.study = study;
        // there's a timer in the control involved here, we need to use an observer
        self.allDataGroupsObs(study.dataGroups);
    }).then(function(response) {
        serverService.getParticipant(self.emailObs()).then(function(response) {
            var scope = utils.snakeToTitleCase(response.sharingScope, "No sharing set");
            self.nameObs(utils.formatName(response));
            self.firstNameObs(response.firstName);
            self.lastNameObs(response.lastName);
            self.externalIdObs(response.externalId);
            self.sharingScopeObs(scope);
            self.notifyByEmailObs(response.notifyByEmail ? "Yes" : "No");
            self.dataGroupsObs(response.dataGroups);
            if (self.study.healthCodeExportEnabled) {
                self.healthCodeObs(response.healthCode);    
            }
            self.languagesObs(response.languages.join(", "));
            self.rolesObs(formatList(response.roles));
            var attrs = self.study.userProfileAttributes.map(function(key) {
                self[key+"Label"] = utils.snakeToTitleCase(key,'');
                self[key+"Obs"] = ko.observable(response.attributes[key]);
                return {key: utils.snakeToTitleCase(key,''), value: response.attributes[key]}; 
            });
            self.attributesObs(attrs);
        }).catch(utils.errorHandler);        
    }).catch(utils.errorHandler);

}