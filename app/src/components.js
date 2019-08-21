import ko from "knockout";
import errors from "./widgets/errors/errors";
import errorsHtml from "./widgets/errors/errors.html";
import sharedModules from "./pages/shared_modules/shared_modules";
import sharedModulesHtml from "./pages/shared_modules/shared_modules.html";
import dailyUploads from "./pages/studyreports/dailyUploads";
import dailyUploadsHtml from "./pages/studyreports/dailyUploads.html";
import sharedModule from "./pages/shared_module/shared_module";
import sharedModuleHtml from "./pages/shared_module/shared_module.html";
import sharedModuleVersions from "./pages/shared_module/shared_module_versions";
import sharedModuleVersionsHtml from "./pages/shared_module/shared_module_versions.html";
import shTabset from "./pages/shared_module/tabset";
import shTabsetHtml from "./pages/shared_module/tabset.html";
import studyReportsTabsetHtml from "./pages/studyreports/tabset.html";
import general from "./pages/settings/general";
import generalHtml from "./pages/settings/general.html";
import email from "./pages/settings/email";
import emailHtml from "./pages/settings/email.html";
import applinks from "./pages/settings/applinks";
import applinksHtml from "./pages/settings/applinks.html";
import passwordPolicy from "./pages/settings/password_policy";
import passwordPolicyHtml from "./pages/settings/password_policy.html";
import oauthProviders from "./pages/settings/oauth_providers";
import oauthProvidersHtml from "./pages/settings/oauth_providers.html";
import installLinks from "./pages/settings/install_links";
import installLinksHtml from "./pages/settings/install_links.html";
import externalIds from "./pages/external_ids/external_ids";
import externalIdsHtml from "./pages/external_ids/external_ids.html";
import signUps from "./pages/studyreports/signUps";
import signUpsHtml from "./pages/studyreports/signUps.html";
import reports from "./pages/studyreports/reports";
import reportsHtml from "./pages/studyreports/reports.html";
import report from "./pages/studyreports/report";
import reportHtml from "./pages/studyreports/report.html";
import subpops from "./pages/subpopulations/subpopulations";
import subpopsHtml from "./pages/subpopulations/subpopulations.html";
import subpop from "./pages/subpopulation/general";
import subpopHtml from "./pages/subpopulation/general.html";
import subpopEditor from "./pages/subpopulation/editor";
import subpopEditorHtml from "./pages/subpopulation/editor.html";
import subpopHistory from "./pages/subpopulation/history";
import subpopHistoryHtml from "./pages/subpopulation/history.html";
import subpopDl from "./pages/subpopulation/download";
import subpopDlHtml from "./pages/subpopulation/download.html";
import surveys from "./pages/surveys/surveys";
import surveysHtml from "./pages/surveys/surveys.html";
import survey from "./pages/survey/survey";
import surveyHtml from "./pages/survey/survey.html";
import surveyVers from "./pages/survey/survey_versions";
import surveyVersHtml from "./pages/survey/survey_versions.html";
import surveySchema from "./pages/survey/survey_schema";
import surveySchemaHtml from "./pages/survey/survey_schema.html";
import schemas from "./pages/schemas/schemas";
import schemasHtml from "./pages/schemas/schemas.html";
import schema from "./pages/schema/schema";
import schemaHtml from "./pages/schema/schema.html";
import schemaVers from "./pages/schema/schema_versions";
import schemaVersHtml from "./pages/schema/schema_versions.html";
import exportSettings from "./pages/export_settings/export_settings";
import exportSettingsHtml from "./pages/export_settings/export_settings.html";
import uploadMetadata from "./pages/shared_upload_metadata/shared_upload_metadata";
import uploadMetadataHtml from "./pages/shared_upload_metadata/shared_upload_metadata.html";
import scheduleplans from "./pages/scheduleplans/scheduleplans";
import scheduleplansHtml from "./pages/scheduleplans/scheduleplans.html";
import scheduleplan from "./pages/scheduleplan/scheduleplan";
import scheduleplanHtml from "./pages/scheduleplan/scheduleplan.html";
import participants from "./pages/participants/participants";
import participantsHtml from "./pages/participants/participants.html";
import partGeneral from "./pages/participant/general";
import partGeneralHtml from "./pages/participant/general.html";
import partActivities from "./pages/participant/activities";
import partActivitiesHtml from "./pages/participant/activities.html";
import partEvents from "./pages/participant/activity_events";
import partEventsHtml from "./pages/participant/activity_events.html";
import partActivity from "./pages/participant/activity";
import partActivityHtml from "./pages/participant/activity.html";
import partClientData from "./pages/participant/client_data";
import partClientDataHtml from "./pages/participant/client_data.html";
import partConsents from "./pages/participant/consents";
import partConsentsHtml from "./pages/participant/consents.html";
import partReports from "./pages/participant/reports";
import partReportsHtml from "./pages/participant/reports.html";
import partNots from "./pages/participant/notifications";
import partNotsHtml from "./pages/participant/notifications.html";
import partReport from "./pages/participant/report";
import partReportHtml from "./pages/participant/report.html";
import partUploads from "./pages/participant/uploads";
import partUploadsHtml from "./pages/participant/uploads.html";
import partUpload from "./pages/participant/upload";
import partUploadHtml from "./pages/participant/upload.html";
import uploadDetails from "./widgets/upload_details/upload_details";
import uploadDetailsHtml from "./widgets/upload_details/upload_details.html";
import partRequestInfo from "./pages/participant/request_info";
import partRequestInfoHtml from "./pages/participant/request_info.html";
import setEditor from "./pages/set_editors/set_editor";
import eventKeysHtml from "./pages/events/event_keys.html";
import customEvents from "./pages/events/auto_custom_events";
import customEventsHtml from "./pages/events/auto_custom_events.html";
import tasks from "./pages/tasks/tasks";
import tasksHtml from "./pages/tasks/tasks.html";
import task from "./pages/task/task";
import taskHtml from "./pages/task/task.html"
import topics from "./pages/topics/topics";
import topicsHtml from "./pages/topics/topics.html";
import topic from "./pages/topic/topic";
import topicHtml from "./pages/topic/topic.html";
import schedule from "./pages/schedule/schedule";
import scheduleHtml from "./pages/schedule/schedule.html";
import uploads from "./pages/uploads/uploads";
import uploadsHtml from "./pages/uploads/uploads.html";
import upload from "./pages/upload/upload";
import uploadHtml from "./pages/upload/upload.html";
import ss from "./pages/schedule/strategies/simple_strategy";
import ssHtml from "./pages/schedule/strategies/simple_strategy.html";
import abs from "./pages/schedule/strategies/ab_strategy";
import absHtml from "./pages/schedule/strategies/ab_strategy.html";
import cs from "./pages/schedule/strategies/criteria_strategy";
import csHtml from "./pages/schedule/strategies/criteria_strategy.html";
import absPanel from "./pages/schedule/panels/ab_strategy_panel";
import absPanelHtml from "./pages/schedule/panels/ab_strategy_panel.html";
import csPanel from "./pages/schedule/panels/criteria_strategy_panel";
import csPanelHtml from "./pages/schedule/panels/criteria_strategy_panel.html";
import ssPanel from "./pages/schedule/panels/simple_strategy_panel";
import ssPanelHtml from "./pages/schedule/panels/simple_strategy_panel.html";
import surveyPanel from "./pages/survey/panels/survey";
import surveyPanelHtml from "./pages/survey/panels/survey.html";
import adminInfo from "./pages/admin/info/info";
import adminInfoHtml from "./pages/admin/info/info.html";
import adminCache from "./pages/admin/cache/cache";
import adminCacheHtml from "./pages/admin/cache/cache.html";
import adminStudies from "./pages/admin/studies/studies";
import adminStudiesHtml from "./pages/admin/studies/studies.html";
import adminStudy from "./pages/admin/study/study";
import adminStudyHtml from "./pages/admin/study/study.html";
import adminSubstudies from "./pages/admin/substudies/substudies";
import adminSubstudiesHtml from "./pages/admin/substudies/substudies.html";
import substudy from "./pages/admin/substudy/substudy";
import substudyHtml from "./pages/admin/substudy/substudy.html";
import boolConst from "./pages/survey/constraints/boolean_constraints";
import boolConstHtml from "./pages/survey/constraints/boolean_constraints.html";
import dateConst from "./pages/survey/constraints/date_constraints";
import dateConstHtml from "./pages/survey/constraints/date_constraints.html";
import dateTimeConst from "./pages/survey/constraints/datetime_constraints";
import dateTimeConstHtml from "./pages/survey/constraints/datetime_constraints.html";
import yearMonthConst from "./pages/survey/constraints/yearmonth_constraints";
import yearMonthConstHtml from "./pages/survey/constraints/yearmonth_constraints.html";
import postalConst from "./pages/survey/constraints/postalcode_constraints";
import postalConstHtml from "./pages/survey/constraints/postalcode_constraints.html";
import durationConst from "./pages/survey/constraints/duration_constraints";
import durationConstHtml from "./pages/survey/constraints/duration_constraints.html";
import timeConst from "./pages/survey/constraints/time_constraints";
import timeConstHtml from "./pages/survey/constraints/time_constraints.html";
import intConst from "./pages/survey/constraints/integer_constraints";
import intConstHtml from "./pages/survey/constraints/integer_constraints.html";
import decConst from "./pages/survey/constraints/decimal_constraints";
import decConstHtml from "./pages/survey/constraints/decimal_constraints.html";
import strConst from "./pages/survey/constraints/string_constraints";
import strConstHtml from "./pages/survey/constraints/string_constraints.html"
import mvConst from "./pages/survey/constraints/multi_constraints";
import mvConstHtml from "./pages/survey/constraints/multi_constraints.html";
import weightConst from "./pages/survey/constraints/weight_constraints";
import weightConstHtml from "./pages/survey/constraints/weight_constraints.html";
import heightConst from "./pages/survey/constraints/height_constraints";
import heightConstHtml from "./pages/survey/constraints/height_constraints.html";
import bpConst from "./pages/survey/constraints/bloodpressure_constraints.js";
import bpConstHtml from "./pages/survey/constraints/bloodpressure_constraints.html";
import tagEditor from "./widgets/tag-editor/tag_editor";
import tagEditorHtml from "./widgets/tag-editor/tag_editor.html";
import uiDur from "./widgets/form/ui_duration";
import uiDurHtml from "./widgets/form/ui_duration.html";
import eventsTabsetHtml from "./pages/events/tabset.html";
import surveyTabset from "./pages/survey/tabset";
import surveyTabsetHtml from "./pages/survey/tabset.html";
import subpopTabset from "./pages/subpopulation/tabset";
import subpopTabsetHtml from "./pages/subpopulation/tabset.html";
import critEditor from "./dialogs/criteria_editor/criteria_editor";
import critEditorHtml from "./dialogs/criteria_editor/criteria_editor.html";
import appVersionCrit from "./widgets/criteria/app_version_criteria";
import appVersionCritHtml from "./widgets/criteria/app_version_criteria.html";
import templateCrit from "./widgets/criteria/template_criteria";
import templateCritHtml from "./widgets/criteria/template_criteria.html";
import partPager from "./pages/participants/pager";
import partPagerHtml from "./pages/participants/pager.html";
import fieldDef from "./pages/schema/field_definition";
import fieldDefHtml from "./pages/schema/field_definition.html";
import infoScreen from "./pages/survey/survey_info";
import infoScreenHtml from "./pages/survey/survey_info.html";
import questionHtml from "./pages/survey/survey_question.html";
import constLabelHtml from "./pages/survey/constraints/constraints_label.html";
import rules from "./pages/survey/constraints/ui_rules";
import rulesHtml from "./pages/survey/constraints/ui_rules.html";
import checkHtml from "./widgets/form/ui_checkbox.html";
import radioHtml from "./widgets/form/ui_radio.html";
import dateHtml from "./widgets/form/ui_date.html";
import datetimeHtml from "./widgets/form/ui_datetime.html";
import selectHtml from "./widgets/form/ui_select.html";
import textareaHtml from "./widgets/form/ui_textarea.html";
import settingsTabset from "./pages/settings/tabset.html";
import partTabset from "./pages/participant/tabset";
import partTabsetHtml from "./pages/participant/tabset.html";
import schemaTabset from "./pages/schema/tabset";
import schemaTabsetHtml from "./pages/schema/tabset.html";
import verifiedIcon from "./pages/participant/verified-icon";
import verifiedIconHtml from "./pages/participant/verified-icon.html";
import nfHtml from "./pages/not_found/not_found.html";
import sm from "./widgets/shared_module/shared_module";
import smHtml from "./widgets/shared_module/shared_module.html";
import fp from "./widgets/forward_pager/forward_pager";
import fpHtml from "./widgets/forward_pager/forward_pager.html";
import signOutUser from "./dialogs/sign_out_user/sign_out_user";
import signOutUserHtml from "./dialogs/sign_out_user/sign_out_user.html";
import moduleBrowser from "./dialogs/module_browser/module_browser";
import moduleBrowserHtml from "./dialogs/module_browser/module_browser.html";
import publicKey from "./dialogs/publickey/publickey";
import publicKeyHtml from "./dialogs/publickey/publickey.html";
import jsonEditor from "./dialogs/json_editor/json_editor";
import jsonEditorHtml from "./dialogs/json_editor/json_editor.html";
import readClipboard from "./dialogs/read_about_clipboard/read_about_clipboard";
import readClipboardHtml from "./dialogs/read_about_clipboard/read_about_clipboard.html";
import reportEditor from "./dialogs/report_editor/report_editor";
import reportEditorHtml from "./dialogs/report_editor/report_editor.html";
import signIn from "./dialogs/sign_in/sign_in";
import signInHtml from "./dialogs/sign_in/sign_in.html";
import enumEditor from "./dialogs/enumeration_editor/enumeration_editor";
import enumEditorHtml from "./dialogs/enumeration_editor/enumeration_editor.html";
import mcEditor from "./dialogs/multichoice_editor/multichoice_editor";
import mcEditorHtml from "./dialogs/multichoice_editor/multichoice_editor.html";
import eventIdEditor from "./dialogs/event_id_editor/event_id_editor";
import eventIdEditorHtml from "./dialogs/event_id_editor/event_id_editor.html";
import timesEditor from "./dialogs/times_editor/times_editor";
import timesEditorHtml from "./dialogs/times_editor/times_editor.html";
import rulesEditor from "./dialogs/rules_editor/rules_editor";
import rulesEditorHtml from "./dialogs/rules_editor/rules_editor.html";
import dateWindowEditor from "./dialogs/date_window_editor/date_window_editor";
import dateWindowEditorHtml from "./dialogs/date_window_editor/date_window_editor.html";
import extIdEditor from "./dialogs/external_id_importer/external_id_importer";
import extIdEditorHtml from "./dialogs/external_id_importer/external_id_importer.html";
import partExport from "./dialogs/participant_export/participant_export";
import partExportHtml from "./dialogs/participant_export/participant_export.html";
import copySchemas from "./dialogs/copy_schemas/copy_schemas";
import copySchemasHtml from "./dialogs/copy_schemas/copy_schemas.html";
import withdrawal from "./dialogs/withdrawal/withdrawal";
import withdrawalHtml from "./dialogs/withdrawal/withdrawal.html";
import sendNot from "./dialogs/send_notification/send_notification";
import sendNotHtml from "./dialogs/send_notification/send_notification.html";
import sendSms from "./dialogs/send_sms_message/send_sms_message";
import sendSmsHtml from "./dialogs/send_sms_message/send_sms_message.html";
import settings from "./dialogs/settings/settings";
import settingsHtml from "./dialogs/settings/settings.html";
import selectSchemas from "./dialogs/select_schemas/select_schemas";
import selectSchemasHtml from "./dialogs/select_schemas/select_schemas.html";
import selectSurveys from "./dialogs/select_surveys/select_surveys";
import selectSurveysHtml from "./dialogs/select_surveys/select_surveys.html";
import selectConfigs from "./dialogs/select_configs/select_configs";
import selectConfigsHtml from "./dialogs/select_configs/select_configs.html";
import previewAppConfig from "./dialogs/preview_appconfig/preview_appconfig";
import previewAppConfigHtml from "./dialogs/preview_appconfig/preview_appconfig.html";
import editAppleLink from "./dialogs/edit_apple_link/edit_apple_link";
import editAppleLinkHtml from "./dialogs/edit_apple_link/edit_apple_link.html";
import editAndroidLink from "./dialogs/edit_android_link/edit_android_link";
import editAndroidLinkHtml from "./dialogs/edit_android_link/edit_android_link.html";
import oauthProvider from "./dialogs/oauth_provider/oauth_provider";
import oauthProviderHtml from "./dialogs/oauth_provider/oauth_provider.html";
import appConfigs from "./pages/appconfigs/appconfigs";
import appConfigsHtml from "./pages/appconfigs/appconfigs.html";
import appConfig from "./pages/appconfig/appconfig";
import appConfigHtml from "./pages/appconfig/appconfig.html";
import configs from "./pages/configs/configs";
import configsHtml from "./pages/configs/configs.html";
import configEditor from "./pages/config/editor";
import configEditorHtml from "./pages/config/editor.html";
import configHistory from "./pages/config/history";
import configHistoryHtml from "./pages/config/history.html";
import configTabset from "./pages/config/tabset";
import configTabsetHtml from "./pages/config/tabset.html";
import taskIdentifiers from "./pages/set_editors/task_identifiers.html";
import dataGroups from "./pages/settings/data_groups.html";
import userAtts from "./pages/settings/user_attributes.html";
import templatesList from './pages/templates/list';
import templatesListHtml from './pages/templates/list.html';
import templates from './pages/templates/templates';
import templatesHtml from './pages/templates/templates.html';
import templateGeneral from './pages/template/general';
import templateGeneralHtml from './pages/template/general.html';
import templateEditor from './pages/template/editor';
import templateEditorHtml from './pages/template/editor.html';
import templateHistory from './pages/template/history';
import templateHistoryHtml from './pages/template/history.html';
import templateTabset from './pages/template/tabset';
import templateTabsetHtml from './pages/template/tabset.html';

