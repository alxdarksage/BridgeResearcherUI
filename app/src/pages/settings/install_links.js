import Binder from "../../binder";
import serverService from "../../services/server_service";
import utils from "../../utils";

const IOS = "iPhone OS";
const ANDROID = "Android";
const UNIVERSAL = "Universal";

export default function() {
  let self = this;
  let ios = Binder.objPropDelegates("installLinks", IOS);
  let android = Binder.objPropDelegates("installLinks", ANDROID);
  let universal = Binder.objPropDelegates("installLinks", UNIVERSAL);

  let binder = new Binder(self)
    .bind("ios", "", ios.fromObject, ios.toObject)
    .bind("android", "", android.fromObject, android.toObject)
    .bind("universal", "", universal.fromObject, universal.toObject);

  self.save = function(vm, event) {
    self.app = binder.persist(self.app);

    utils.startHandler(self, event);
    serverService
      .saveApp(self.app)
      .then(utils.successHandler(vm, event, "Install links saved."))
      .catch(utils.failureHandler({ id: 'install-links' }));
  };
  serverService
    .getApp()
    .then(binder.assign("app"))
    .then(binder.update())
    .catch(utils.failureHandler({ id: 'install-links' }));
};
