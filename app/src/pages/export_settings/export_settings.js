import {serverService} from '../../services/server_service';
import alerts from '../../widgets/alerts';
import Binder from '../../binder';
import fn from '../../functions';
import ko from 'knockout';
import root from '../../root';
import utils from '../../utils';

const BASE = "https://www.synapse.org/#!";
const CREATE_MSG = "Please enter your Synapse user account ID\n(you'll be made the administrator of the project):";
const EXPORT_MSG = "Unexported study data is being exported to Synapse.\n" + 
    "This can take some time.\nVisit your project in Synapse to see your newly uploaded data.";
function exportingMsg() {
    alerts.notification("Starting Data Export", EXPORT_MSG);
}

module.exports = function() {
    var self = this;

    var binder = new Binder(self)
        .bind('synapseDataAccessTeamId')
        .bind('synapseProjectId')
        .bind('usesCustomExportSchedule')
        .bind('uploadValidationStrictness', 'warning')
        .bind('disableExport');

    fn.copyProps(self, root, 'isDeveloper', 'isResearcherOnly');

    self.isLinked = ko.computed(function() {
        return fn.isNotBlank(self.synapseProjectIdObs()) || 
               fn.isNotBlank(self.synapseDataAccessTeamIdObs());
    });
    self.projectLinkObs = ko.computed(function() {
        var value = self.synapseProjectIdObs();
        return (value) ? (BASE+"Synapse:"+value) : null;
    });
    self.teamLinkObs = ko.computed(function() {
        var value = self.synapseDataAccessTeamIdObs();
        return (value) ? (BASE+"Team:"+value) : null;
    });
    self.startExport = function(self, event) {
        utils.startHandler(self, event);

        serverService.startExport()
            .then(utils.successHandler(self, event))
            .then(exportingMsg)
            .catch(utils.failureHandler({transient:false}));
    };
    self.createSynapseProject = function(vm, event) {
        alerts.prompt(CREATE_MSG, function(synapseUserId) {
            utils.startHandler(self, event);
            serverService.createSynapseProject(synapseUserId).then(function(response) {
                self.synapseDataAccessTeamIdObs(response.teamId);
                self.synapseProjectIdObs(response.projectId);
            }).then(utils.successHandler(vm, event, "Synapse information created."))
            .catch(utils.failureHandler({transient:false}));
        });
    };
    self.save = function(vm, event) {
        utils.startHandler(self, event);
        self.study = binder.persist(self.study);

        serverService.saveStudy(self.study)
            .then(utils.successHandler(vm, event, "Synapse information saved."))
            .catch(utils.failureHandler());
    };

    serverService.getStudy()
        .then(binder.assign('study'))
        .then(binder.update())
        .catch(utils.failureHandler());
};
module.exports.prototype.dispose = function() {
    this.isLinked.dispose();
    this.projectLinkObs.dispose();
    this.teamLinkObs.dispose();
};