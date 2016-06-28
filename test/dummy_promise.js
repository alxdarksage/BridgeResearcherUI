function DummyPromise(value) {
    this.value = value;
    this.reject = function() {};
}
DummyPromise.prototype = {
    then: function(func) {
        try {
            var newPromise = new DummyPromise(func(this.value));
            return newPromise;
        } catch(e) {
            this.reject(e);
            return this;
        }
    },
    catch: function(func) {
        this.reject = func;
        return this;
    }
};

module.exports = DummyPromise;