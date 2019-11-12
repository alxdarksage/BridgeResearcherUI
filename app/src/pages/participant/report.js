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
  id: 'participant-report'
});

export default function report(params) {
  let self = this;

  tables.prepareTable(self, {
    name: "report",
    delete: deleteItem,
    refresh: load
  });

  new Binder(self)
    .obs("userId", params.userId)
    .obs("name", "")
    .obs("title", "&#160;")
    .obs("identifier", params.identifier)
    .obs("startDate")
    .obs("endDate")
    .obs("status");

  self.doCalSearch = () => {
    if (self.startDateObs() && self.endDateObs()) {
      utils.clearErrors();
      self.itemsObs([]);
      self.recordsMessageObs("<div class='ui tiny active inline loader'></div>");
      load();
    }
  };

  serverService.getParticipantName(params.userId).then(function(part) {
    self.titleObs(part.name);
    self.nameObs(part.name);
    self.statusObs(part.status);
  }).catch(failureHandler);

  self.isDeveloper = root.isDeveloper;
  self.linkMaker = function() {
    return "#/participants/" + self.userIdObs() + "/reports";
  };

  self.addReport = function(vm, event) {
    root.openDialog("report_editor", {
      add: false,
      closeDialog: self.closeDialog,
      identifier: params.identifier,
      userId: params.userId,
      type: "participant",
      substudyIds: self.substudyIds
    });
  };
  self.closeDialog = function() {
    root.closeDialog();
    load();
  };
  self.toggle = function(model) {
    model.collapsedObs(!model.collapsedObs());
  };
  self.editReportRecord = function(item) {
    root.openDialog("report_editor", {
      add: false,
      closeDialog: self.closeDialog,
      identifier: params.identifier,
      userId: params.userId,
      date: item.date,
      data: item.data,
      type: "participant",
      substudyIds: self.substudyIds
    });
    return false;
  };

  function deleteItem(item) {
    return serverService.deleteParticipantReportRecord(params.userId, params.identifier, item.date);
  }
  function loadReport() {
    let startDate = fn.formatDate(self.startDateObs(), 'iso');
    let endDate = fn.formatDate(self.endDateObs(), 'iso');
    return serverService.getParticipantReport(
      params.userId, params.identifier, startDate, endDate);
  }

  function load() {
    return serverService.getParticipantReportIndex(params.identifier)
      .then((index) => self.substudyIds = index.substudyIds)
      .then(() => serverService.getParticipant(params.userId))
      .then(loadReport)
      .then(fn.handleMap("items", jsonFormatter.mapItem))
      .then(fn.handleSort("items", "date", true))
      .then(fn.handleObsUpdate(self.itemsObs, "items"))
      .catch(fn.seq(utils.failureHandler({ id: 'participant-report' }), () => self.itemsObs([])));
  }
  load();
};
