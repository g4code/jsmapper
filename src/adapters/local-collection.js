;
define(["localstorage", "./local/put"],
    function(LocalStorage, Put){

    var Local = function(mapper){
        this.mapper = mapper;
    };

    Local.prototype = {

        delete: function(identifier)
        {
            identifier == undefined ?
                new LocalStorage().remove(this.resourceName):
                this.deleteOne(identifier);
        },

        deleteOne: function(identifier)
        {
            var data = this.get();
            var key = this.getKey(identifier);
            var tmpData = [];
            for (i = 0; i < data.length; i++) {
                if(data[i][key] != identifier[key]){
                    tmpData.push(data[i]);
                }

            }
            this.post(tmpData);
        },

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
            for (var i = 0; i < source.length; i++) {
                if (source[i][key] == value) {
                    return source[i];
                }
            }
            return null;
        },

        getKey: function(identifier )
        {
            for (var key in identifier) {
                return key;
            }
        },

        post: function(data)
        {
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
        },

        put: function(newData, identifier)
        {

            var data = this.get();
            var tmpTasks = [];
            var key = this.getKey(identifier);
            for (i = 0; i < data.length; i++) {
                if(data[i][key] == newData[key]){
                    tmpTasks.push(newData);
                }
                else{
                    tmpTasks.push(data[i]);
                }
            }
            this.post(tmpTasks);
        }

    };

    return Local;
});