import fn from "../../functions";
import ko from "knockout";

export default function tabset(params) {
  let self = this;

  fn.copyProps(self, params, "identifierObs->studyIdObs", "isNewObs");

  self.computeds = [];
  self.linkMaker = function(tabName) {
    let c = ko.computed(function() {
      return "#/studies/" + self.studyIdObs() + '/' + tabName;
    });
    self.computeds.push(c);
    return c;
  };
};
tabset.prototype.dispose = function() {
  this.computeds.forEach(function(c) {
    c.dispose();
  });
};