const reg = ko.components.register;
reg("errors", {viewModel: errors, template: errorsHtml});
reg("shared_modules", {viewModel: sharedModules, template: sharedModulesHtml});
reg("none", {template: '<div class="ui modal dialog"></div>'});
reg("dailyUploads", {viewModel: dailyUploads, template: dailyUploadsHtml});
reg("shared_module", {viewModel: sharedModule, template: sharedModuleHtml});
reg("shared_module_versions", {viewModel: sharedModuleVersions, template: sharedModuleVersionsHtml});
reg("sharedmodule-tabset", {viewModel: shTabset, template: shTabsetHtml});
reg("studyreports-tabset", {template: studyReportsTabsetHtml});
reg("general", {viewModel: general, template: generalHtml});
reg("email", {viewModel: email, template: emailHtml});
reg("app_links", {viewModel: applinks, template: applinksHtml});
reg("password_policy", {viewModel: passwordPolicy, template: passwordPolicyHtml});
reg("oauth_providers", {viewModel: oauthProviders, template: oauthProvidersHtml});
reg("install_links", {viewModel: installLinks, template: installLinksHtml});
reg("external_ids", {viewModel: externalIds, template: externalIdsHtml});
reg("signUps", {viewModel: signUps, template: signUpsHtml});
reg("reports", {viewModel: reports, template: reportsHtml});
reg("report", {viewModel: report, template: reportHtml});
reg("subpopulations", {viewModel: subpops, template: subpopsHtml});
reg("subpopulation", {viewModel: subpop, template: subpopHtml});
reg("subpopulation_editor", {viewModel: subpopEditor, template: subpopEditorHtml});
reg("subpopulation_history", {viewModel: subpopHistory, template: subpopHistoryHtml});
reg("subpopulation_download", {viewModel: subpopDl, template: subpopDlHtml});
reg("surveys", {viewModel: surveys, template: surveysHtml});
reg("survey", {viewModel: survey, template: surveyHtml});
reg("survey_versions", {viewModel: surveyVers, template: surveyVersHtml});
reg("survey_schema", {viewModel: surveySchema, template: surveySchemaHtml});
reg("schemas", {viewModel: schemas, template: schemasHtml});
reg("schema", {viewModel: schema, template: schemaHtml});
reg("schema_versions", {viewModel: schemaVers, template: schemaVersHtml});
reg("export_settings", {viewModel: exportSettings, template: exportSettingsHtml});
reg("shared_upload_metadata", {viewModel: uploadMetadata, template: uploadMetadataHtml});
reg("scheduleplans", {viewModel: scheduleplans, template: scheduleplansHtml});
reg("scheduleplan", {viewModel: scheduleplan, template: scheduleplanHtml});
reg("participants", {viewModel: participants, template: participantsHtml});
reg("participant_general", {viewModel: partGeneral, template: partGeneralHtml});
reg("participant_activities", {viewModel: partActivities, template: partActivitiesHtml});
reg("participant_activity_events", {viewModel: partEvents, template: partEventsHtml});
reg("participant_activity", {viewModel: partActivity, template: partActivityHtml});
reg("participant_clientData", {viewModel: partClientData, template: partClientDataHtml});
reg("participant_consents", {viewModel: partConsents, template: partConsentsHtml});
reg("participant_reports", {viewModel: partReports, template: partReportsHtml});
reg("participant_notifications", {viewModel: partNots, template: partNotsHtml});
reg("participant_report", {viewModel: partReport, template: partReportHtml});
reg("participant_uploads", {viewModel: partUploads, template: partUploadsHtml});
reg("participant_upload", {viewModel: partUpload, template: partUploadHtml});
reg("upload-details", {viewModel: uploadDetails, template: uploadDetailsHtml});
reg("participant_request_info", {viewModel: partRequestInfo, template: partRequestInfoHtml});
reg("event_keys", {template: eventKeysHtml, viewModel: setEditor("activityEventKeys")});
reg("auto_custom_events", {viewModel: customEvents, template: customEventsHtml});
reg("tasks", {viewModel: tasks, template: tasksHtml});
reg("task", {viewModel: task, template: taskHtml});
reg("topics", {viewModel: topics, template: topicsHtml});
reg("topic", {viewModel: topic, template: topicHtml});
reg("schedule", {viewModel: schedule, template: scheduleHtml});
reg("uploads", {viewModel: uploads, template: uploadsHtml});
reg("upload", {viewModel: upload, template: uploadHtml});
reg("SimpleScheduleStrategy", {viewModel: ss, template: ssHtml});
reg("ABTestScheduleStrategy", {viewModel: abs, template: absHtml});
reg("CriteriaScheduleStrategy", {viewModel: cs, template: csHtml});
reg("ABTestScheduleStrategyPanel", {viewModel: absPanel, template: absPanelHtml});
reg("CriteriaScheduleStrategyPanel", {viewModel: csPanel, template: csPanelHtml});
reg("SimpleScheduleStrategyPanel", {viewModel: ssPanel, template: ssPanelHtml});
reg("SurveyPanel", {viewModel: surveyPanel, template: surveyPanelHtml});
reg("admin_info", {viewModel: adminInfo, template: adminInfoHtml});
reg("admin_cache", {viewModel: adminCache, template: adminCacheHtml});
reg("admin_studies", {viewModel: adminStudies, template: adminStudiesHtml});
reg("admin_study", {viewModel: adminStudy, template: adminStudyHtml});
reg("admin_substudies", {viewModel: adminSubstudies, template: adminSubstudiesHtml});
reg("admin_substudy", {viewModel: substudy, template: substudyHtml});
reg("BooleanConstraints", {viewModel: boolConst, template: boolConstHtml});
reg("DateConstraints", {viewModel: dateConst, template:  dateConstHtml});
reg("DateTimeConstraints", {viewModel: dateTimeConst, template: dateTimeConstHtml});
reg("YearMonthConstraints", {viewModel: yearMonthConst, template: yearMonthConstHtml});
reg("PostalCodeConstraints", {viewModel: postalConst, template: postalConstHtml});
reg("DurationConstraints", {viewModel: durationConst, template: durationConstHtml});
reg("TimeConstraints", {viewModel: timeConst, template: timeConstHtml});
reg("IntegerConstraints", {viewModel: intConst, template: intConstHtml});
reg("DecimalConstraints", {viewModel: decConst, template: decConstHtml});
reg("StringConstraints", {viewModel: strConst, template: strConstHtml});
reg("MultiValueConstraints", {viewModel: mvConst, template: mvConstHtml});
reg("WeightConstraints", {viewModel: weightConst, template: weightConstHtml});
reg("HeightConstraints", {viewModel: heightConst, template: heightConstHtml});
reg("BloodPressureConstraints", {viewModel: bpConst, template: bpConstHtml});
reg("tag-editor", {viewModel: tagEditor, template: tagEditorHtml});
reg("ui-duration", {viewModel: uiDur, template: uiDurHtml});
reg("events-tabset", {template: eventsTabsetHtml});
reg("survey-tabset", {viewModel: surveyTabset, template: surveyTabsetHtml});
reg("subpop-tabset", {viewModel: subpopTabset, template: subpopTabsetHtml});

