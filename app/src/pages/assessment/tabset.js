import fn from "../../functions";
import ko from "knockout";

export default function asmTabset(params) {
  let self = this;

  fn.copyProps(self, params, "guidObs", "isNewObs", "revisionObs", 
    "originGuidObs", "canEditObs");

  self.computeds = [];
  self.linkMaker = function(tabName) {
    let c = ko.computed(function() {
      return "#/assessments/" + self.guidObs() + "/" + tabName;
    });
    self.computeds.push(c);
    return c;
  };
};
asmTabset.prototype.dispose = function() {
  this.computeds.forEach(function(c) {
    c.dispose();
  });
};
