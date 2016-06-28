var sinon = require('sinon');
var proxyquire =  require('proxyquire');
var expect = require('chai').expect;
var DummyPromise = require('../../dummy_promise');

// This works. Doesn't test html or data binding at all, just the view logic.
// Also a bit of work to set up.

var study = {
    healthCodeExportEnabled: true,
    emailVerificationEnabled: true
};
var serverService = {
    getStudy: sinon.stub().returns(new DummyPromise(study)),
    saveStudy: sinon.stub().returns(new DummyPromise({"message":"Study saved"}))
};
var AdminInfo = proxyquire('../../../app/src/pages/admin/info/info.js', {
    '../../../services/server_service': serverService
});

describe("Admin/Info", function() {
    it("calls server correctly", function() {
        var adminInfo = new AdminInfo();
        expect(serverService.getStudy.calledOnce).to.be.true;

        // initialize
        expect(adminInfo.study).to.exist;
        expect(adminInfo.healthCodeExportEnabledObs()).to.be.true;
        expect(adminInfo.emailVerificationEnabledObs()).to.be.true;

        // change
        adminInfo.healthCodeExportEnabledObs(false);

        // save
        adminInfo.save();

        // also study model was updated
        expect(adminInfo.study.healthCodeExportEnabled).to.be.false;
        expect(adminInfo.study.emailVerificationEnabled).to.be.true;

        // save called server with correct data.
        expect(serverService.saveStudy.calledWith({
            healthCodeExportEnabled: false,
            emailVerificationEnabled: true
        })).to.be.true;
    });
});
