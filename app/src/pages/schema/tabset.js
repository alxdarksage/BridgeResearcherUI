import fn from '../../functions';
import ko from 'knockout';

/**
 * params:
 *  viewModel
 *      the parent view model
 */
module.exports = function(params) {
    var self = this;

    fn.copyProps(self, params.viewModel, 'isNewObs','schemaIdObs','revisionObs',
        'publishedObs','moduleIdObs','moduleVersionObs');

    self.computeds = [];
    self.linkMaker = function(tabName) {
        var c = ko.computed(function() { 
            return '#/schemas/'+encodeURIComponent(self.schemaIdObs())+
                '/versions/'+self.revisionObs()+'/'+tabName;
        });
        self.computeds.push(c);
        return c;
    };
    self.revisionLabel = ko.computed(function() {
        if (self.revisionObs()) {
            return 'v' + self.revisionObs();
        }
        return '';
    });
    self.computeds.push(self.revisionLabel);
};
module.exports.prototype.dispose = function() {
    this.computeds.forEach(function(c) {
        c.dispose();
    });
};