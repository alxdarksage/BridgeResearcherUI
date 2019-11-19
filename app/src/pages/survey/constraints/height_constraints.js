import fn from "../../../functions";
import surveyUtils from "../survey_utils";

export default function(params) {
  let self = this;
  surveyUtils.initConstraintsVM(self, params);
  self.forInfantObs = self.element.constraints.forInfantObs;
  fn.copyProps(self, self.element.constraints, "forInfantObs", "requiredObs");
};
