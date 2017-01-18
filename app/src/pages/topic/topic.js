var serverService = require('../../services/server_service');
var bind = require('../../binder');
var utils = require('../../utils');
var root = require('../../root');

module.exports = function(params) {
    var self = this;

    var binder = bind(self)
        .obs('isNew', params.guid === "new")
        .obs('title', 'New Topic')
        .bind('guid', '')
        .bind('name', '');

    function updateTopic(response) {
        self.isNewObs(false);
        self.titleObs(self.topic.name);
        self.guidObs(response.guid);
        return response;
    }

    self.isDeveloper = root.isDeveloper;
    self.isResearcher = root.isResearcher;
    
    self.sendNotification = function(vm, event) {
        root.openDialog('send_notification', {
            topicId: self.guidObs()
        });
    };

    self.save = function(vm, event) {
        utils.startHandler(vm, event);

        self.topic = binder.persist(self.topic);
        if (self.isNewObs()) {
            serverService.createTopic(self.topic)
                .then(updateTopic)
                .then(utils.successHandler(vm, event, "Topic has been saved."))
                .catch(utils.failureHandler(vm, event));
        } else {
            serverService.updateTopic(self.topic)
                .then(updateTopic)
                .then(utils.successHandler(vm, event, "Topic has been saved."))
                .catch(utils.failureHandler(vm, event));
        }
    };

    function updateTitle(response) {
        self.titleObs(response.name);
        return response;
    }

    if (params.guid !== "new") {
        serverService.getTopic(params.guid)
            .then(updateTitle)
            .then(binder.assign('topic'))
            .then(binder.update());
    } else {
        self.topic = {guid:'', name:''};
    }
};