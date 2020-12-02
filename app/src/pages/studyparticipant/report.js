import Binder from "../../binder";
import fn from "../../functions";
import jsonFormatter from "../../json_formatter";
import root from "../../root";
import serverService from "../../services/server_service";
import tables from "../../tables";
import utils from "../../utils";

const failureHandler = utils.failureHandler({
  redirectTo: "participants",
  redirectMsg: "Participant not found",
  id: 'studyparticipant-report'
});

export default function report(params) {
  let self = this;
  fn.copyProps(self, root, "isResearcher");

  tables.prepareTable(self, {
    name: "report",
    delete: (item) => serverService.deleteReportRecord(params.userId, params.identifier, item.date),
    id: 'studyparticipant-report',
    refresh: load
  });

  new Binder(self)
    .obs("userId", params.userId)
    .obs("name", "")
    .obs("title", "&#160;")
    .obs("identifier", params.identifier)
    .obs("startDate")
    .obs("endDate")
    .obs("status")
    .bind("navStudyId", params.studyId)
    .bind("navStudyName");

  self.doCalSearch = () => {
    if (self.startDateObs() && self.endDateObs()) {
      utils.clearErrors();
      self.itemsObs([]);
      self.recordsMessageObs("<div class='ui tiny active inline loader'></div>");
      load();
    }
  };

  serverService.getStudyParticipantName(params.studyId, params.userId).then(function(part) {
    self.titleObs(part.name);
    self.nameObs(part.name);
    self.statusObs(part.status);
  }).catch(failureHandler);

  self.isDeveloper = root.isDeveloper;
  self.linkMaker = () => "#/studies/" + params.studyId + "/participants/" + self.userIdObs() + "/reports";

  self.addReport = function(vm, event) {
    root.openDialog("report_editor", {
      add: false,
      closeDialog: self.closeDialog,
      identifier: params.identifier,
      userId: params.userId,
      type: "participant",
      studyIds: self.studyIds
    });
  };
  self.closeDialog = function() {
    root.closeDialog();
    load();
  };
  self.toggle = (model) => model.collapsedObs(!model.collapsedObs());
  self.editReportRecord = function(item) {
    root.openDialog("report_editor", {
      add: false,
      closeDialog: self.closeDialog,
      identifier: params.identifier,
      userId: params.userId,
      date: item.date,
      data: item.data,
      type: "participant",
      studyIds: self.studyIds
    });
    return false;
  };

  function loadReport() {
    let startDate = fn.formatDate(self.startDateObs(), 'iso');
    let endDate = fn.formatDate(self.endDateObs(), 'iso');
    return serverService.getParticipantReport(
      params.userId, params.identifier, startDate, endDate);
  }
  serverService.getStudy(params.studyId).then((response) => {
    self.navStudyNameObs(response.name);
  });

  function load() {
    return serverService.getParticipantReportIndex(params.studyId, params.identifier)
      .then((index) => self.studyIds = index.studyIds)
      .then(() => serverService.getStudyParticipant(params.studyId, params.userId))
      .then(loadReport)
      .then(fn.handleMap("items", jsonFormatter.mapItem))
      .then(fn.handleSort("items", "date", true))
      .then(fn.handleObsUpdate(self.itemsObs, "items"))
      .catch(fn.seq(utils.failureHandler({ id: 'studyparticipant-report' }), () => self.itemsObs([])));
  }
  load();
};
