var ko = require('knockout');

function reg(name, path) {
    ko.components.register(name, {
        viewModel: require(path),
        template: require(path+".html"),
        synchronous: /dialogs/.test(path)
    });
}
function regt(name, path) {
    ko.components.register(name, {template: require(path+".html")});
}

// PAGES
reg('info','./pages/info/info');
reg('consent','./pages/consent/consent');
reg('eligibility','./pages/eligibility/eligibility');
reg('password_policy','./pages/password_policy/password_policy');
reg('user_attributes','./pages/user_attributes/user_attributes');
reg('ve_template','./pages/ve_template/ve_template');
reg('rp_template','./pages/rp_template/rp_template');
reg('actions','./pages/actions/actions');
reg('surveys','./pages/surveys/surveys');
reg('survey', './pages/survey/survey');
reg('survey_versions','./pages/survey/survey_versions');
reg('schemas', './pages/schemas/schemas');
reg('schema', './pages/schema/schema');
reg('schema_versions', './pages/schema/schema_versions');
reg('monitor', './pages/monitor/monitor');
reg('scheduleplans', './pages/scheduleplans/scheduleplans');
reg('scheduleplan', './pages/scheduleplan/scheduleplan');
reg('schedule', './pages/scheduleplan/schedule');
regt('not_found', './pages/not_found/not_found');

// WIDGETS
reg('form-message', './widgets/form_message/form_message');

// DIALOGS
regt('none_dialog','./dialogs/none/none_dialog');
reg('sign_in_dialog', './dialogs/sign_in/sign_in');
reg('forgot_password_dialog', './dialogs/forgot_password/forgot_password');
reg('enumeration_editor', './dialogs/enumeration_editor/enumeration_editor');
reg('event_id_editor', './dialogs/event_id_editor/event_id_editor');
reg('times_editor', './dialogs/times_editor/times_editor');
reg('rules_editor', './dialogs/rules_editor/rules_editor');


/* SURVEYS */
reg('SurveyInfoScreen', './pages/survey/survey_info');
reg('SurveyQuestion', './pages/survey/survey_question');
reg('BooleanConstraints', './pages/survey/constraints/boolean_constraints');
reg('DateConstraints', './pages/survey/constraints/date_constraints');
reg('DateTimeConstraints', './pages/survey/constraints/datetime_constraints');
reg('DurationConstraints', './pages/survey/constraints/duration_constraints');
reg('TimeConstraints', './pages/survey/constraints/time_constraints');
reg('IntegerConstraints', './pages/survey/constraints/integer_constraints');
reg('DecimalConstraints', './pages/survey/constraints/decimal_constraints');
reg('StringConstraints', './pages/survey/constraints/string_constraints');
reg('MultiValueConstraints', './pages/survey/constraints/multi_constraints');
reg('insertion-control', './pages/survey/insertion_control');
regt('constraints-label', './pages/survey/constraints/constraints_label');
regt('ui-rules', './pages/survey/constraints/ui_rules');

regt('ui-checkbox', './widgets/form/ui_checkbox');
regt('ui-text', './widgets/form/ui_text');
regt('ui-date', './widgets/form/ui_date');
regt('ui-datetime', './widgets/form/ui_datetime');
regt('ui-select', './widgets/form/ui_select');
regt('ui-textarea', './widgets/form/ui_textarea');
reg('ui-duration', './widgets/form/ui_duration');

/* SCHEMAS */
reg('field_definition', './pages/schema/field_definition');