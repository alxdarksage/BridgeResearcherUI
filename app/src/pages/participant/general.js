import alerts from "../../widgets/alerts";
import Binder from "../../binder";
import fn from "../../functions";
import ko from "knockout";
import root from "../../root";
import optionsService from "../../services/options_service";
import serverService from "../../services/server_service";
import utils from "../../utils";

const failureHandler = utils.failureHandler({
  id: "participant-general",
  redirectTo: "participants",
  redirectMsg: "Participant not found"
});
const OPTIONS = [
  { value: "no_sharing", label: "No Sharing" },
  { value: "sponsors_and_partners", label: "Sponsors And Partners" },
  { value: "all_qualified_researchers", label: "All Qualified Researchers" }
];
const NEW_PARTICIPANT = { id: "new", attributes: {}, email: "", phone: { number: "", regionCode: "US" } };

function selectRoles(session) {
  let set = new Set();
  for (let i = 0; i < session.roles.length; i++) {
    var role = session.roles[i];
    switch (role) {
      case "superadmin":
        set.add("Super Admin");
        /* falls through */
      case "admin":
        set.add("Worker");
        set.add("Administrator");
        /* falls through */
      case "researcher":
        set.add("Researcher");
        /* falls through */
      case "org_admin":
        set.add("Organization Administrator");
        /* falls through */
        case "developer":
        set.add("Developer");
        /* falls through */
    }
  }
  var roles = Array.from(set);
  roles.sort();
  return roles;
}
function persistExternalId(value, context) {
  if (value && context.vm.studyIdObs() !== 'Select study') {
    context.copy.externalIds = {
      [context.vm.studyIdObs()]: context.vm.newExternalIdObs()
    };
  }
  return value;
}

