import Binder from "../../binder";
import fn from "../../functions";
import root from "../../root";
import serverService from "../../services/server_service";
import utils from "../../utils";

var failureHandler = utils.failureHandler({
  redirectMsg: "Study not found.",
  redirectTo: "studies",
  transient: false,
  id: 'study'
});

export default function(params) {
  let self = this;
  self.study = {};

  fn.copyProps(self, fn, "formatDateTime");
  fn.copyProps(self, root, 'isDevRole');

  let binder = new Binder(self)
    .obs("title", "New Study")
    .obs("isNew", params.studyId === "new")
    .obs("createdOn")
    .obs("modifiedOn")
    .bind("version")
    .bind("name")
    .bind("identifier", params.studyId === "new" ? null : params.studyId);

  function load() {
    return params.studyId === "new" ? 
      Promise.resolve({}) : 
      serverService.getStudy(params.studyId).then(fn.handleObsUpdate(self.titleObs, "name"));
  }
  function saveStudy() {
    return params.studyId === "new" ? 
      serverService.createStudy(self.study) : 
      serverService.updateStudy(self.study);
  }
  function updateModifiedOn(response) {
    params.studyId = self.identifierObs();
    self.modifiedOnObs(response.modifiedOn);
    return response;
  }

  self.save = function(vm, event) {
    self.study = binder.persist(self.study);

    utils.startHandler(vm, event);
    saveStudy()
      .then(response => {
        if (params.studyId === "new") {
          document.location = "#/studies/" + self.identifierObs() + "/general";
        }
        return response;
      })
      .then(fn.handleStaticObsUpdate(self.isNewObs, false))
      .then(fn.handleObsUpdate(self.versionObs, "version"))
      .then(fn.handleStaticObsUpdate(self.modifiedOnObs, new Date()))
      .then(updateModifiedOn)
      .then(fn.returning(self.study))
      .then(fn.handleObsUpdate(self.titleObs, "name"))
      .then(utils.successHandler(vm, event, "Study has been saved."))
      .catch(failureHandler);
  };

  load().then(binder.assign("study"))
    .then(binder.update())
    .catch(failureHandler);
};
