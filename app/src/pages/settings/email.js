import Binder from "../../binder";
import serverService from "../../services/server_service";
import utils from "../../utils";

export default function() {
  let self = this;

  let binder = new Binder(self)
    .obs("status", "")
    .obs("message")
    .obs("name")
    .obs("sponsorName")
    .obs("identifier")
    .bind("supportEmail")
    .bind("technicalEmail", null, null, Binder.emptyToNull)
    .bind("consentNotificationEmail", null, null, Binder.emptyToNull)
    .obs("consentNotificationEmailVerified", true);

  function checkEmailStatus() {
    return serverService.emailStatus().then(binder.update("status"));
  }

  self.save = function(vm, event) {
    self.app = binder.persist(self.app);

    utils.startHandler(vm, event);
    serverService
      .saveApp(self.app)
      .then(checkEmailStatus)
      .then(utils.successHandler(vm, event, "App information saved."))
      .catch(utils.failureHandler({ id: 'email' }));
  };
  self.verifyEmail = function(vm, event) {
    utils.startHandler(vm, event);
    serverService
      .verifyEmail()
      .then(binder.update("status"))
      .then(utils.successHandler(vm, event, "Request to verify email has been sent."))
      .catch(utils.failureHandler({ id: 'email' }));
  };
  self.verifyConsentEmail = function(vm, event) {
    utils.startHandler(vm, event);
    serverService
      .verifyAppEmail("consent_notification")
      .then(utils.successHandler(vm, event, "Request to verify email has been sent."))
      .catch(utils.failureHandler({ id: 'email' }));
  };
  self.refreshStatus = checkEmailStatus;

  serverService.getApp()
    .then(binder.assign("app"))
    .then(binder.update())
    .then(checkEmailStatus)
    .catch(utils.failureHandler({ id: 'email' }));
};
