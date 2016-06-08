var ko = require('knockout');
var serverService = require('./services/server_service');
var config = require('./config');
var toastr = require('toastr');
var bind = require('./binder');

// Used in navigation to keep a section highlighted as you navigate into it.
var pageSets = {
    'info': ['info', 'email', 'data_groups', 'eligibility', 'synapse'],
    'surveys': ['surveys','survey','survey_versions', "survey_schema"],
    'schemas': ['schemas','schema','schema_versions'],
    'scheduleplans': ['scheduleplans','scheduleplan'],
    've_template': ['ve_template', 'rp_template'],
    'subpopulations': ['subpopulations', 'subpopulation', 'subpopulation_editor', 'subpopulation_history', 'subpopulation_download'],
    'participants': ['participants','participant','participant_consents'],
    'externalIds': ['external_ids'],
    'admin/info': ['admin_info'],
    'admin/cache': ['admin_cache']
};
function roleFunc(observer, role) {
    return ko.computed(function() {return observer.contains(role);});        
}

toastr.options = config.toastr;

var RootViewModel = function() {
    var self = this;

    var binder = bind(self)
        .obs('environment', '')
        .obs('studyName', '')
        .obs('studyIdentifier')
        .obs('selected', '')
        .obs('roles[]', [])
        .obs('mainPage', 'start')
        .obs('mainParams', {})
        .obs('editorPanel', 'none')
        .obs('editorParams', {})
        .obs('showParticipants', false)
        .obs('showLabCodes', false)
        .obs('showExternalIds', false)
        .obs('isEditorPanelVisible', false)
        .obs('isEditorTabVisible', false)
        .obs('showNavigation', true)
        .obs('dialog', {name: 'none'});

    self.mainPageObs.subscribe(self.selectedObs);
    self.mainPageObs.subscribe(function() {
        self.setEditorPanel('none',{});
    });
    self.showNav = function() {
        self.showNavigationObs(true);
    };
    self.hideNav = function() {
        self.showNavigationObs(false);
    };
    self.setEditorPanel = function(name, params) {
        self.editorPanelObs(name);
        self.editorParamsObs(params);
        self.isEditorPanelVisibleObs(name !== 'none');
        self.isEditorTabVisibleObs(true);
    };
    self.toggleEditorTab = function() {
        self.isEditorTabVisibleObs(!self.isEditorTabVisibleObs());
    };
    self.isActive = function(tag) {
        if (pageSets[tag]) {
            return pageSets[tag].indexOf(self.selectedObs()) > -1;
        }
        return tag === self.selectedObs();
    };
    self.signOut = function() {
        console.log("Signing out.");
        serverService.signOut();
    };
    self.changeView = function(name, params) {
        self.isEditorTabVisibleObs(false);
        self.isEditorPanelVisibleObs(false);
        self.mainPageObs(name);
        self.mainParamsObs(params);
    };

    self.isResearcher = roleFunc(self.rolesObs, 'researcher');
    self.isDeveloper = roleFunc(self.rolesObs, 'developer');
    self.isAdmin = roleFunc(self.rolesObs, 'admin');

    self.openDialog = function(dialogName, params) {
        self.dialogObs({name: dialogName, params: params});
    };
    self.closeDialog = function() {
        self.dialogObs({name: 'none'});
    };
    self.isDevEnvObs = ko.computed(function() {
        return ['local','develop','staging'].indexOf(self.environmentObs()) > -1; 
    });
    /**
     * Displays a message that we UI insiders like to call "a piece of toast"
     * @param severity {String} one of 'success', 'info', 'warning' or 'error'
     * @param message {String} the message for the toast
     */
    self.message = function(severity, message) {
        if (toastr[severity]) {
            toastr[severity](message);
        } else {
            throw new Error(severity + ' is not a message type');
        }
    };
    serverService.addSessionStartListener(function(session) {
        self.studyNameObs("&ldquo;" + session.studyName + "&rdquo;");
        self.environmentObs(session.environment);
        self.studyIdentifierObs(session.studyId);
        self.rolesObs(session.roles);
        self.closeDialog();
        serverService.getStudy().then(function(study) {
            // show Participants if emailVerificationEnabled.
            self.showParticipantsObs(study.emailVerificationEnabled && self.isResearcher());
            // otherwise show Lab Codes. Note roles are different
            self.showLabCodesObs(!study.emailVerificationEnabled && self.isDeveloper());
            // Show external IDs if emailVerificationEnabled and externalIdValidationEnabled
            self.showExternalIdsObs(study.emailVerificationEnabled && study.externalIdValidationEnabled && self.isDeveloper());
        });
    });
    serverService.addSessionEndListener(function(session) {
        self.studyNameObs("");
        self.environmentObs("");
        self.studyIdentifierObs("");
        self.rolesObs([]);
        self.showParticipantsObs(false);
        self.showLabCodesObs(false);
        self.showExternalIdsObs(false);
        self.openDialog('sign_in_dialog');
    });
};

var root = new RootViewModel();

root.queryParams = {};
if (document.location.search) {
    document.location.search.substring(1).split("&").forEach(function(pair) {
        var fragments = pair.split("=");
        root.queryParams[decodeURIComponent(fragments[0])] = decodeURIComponent(fragments[1]);
    });
}
console.debug("root.queryParams", root.queryParams);

module.exports = root;
ko.applyBindings(root, document.body);

window.addEventListener("load", function() {
    document.body.style.opacity = "1.0";
}, false);