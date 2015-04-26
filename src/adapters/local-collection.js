;
define(["localstorage", "./local/put", "./local/delete"], function(LocalStorage, Put, Delete){

    var Local = function(mapper){
        this.mapper = mapper;
    };

    Local.prototype = {

        count: function()
        {
            var data = this.get();
            if(data != null){
                return data.length;
            }
            return 0;
        },

        get: function(params)
        {
            var order = new LocalStorage().get(this.getOrderResourceName());
            var data = new LocalStorage().get(this.mapper.resourceName);

            if(order == null){
                return null;
            }

            var tmpData = [];
            for (i = 0; i < order.length; i++) {
                var identifier =  order[i];
                tmpData[i] = data[identifier];
            }
            if(params != undefined && params != null && params.limit != undefined){
                return tmpData.slice(0, params.limit)
            }
            return tmpData;
        },

        getUpdatedTime: function()
        {
            return new LocalStorage().get(this.getResourceTime());
        },

        getOrderResourceName: function()
        {
            return this.mapper.resourceName + "/ORDER";
        },

        getResourceTime: function()
        {
            return this.mapper.resourceName + "/TIME";
        },

        getOneBy: function(key, value)
        {
            var source = this.get();
            if(source != null){
                for (var i = 0; i < source.length; i++) {
                    if (source[i][key] == value) {
                        return source[i];
                    }
                }
            }
            return null;
        },

        post: function(data)
        {
            if(data != undefined){
                var dataTmp = {};
                var orderTmp = [];
                var self = this;
                $.each(data, function(key, value){
                    orderTmp[key] = self.mapper.getIdentIdentifier(value);
                    dataTmp[self.mapper.getIdentIdentifier(value)] = value;
                });
                new LocalStorage().set(this.mapper.resourceName, dataTmp);
                new LocalStorage().set(this.getOrderResourceName(), orderTmp);
                new LocalStorage().set(this.getResourceTime(), $.now());
            }
        },

        put: function(newData)
        {
            new Put(this.mapper.resourceName, newData);
        },

        remove: function(identifier)
        {
            new Delete(this.mapper.resourceName, identifier);
            new Delete(this.getOrderResourceName(), identifier);
        }

    };

    return Local;
});