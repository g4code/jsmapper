;
define(function(){

    var Arguments = function(){};

    Arguments.prototype = {

        defaultArguments: function()
        {
            return {
                params: null,
                callback: null
            };
        },

        format: function(params, callback)
        {
            var arguments = this.defaultArguments()

            if(typeof params === "object" || typeof params === "string"){
                arguments.params = params;
            }

            if(this.isFunction(params)){
                arguments.callback = params;
                arguments.params = null;
            }

            if(this.isFunction(callback)){
                arguments.params = params;
                arguments.callback = callback;
            }

            return arguments
        },

        isFunction: function(varaible)
        {
            return typeof(varaible) == "function";
        }

    };

    return Arguments;
});