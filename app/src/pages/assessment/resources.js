import Binder from "../../binder";
import fn from "../../functions";
import ko from "knockout";
import root from "../../root";
import serverService from "../../services/server_service";
import tables from "../../tables";
import utils from "../../utils";
import optionsService from "../../services/options_service";

export default function(params) {
  let self = this;
  self.query = {};

  fn.copyProps(self, root, "isAdmin");
  self.reload = () => self.load(self.query);

  let binder = new Binder(self)
    .obs("isNew", false)
    .obs("guid", params.guid)
    .obs("id")
    .obs("originGuid")
    .obs("pageTitle")
    .obs("pageRev")
    .obs("forRevision")
    .obs('categories[]')
    .obs('categoriesOptions[]', optionsService.getCategoryOptions())
    .obs('category')
    .bind('canEdit', false);

  tables.prepareTable(self, {
    name: "assessment documentation resource",
    refresh: self.reload,
    id: "assessment_resources",
    delete: (item) => serverService.deleteAssessmentResource(self.idObs(), item.guid, false),
    deletePermanently: (item) => serverService.deleteAssessmentResource(self.idObs(), item.guid, true),
    undelete: (item) => serverService.updateAssessmentResource(self.idObs(), item),
    publish: (item) => {
      return serverService.getSharedAssessment(self.originGuidObs())
        .then(shared => serverService.publishAssessmentResources(shared.identifier, [item.guid]));
    }
  });

  // some nonsense related to the pager that I copy now by rote
  self.postLoadPagerFunc = fn.identity;
  self.postLoadFunc = (func) => self.postLoadPagerFunc = func;

  self.formatCategory = function(value) {
    return optionsService.CATEGORY_LABELS[value];
  }
  self.formatRevisions = function(resource) {
    if (resource.minRevision && resource.maxRevision) {
      if (resource.minRevision === resource.maxRevision) {
        return resource.minRevision;
      }
      return resource.minRevision + '—' + resource.maxRevision;
    } else if (resource.minRevision) {
      return resource.minRevision + '—';
    } else if (resource.maxRevision) {
      return '—' + resource.maxRevision;
    }
    return '';
  }
  self.load = function(query) {
    query.category = self.categoryObs() ? [self.categoryObs()] : null;
    query.minRevision = self.forRevisionObs();
    query.maxRevision = self.forRevisionObs();
    self.query = query;

    return serverService.getAssessmentResources(self.idObs(), query, self.showDeletedObs())
      .then(fn.handleObsUpdate(self.itemsObs, "items"))
      .then(self.postLoadPagerFunc)
      .catch(utils.failureHandler({ id: 'assessment_resources' }));
  }

  serverService.getAssessment(params.guid)
    .then(binder.assign('assessment'))
    .then(fn.handleObsUpdate(self.pageRevObs, "revision"))
    .then(fn.handleObsUpdate(self.forRevisionObs, "revision"))
    .then(fn.handleObsUpdate(self.originGuidObs, "originGuid"))
    .then(fn.handleObsUpdate(self.pageTitleObs, "title"))
    .then(fn.handleObsUpdate(self.idObs, "identifier"))
    .then(serverService.getSession)
    .then((session) => self.canEditObs(
      root.isSuperadmin() || self.assessment.ownerId === session.orgMembership))
    .then(() => {
      ko.postbox.subscribe('asmr-refresh', self.load);
      self.forRevisionObs.subscribe(self.reload);
      self.categoryObs.subscribe(self.reload);
    })
    .then(self.reload)
    .catch(utils.failureHandler({ id: 'assessment_resources' }));

};