reg("app_version_criteria", {viewModel: appVersionCrit, template: appVersionCritHtml});
reg("template_criteria", {viewModel: templateCrit, template: templateCritHtml});
reg("participants-pager", {viewModel: partPager, template: partPagerHtml});
reg("field_definition", {viewModel: fieldDef, template: fieldDefHtml});
reg("SurveyInfoScreen", {viewModel: infoScreen, template: infoScreenHtml});
reg("SurveyQuestion", {template: questionHtml});
reg("constraints-label", {template: constLabelHtml});
reg("ui-rules", {viewModel: rules, template: rulesHtml});
reg("ui-checkbox", {template: checkHtml});
reg("ui-radio", {template: radioHtml});
reg("ui-date", {template: dateHtml});
reg("ui-datetime", {template: datetimeHtml});
reg("ui-select", {template: selectHtml});
reg("ui-textarea", {template: textareaHtml});
/* reg('fire-event', {template: require('./widgets/fire_event.html') }); */
reg("settings-tabset", {template: settingsTabset});
reg("participant-tabset", {viewModel: partTabset, template: partTabsetHtml});
reg("schema-tabset", {viewModel: schemaTabset, template: schemaTabsetHtml});
reg("verified-icon", {viewModel: verifiedIcon, template: verifiedIconHtml});
reg("not_found", {template: nfHtml });
reg("shared-module", {viewModel: sm, template: smHtml});
reg("forward-pager", {viewModel: fp, template: fpHtml});
reg("templatesList", {viewModel: templatesList, template: templatesListHtml});
reg("templates", {viewModel: templates, template: templatesHtml});
reg("template_general", {viewModel: templateGeneral, template: templateGeneralHtml});
reg("template_editor", {viewModel: templateEditor, template: templateEditorHtml});
reg("template_history", {viewModel: templateHistory, template: templateHistoryHtml});
reg("template-tabset", {viewModel: templateTabset, template: templateTabsetHtml});