export default function general(params) {
  let self = this;
  self.participant = NEW_PARTICIPANT;

  let binder = new Binder(self)
    .obs("showEnableAccount", false)
    .obs("isNew", params.userId === "new")
    .obs("healthCode", "N/A", Binder.formatHealthCode)
    .obs("allDataGroups[]")
    .obs("createdOn", null, fn.formatDateTime)
    .obs("modifiedOn", null, fn.formatDateTime)
    .obs("allRoles[]", [])
    .obs("allStudies[]")
    .obs("title", params.userId === "new" ? "New participant" : "&#160;")
    .obs("externalIds", '', Binder.formatExternalIds)
    .bind("newExternalId", null, null, persistExternalId)
    .bind("email", null, null, value => (fn.isBlank(value) ? null : value))
    .bind("phone", null, Binder.formatPhone, Binder.persistPhone)
    .bind("phoneRegion", "US")
    .bind("attributes[]", [], Binder.formatAttributes, Binder.persistAttributes)
    .bind("emailVerified", false)
    .bind("phoneVerified", false)
    .bind("synapseUserId", null, null, (value) => (value) ? value : null)
    .bind("firstName")
    .bind("lastName")
    .bind("sharingScope")
    .bind("notifyByEmail")
    .bind("dataGroups[]")
    .bind("password")
    .bind("languages", null, fn.formatLanguages, fn.persistLanguages)
    .bind("status")
    .bind("userId", params.userId)
    .bind("id", params.userId)
    .bind("roles[]", null, fn.formatRoles, fn.persistRoles)
    .bind("studyId")
    .bind("studyLabel", 'Select study')
    .bind("orgMembership");

  fn.copyProps(self, root, "isAdmin", "isResearcher");

  self.statusObs.subscribe(function(status) {
    self.showEnableAccountObs(status !== "enabled");
  });
  self.addIdentifier = function(credential) {
    return () => {
      let params = {
        editor: credential,
        closeDialog: root.closeDialog,
        appId: root.appIdObs()
      };
      if (credential === 'email') {
        params.email = self.emailObs();
      } else if (credential === 'phone') {
        params.phone = self.phoneObs();
        params.phoneRegion = self.phoneRegionObs();
      } else if (credential === 'synapseUserId') {
        params.synapseUserId = self.synapseUserIdObs();
      }
      root.openDialog('update_identifiers_dialog', params);
    };
  };
  self.emailLink = ko.computed(function() {
    return "mailto:" + self.emailObs();
  });
  self.phoneLink = ko.computed(function() {
    return "tel:" + self.phoneObs();
  });
  self.updateRegion = function(model, event) {
    if (event.target.classList.contains("item")) {
      self.phoneRegionObs(event.target.textContent);
    }
  };
  self.updateStudy = function(model, event) {
    if (event.target.classList.contains("item")) {
      self.studyIdObs(event.target.getAttribute('data-id'));
      self.studyLabelObs(event.target.textContent);
    }
  };
  self.showIdentifier = function(credential) {
    return ko.computed(() => {
      return self[credential + 'Obs']();
    });
  };
  self.showAddIdentifier = function(credential) {
    return ko.computed(() => {
      return !self[credential + 'Obs']() && self.updateIdsVisible();
    });
  };
  self.showDash = function(credential) {
    return ko.computed(() => {
      return !self[credential + 'Obs']() && !self.updateIdsVisible();
    });
  };
  self.formatOrg = function() {
    return self.orgMembershipObs() ? self.orgNames[self.orgMembershipObs()] : '—';
  }

  function makeStatusChanger(status) {
    return function(vm, event) {
      serverService.getParticipant(self.userIdObs())
        .then((participant) => {
          participant.status = status;
          return participant;
        })
        .then((p) => serverService.updateParticipant(p))
        .then(() => self.statusObs(status))
        .then(() => serverService.signOutUser(self.userIdObs()))
        .then(utils.successHandler(self, event, "User account has been "+status+"."))
        .catch(utils.failureHandler({id: 'participant-general'}));
    }
  }

  self.enableAccount = makeStatusChanger("enabled");
  self.disableAccount = makeStatusChanger("disabled");
  self.requestResetPassword = function(vm, event) {
    alerts.confirmation("This will send email to this user.\n\nDo you wish to continue?", function() {
      utils.startHandler(self, event);
      serverService.requestResetPasswordUser(self.userIdObs())
        .then(utils.successHandler(self, event, "Reset password email has been sent to user."))
        .catch(utils.failureHandler({id: 'participant-general'}));
    });
  };
  self.signOutUser = function() {
    root.openDialog("sign_out_user", { userId: self.userIdObs() });
  };
  self.deleteTestUser = function(vm, event) {
    alerts.confirmation("This will delete the account.\n\nDo you wish to continue?", function() {
      utils.startHandler(self, event);
      serverService.deleteTestUser(self.userIdObs())
        .then(utils.successHandler(self, event, "User deleted."))
        .then(() => document.location = "#/participants")
        .catch(utils.failureHandler({id: 'participant-general'}));
    });
  };
  self.resendEmailVerification = function(vm, event) {
    alerts.confirmation("This will send email to this user.\n\nDo you wish to continue?", function() {
      utils.startHandler(vm, event);
      serverService.resendEmailVerification(self.userIdObs())
        .then(utils.successHandler(vm, event, "Sent email to verify participant's email address."))
        .catch(utils.failureHandler({id: 'participant-general'}));
    });
  };
  self.resendPhoneVerification = function(vm, event) {
    alerts.confirmation("This will send an SMS message to this user.\n\nDo you wish to continue?", function() {
      utils.startHandler(vm, event);
      serverService.resendPhoneVerification(self.userIdObs())
        .then(utils.successHandler(vm, event, "Sent message to verify participant's phone number."))
        .catch(utils.failureHandler({id: 'participant-general'}));
    });
  };

  self.resendVisible = ko.computed(() => self.statusObs() === "unverified");
  self.resetPwdVisible = ko.computed(() => self.statusObs() !== "disabled");
  self.enableVisible = ko.computed(() => self.statusObs() === "disabled" && root.isAdmin());
  self.disableVisible = ko.computed(() => self.statusObs() === "enabled" && root.isAdmin());
  self.signOutVisible = ko.computed(() => !['disabled','unverified'].includes(self.statusObs()));
  self.deleteVisible = ko.computed(() => root.isResearcher() && self.dataGroupsObs().includes('test_user'));
  self.updateIdsVisible = ko.observable(false);

  serverService.getSession().then(session => {
    var roles = selectRoles(session);
    self.allRolesObs(roles);
    self.updateIdsVisible(session.id === self.idObs());
  });

  function initApp(app) {
    // there's a timer in the control involved here, we need to use an observer
    self.allDataGroupsObs(app.dataGroups || []);

    let attrs = self.app.userProfileAttributes.map(function(key) {
      return { key: key, label: fn.formatTitleCase(key, ""), obs: ko.observable() };
    });
    self.attributesObs(attrs);
  }
  function getParticipant(response) {
    return self.isNewObs() ? Promise.resolve(NEW_PARTICIPANT) : serverService.getParticipant(self.userIdObs());
  }
  function afterCreate(response) {
    self.statusObs("enabled");
    self.isNewObs(false);
    self.idObs(response.identifier);
    self.userIdObs(response.identifier);
    return response;
  }
  function saveParticipant(participant) {
    if (self.isNewObs()) {
      return serverService.createParticipant(participant)
        .then(afterCreate)
        .then(response => (window.location = "#/participants/" + response.identifier + "/general"));
    } else {
      return serverService.updateParticipant(participant);
    }
  }
  self.sharingScopeOptions = OPTIONS;

  self.formatPhone = function(phone, phoneRegion) {
    return phone ? fn.flagForRegionCode(phoneRegion) + " " + phone : "";
  };

  function updateSynapseUserId(participant) {
    let value = self.synapseUserIdObs();
    if (value === '' || /^\d+$/.test(value)) {
      return Promise.resolve();
    }
    return utils.synapseAliasToUserId(value).then((id) => {
      participant.synapseUserId = id;
      self.synapseUserIdObs(id);
    });
  }

  self.save = function(vm, event) {
    let participant = binder.persist(self.participant);
    let confirmMsg = (self.isNewObs()) ? "Participant created." : "Participant updated.";

    let updatedTitle = self.app.emailVerificationEnabled ? 
      fn.formatNameAsFullLabel(participant) : 
      participant.externalId;
    function updateName() {
      self.titleObs(updatedTitle);
      return serverService.getParticipant(self.userIdObs());
    }

    utils.startHandler(vm, event);
    return updateSynapseUserId(participant)
      .then(() => saveParticipant(participant))
      .then(updateName)
      .then(binder.update())
      .then(() => self.newExternalIdObs(null))
      .then(utils.successHandler(vm, event, confirmMsg))
      .catch(failureHandler);
  };
  function noteInitialStatus(participant) {
    // The general page can be linked to using externalId: or healthCode:... here we
    // fix the ID to the be real ID, then use that to call getParticipantName
    self.userIdObs(participant.id);
    if (!self.isNewObs()) {
      serverService.getParticipantName(participant.id)
        .then(function(part) {
          self.titleObs(part.name);
        })
        .catch(failureHandler);
    }
    return participant;
  }

  function studyToOptions(study) {
    return {label: study.name, value: study.identifier};
  }

  function updateAllStudiesObs() {
    return serverService.getStudies(false).then(response => {
      self.allStudiesObs(response.items.map(studyToOptions));
    });
  }
  self.orgNames = {};

  serverService.getApp()
    .then(binder.assign("app"))
    .then(initApp)
    .then(optionsService.getOrganizationNames)
    .then((response) => self.orgNames = response)
    .then(getParticipant)
    .then(binder.assign("participant"))
    .then(noteInitialStatus)
    .then(binder.update())
    .then(updateAllStudiesObs)
    .catch(failureHandler);
};
