;
define(["localstorage"], function(LocalStorage){

    var Delete = function(resourceName, identifier){
        this.resourceName = resourceName;
        var data = this.getFromLocal();
        if(data != undefined && data != null){
            identifier != undefined ?
                this.one(identifier, data) :
                this.all();
        }
    };;

    Delete.prototype = {

        all: function()
        {
            new LocalStorage().remove(this.resourceName);
        },

        deleteOneFromArray: function(identifier, data)
        {
            if(data.length > 0){
                if(data.length > 0){
                    var index = data.indexOf(String(identifier));
                    var tmpData = [];
                    for (key in data) {
                        if(parseInt(key) != index){
                            tmpData.push(data[key])
                        }
                    }
                    new LocalStorage().set(this.resourceName, tmpData);
                }
            }
        },

        deleteOneFromObject: function(identifier, data)
        {
            delete data[identifier];
            $.isEmptyObject(data) ?
                this.all() :
                new LocalStorage().set(this.resourceName, data);
        },

        getFromLocal: function()
        {
            return new LocalStorage().get(this.resourceName);
        },

        one: function(identifier, data)
        {
            $.isArray(data) ?
                this.deleteOneFromArray(identifier, data) :
                this.deleteOneFromObject(identifier, data);
        }
    };

    return Delete;

});
