import alerts from "../../../widgets/alerts";
import fn from "../../../functions";
import ko from "knockout";
import Promise from "bluebird";
import serverService from "../../../services/server_service";
import tables from "../../../tables";
import utils from "../../../utils";

const PAGE_SIZE = 100;
const DELAY = 200;
const MSG = "Are you sure you want to sign out everyone in this app?";

let adminEmail = null;

function mapKey(cacheKey) {
  return { key: cacheKey };
}
function deleteItem(item) {
  return serverService.deleteCacheKey(item.key);
}
serverService.addSessionStartListener((session) => adminEmail = session.email);
serverService.addSessionEndListener(() => adminEmail = null);

export default function() {
  let self = this;

  self.signOutStatusObs = ko.observable();

  tables.prepareTable(self, {
    name: "cache key",
    delete: deleteItem,
    id: "cache",
    refresh: load
  });

  function load() {
    serverService.getCacheKeys()
      .then(function(response) {
        let items = response.map(mapKey);
        self.itemsObs(items.sort(fn.makeFieldSorter("key")));
      }).catch(utils.failureHandler({id: 'cache'}));
  }
  load();

  self.signEveryoneOut = function() {
    alerts.deleteConfirmation(MSG, function() {
      // Call the first time to get the total number of records
      serverService.getParticipants(0, 5).then(processAllPages);
    }, "Yes, sign everyone out");
  };
  function processAllPages(response) {
    let pages = Math.ceil(response.total / PAGE_SIZE);
    let promise = Promise.resolve();
    for (let i = 0; i <= pages; i++) {
      promise = promise.delay(DELAY).then(processOnePage(promise, i));
    }
    promise.then(() => self.signOutStatusObs("That's it. Everyone has been signed out."));
  }
  function processOnePage(promise, i) {
    return () => serverService.getParticipants(PAGE_SIZE * i, PAGE_SIZE)
      .then(processAllRecords(promise));
  }
  function processAllRecords(promise) {
    return (response) => response.items.filter(filterParticipants).reduce(processOneRecord, promise);
  }
  function filterParticipants(participant) {
    return participant.status !== "unverified" && participant.email !== adminEmail;
  }
  function processOneRecord(p, participant) {
    p = p.delay(DELAY).then(function() {
      self.signOutStatusObs("Signing out user: " + participant.email);
      return serverService.signOutUser(participant.id);
    });
    return p;
  }
};