// Dialogs. These must be synchronous.
reg("sign_out_user", {viewModel: signOutUser, template: signOutUserHtml, synchronous: true});
reg("module_browser", {viewModel: moduleBrowser, template: moduleBrowserHtml, synchronous: true});
reg("publickey", {viewModel: publicKey, template: publicKeyHtml, synchronous: true});
reg("json_editor", {viewModel: jsonEditor, template: jsonEditorHtml, synchronous: true});
reg("read_about_clipboard", {viewModel: readClipboard, template: readClipboardHtml, synchronous: true});
reg("report_editor", {viewModel: reportEditor, template: reportEditorHtml, synchronous: true});
reg("sign_in_dialog", {viewModel: signIn, template: signInHtml, synchronous: true});
reg("enumeration_editor", {viewModel: enumEditor, template: enumEditorHtml, synchronous: true});
reg("multichoice_editor", {viewModel: mcEditor, template: mcEditorHtml, synchronous: true});
reg("event_id_editor", {viewModel: eventIdEditor, template: eventIdEditorHtml, synchronous: true});
reg("times_editor", {viewModel: timesEditor, template: timesEditorHtml, synchronous: true});
reg("rules_editor", {viewModel: rulesEditor, template: rulesEditorHtml, synchronous: true});
reg("date_window_editor", {viewModel: dateWindowEditor, template: dateWindowEditorHtml, synchronous: true});
reg("external_id_importer", {viewModel: extIdEditor, template: extIdEditorHtml, synchronous: true});
reg("participant_export", {viewModel: partExport, template: partExportHtml, synchronous: true});
reg("copy_schemas", {viewModel: copySchemas, template: copySchemasHtml, synchronous: true});
reg("withdrawal", {viewModel: withdrawal, template: withdrawalHtml, synchronous: true});
reg("send_notification", {viewModel: sendNot, template: sendNotHtml, synchronous: true});
reg("send_sms_message", {viewModel: sendSms, template: sendSmsHtml, synchronous: true});
reg("settings", {viewModel: settings, template: settingsHtml, synchronous: true});
reg("select_schemas", {viewModel: selectSchemas, template: selectSchemasHtml, synchronous: true});
reg("select_surveys", {viewModel: selectSurveys, template: selectSurveysHtml, synchronous: true});
reg("select_configs", {viewModel: selectConfigs, template: selectConfigsHtml, synchronous: true});
reg("preview_appconfig", {viewModel: previewAppConfig, template: previewAppConfigHtml, synchronous: true});
reg("edit_apple_link", {viewModel: editAppleLink, template: editAppleLinkHtml, synchronous: true});
reg("edit_android_link", {viewModel: editAndroidLink, template: editAndroidLinkHtml, synchronous: true});
reg("oauth_provider", {viewModel: oauthProvider, template: oauthProviderHtml, synchronous: true});
reg("appconfigs", {viewModel: appConfigs, template: appConfigsHtml});
reg("appconfig", {viewModel: appConfig, template: appConfigHtml});
reg("configs", {viewModel: configs, template: configsHtml});
reg("config_editor", {viewModel: configEditor, template: configEditorHtml});
reg("config_history", {viewModel: configHistory, template: configHistoryHtml});
reg("config-tabset", {viewModel: configTabset, template: configTabsetHtml});
reg("criteria_editor", {viewModel: critEditor, template: critEditorHtml, synchronous: true});

// Attribute editors
reg("user_attributes", {template: userAtts, viewModel: setEditor("userProfileAttributes")});
reg("task_identifiers", {template: taskIdentifiers, viewModel: setEditor("taskIdentifiers")});
reg("data_groups", {template: dataGroups, viewModel: setEditor("dataGroups")});
reg("empty", {viewModel: function(){}, template: "<span></span>"});
