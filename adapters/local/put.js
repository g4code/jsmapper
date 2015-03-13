;
define(["localstorage"], function(LocalStorage){

    var Put = function(resourceName, newData){
        this.resourceName = resourceName;
        $.isArray(newData) ?
            this.array(newData) :
            this.object(newData);
    };

    Put.prototype = {

        array: function(newData)
        {
            if(newData.length > 0){
                new LocalStorage().set(this.resourceName, newData);
            }
        },

        getFromLocal: function()
        {
            return new LocalStorage().get(this.resourceName);
        },

        object: function(newData)
        {
            var data = $.extend({}, newData, this.getFromLocal());
            if(!$.isEmptyObject(data)){
                new LocalStorage().set(this.resourceName, data);
            }
        }

    };

    return Put;
});