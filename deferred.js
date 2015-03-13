;
define(function(){

    var Deferred = function(requests){
        this.requests = requests;
    };

    Deferred.prototype = {

        when: function(callback)
        {
            this.callback = callback;
            var http = $.when.apply($, this.requests);
            http.done($.proxy(this.getResults, this));
        },

        getResults: function()
        {
            var result = [];
            $.each(arguments, function(key, res) {
                result[key] = res[0];
            });
            this.callback.apply(this, result);
        }

    };

    return Deferred;

});