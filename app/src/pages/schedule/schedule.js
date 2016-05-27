var ko = require('knockout');
var utils = require('../../utils');
var optionsService = require('../../services/options_service');
var scheduleUtils = require('./schedule_utils');
var root = require('../../root');

function nameInspector(string) {
    var isArray = /\[\]$/.test(string);
    var name = (isArray) ? string.match(/[^\[]*/)[0] : string;
    return {name: name, observerName: name+"Obs", isArray: isArray};
}
function observablesFor(vm, fields, source) {
    for (var i=0; i < fields.length; i++) {
        var insp = nameInspector(fields[i]);
        var value = (source) ? source[insp.name] : "";
        if (insp.isArray) {
            vm[insp.observerName] = ko.observableArray(value);
        } else {
            vm[insp.observerName] = ko.observable(value);
        }
    }
}
function valuesToObservables(vm, object, fields) {
    for (var i=0; i < fields.length; i++) {
        var insp = nameInspector(fields[i]);

        var obs = vm[insp.observerName];
        var value = object[insp.name];
        if (utils.isDefined(obs) && utils.isDefined(value)) {
            obs(value);
        }
    }
}
function observablesToObject(vm, object, fields) {
    for (var i=0; i < fields.length; i++) {
        var insp = nameInspector(fields[i]);

        object[insp.name] = null;
        var obs = vm[insp.observerName];
        if (utils.isDefined(obs)) {
            object[insp.name] = obs();
        }
    }
}
/**
 * enrollment - used to calculate if enrollment should be included in the eventId.
 * When there's no eventId, enrollment is assumed; generally if there is any event,
 * enrollment would be included last in a comma-separated list of events.
 */
var SCHEDULE_FIELDS = ['delay','interval','scheduleType','expires','startsOn','endsOn','eventId',
    'cronTrigger', 'times[]', 'activities[]', 'enrollment'];

var ACTIVITY_FIELDS = ['label','labelDetail','activityType','taskId','guid','surveyGuid'];

var SCHEDULE_TYPE_OPTIONS = Object.freeze([
    {value: 'once', label: 'Once'},
    {value: 'recurring', label: 'Recurring'}
]);
var ACTIVITY_TYPE_OPTIONS = Object.freeze([
    {value: 'task', label: 'Do Task'},
    {value: 'survey', label: 'Take Survey'}
]);
function newActivity() {
    var activity = scheduleUtils.newSchedule().activities[0];
    activity.activityType = "task";
    addObserversToActivity(activity);
    return activity;
}
/**
 * Copy observers values in each schedule activity to that object. Slightly
 * more complicated than what ko.mapping provides.
 * @param activity
 */
function copyObserverValuesBackToActivity(activity) {
    activity.label = activity.labelObs();
    activity.labelDetail = activity.labelDetailObs();
    activity.activityType = activity.activityTypeObs();
    delete activity.survey;
    delete activity.task;
    if (activity.activityType === 'task') {
        activity.task = {
            identifier: activity.taskIdObs()
        };
    } else if (activity.activityType === 'survey') {
        activity.survey = {
            guid: activity.surveyGuidObs()
        };
    }
}
/**
 * Copy all the activity's fields to observers.
 * @param activity
 */
function addObserversToActivity(activity) {
    activity.labelObs = ko.observable(activity.label);
    activity.labelDetailObs = ko.observable(activity.labelDetail);
    activity.activityTypeObs = ko.observable(activity.activityType);
    activity.taskIdObs = ko.observable();
    if (activity.activityType === 'task') {
        activity.taskIdObs(activity.task.identifier);
    }
    activity.surveyGuidObs = ko.observable();
    if (activity.activityType === 'survey') {
        activity.surveyGuidObs(activity.survey.guid);
    }
}
/**
 * Times come back in "08:00:00.000" format, we only want HH:MM.
 * Not sure anything can be done about this, on the server?
 * @param schedule
 */
function fixScheduleTimes(schedule) {
    // TODO: These are also fixed in the formatter, but probably need to be fixed here as well.
    schedule.times = schedule.times.map(function(time) {
        return time.replace(":00.000","");
    });
    if (schedule.startsOn) {
        schedule.startsOn = schedule.startsOn.replace(":00.000Z","");
    }
    if (schedule.endsOn) {
        schedule.endsOn = schedule.endsOn.replace(":00.000Z","");
    }
    schedule.times.sort();
}

/**
 * Editor for a schedule (regardless of the strategy it is embedded in).
 * @param params
 *      - scheduleObs: schedule observer with a callback function attached to it.
 */
module.exports = function(params) {
    var self = this;

    self.scheduleObs = params.scheduleObs;
    self.collectionName = params.collectionName;
    observablesFor(self, SCHEDULE_FIELDS);
    // this is not initialized by observablesFor, because it is often null when
    // the value is just enrollment by default.
    self.eventIdObs = ko.observable("enrollment");

    self.scheduleTypeOptions = SCHEDULE_TYPE_OPTIONS;
    self.scheduleTypeLabel = utils.makeOptionLabelFinder(SCHEDULE_TYPE_OPTIONS);

    self.activityTypeOptions = ACTIVITY_TYPE_OPTIONS;
    self.activityTypeLabel = utils.makeOptionLabelFinder(ACTIVITY_TYPE_OPTIONS);

    self.surveysOptionsObs = ko.observableArray();
    self.surveysOptionsObs.extend({rateLimit: 50});
    self.surveysOptionsLabel = utils.makeOptionLabelFinder(self.surveysOptionsObs);

    self.taskOptionsObs = ko.observableArray();
    self.taskOptionsObs.extend({rateLimit: 50});
    self.taskOptionsLabel = utils.makeOptionLabelFinder(self.taskOptionsObs);

    // This combines the scheduleType with the difference between interval and cron-based recurring schedules
    self.editorScheduleTypeObs = ko.observable();
    self.editorScheduleTypeObs.subscribe(function(newValue) {
        self.scheduleTypeObs( (newValue === "once") ? 'once' : 'recurring' );    
    });
    
    function updateEditorScheduleType(schedule) {
        if (schedule.scheduleType === 'once') {
            self.editorScheduleTypeObs("once");
        } else if (schedule.scheduleType === 'recurring' && schedule.cronTrigger) {
            self.editorScheduleTypeObs("cron");
        } else {
            self.editorScheduleTypeObs("interval");
        }
    }

    // This is the implementation called by the schedule plan viewModel to construct the model
    self.scheduleObs.callback = function() {
        self.activitiesObs().forEach(copyObserverValuesBackToActivity);
        observablesToObject(self, self.scheduleObs(), SCHEDULE_FIELDS);

        // To avoid an error, we have to remove some fields which are hidden and assumed to be 
        // unused
        if (self.scheduleObs().scheduleType === "once") {
            delete self.scheduleObs().interval;
            delete self.scheduleObs().cronTrigger;
        } else if (self.editorScheduleTypeObs() === "interval") {
            delete self.scheduleObs().cronTrigger;
        } else if (self.editorScheduleTypeObs() === "cron") {
            delete self.scheduleObs().interval;
            self.scheduleObs().times = [];
        }
        return self.scheduleObs();
    };

    // This is fired when the parent viewModel gets a plan back from the server
    var subscription = self.scheduleObs.subscribe(function(schedule) {
        fixScheduleTimes(schedule);
        updateEditorScheduleType(schedule);
        schedule.activities.forEach(addObserversToActivity);
        schedule.activities.forEach(function(activity) {
            if (activity.survey && !self.surveysOptionsObs.loaded) {
                self.surveysOptionsObs.push({label: 'Loading...', value: activity.survey.guid});
            }
            if (activity.task && !self.taskOptionsObs.loaded) {
                self.taskOptionsObs.push({label: activity.task.identifier, value: activity.task.identifier});
            }
        });
        if (schedule.scheduleType === "once") {
            delete schedule.interval;
            delete schedule.cronTrigger;
        }
        valuesToObservables(self, schedule, SCHEDULE_FIELDS);
        subscription.dispose();
    });

    // Above, when an activity with a survey is loaded, if there's no option for it,
    // it is not selected and then ends up being the first option when it comes in.
    // Put a dummy loading option in to fix that. But then, if this very first, the
    // loading option is not removed. So the .loaded property is used to guard against
    // thats. In all, ugly.
    optionsService.getSurveyOptions().then(function(surveys) {
        self.surveysOptionsObs.removeAll();
        self.surveysOptionsObs.push({value:"",label:"Select survey:"})
        self.surveysOptionsObs.pushAll(surveys);
        self.surveysOptionsObs.loaded = true;
    });
    optionsService.getTaskIdentifierOptions().then(function(options) {
        // In this case as a transition, if we have an identifier that hasn't been enumerated,
        // don't update the options because we're displaying it as a dummy option. It'll still
        // fail when the user saves it.
        self.taskOptionsObs.removeAll();
        self.taskOptionsObs.push({value:"",label:"Select task:"})
        if (options.length > 0) {
            self.taskOptionsObs.pushAll(options);
        }
        self.taskOptionsObs.loaded = true;
    });

    self.formatDateTime = utils.formatDateTime;
    self.formatTimes = function() {
        var type = self.scheduleTypeObs();
        var times = self.timesObs();
        if (times && times.length) {
            return scheduleUtils.formatTimesArray(
                (type === 'recurring') ? times : times.slice(0,1));
        }
        return scheduleUtils.formatTimesArray(null);
    };
    self.formatEventId = scheduleUtils.formatEventId;

    self.editTimes = function(vm, event) {
        event.preventDefault();
        root.openDialog('times_editor', {
            timesObs: self.timesObs,
            scheduleTypeObs: self.scheduleTypeObs,
            clearTimesFunc: self.clearTimes
        });
    };
    self.clearTimes = function(vm, event) {
        event.preventDefault();
        self.timesObs([]);
    };
    self.editEventId = function(vm, event) {
        event.preventDefault();
        root.openDialog('event_id_editor', {
            'eventIdObs': self.eventIdObs,'clearEventIdFunc': self.clearEventId
        });
    };
    self.clearEventId = function(vm, event) {
        event.preventDefault();
        self.eventIdObs(null);
    };
    self.formatWindow = function() {
        if (self.startsOnObs() || self.endsOnObs()) {
            var string = "";
            if (self.startsOnObs()) {
                string += new Date(self.startsOnObs()).toUTCString();
            }
            string += "&mdash;";
            if (self.endsOnObs()) {
                string += new Date(self.endsOnObs()).toUTCString();
            }
            return string;
        }
        return "&lt;None&gt;";
    };
    self.editWindow = function(vm, event) {
        event.preventDefault();
        root.openDialog('date_window_editor', {
            'startsOnObs': self.startsOnObs,
            'endsOnObs': self.endsOnObs,
            'clearWindowFunc': self.clearWindow
        });
    };
    self.clearWindow = function() {
        self.startsOnObs(null);
        self.endsOnObs(null);
    };
    self.addFirstActivity = function(vm, event) {
        self.activitiesObs.push(newActivity());
    };
    self.addActivityAfter = function(vm, event) {
        event.preventDefault();
        var context = ko.contextFor(event.target);
        self.activitiesObs.splice(context.$index()+1,0,newActivity());
    };
    self.deleteActivity = function(vm, event) {
        event.preventDefault();
        var context = ko.contextFor(event.target);
        self.activitiesObs.remove(context.$data);
    };
};