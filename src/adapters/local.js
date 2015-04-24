;
define(["localstorage", "./local/put", "./local/delete"], function(LocalStorage, Put, Delete){

    var Local = function(resourceName){
        this.resourceName = resourceName
    };

    Local.prototype = {

        get: function()
        {
            return new LocalStorage().get(this.resourceName);
        },

        post: function(value)
        {
            new LocalStorage().set(this.resourceName, value);
        },

        put: function(newData)
        {
            new Put(this.resourceName, newData);
        },

        remove: function(identifier)
        {
            new Delete(this.resourceName, identifier);
        }

    };

    return Local;
});