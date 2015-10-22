;
define(["./adapters/remote", "./adapters/local", "./adapters/local-collection", "./arguments"], function(Remote, Local, LocalCollection, Arguments){

  var Mapper = function() {};

    Mapper.prototype = {

        adapter:'remote',

        count: function()
        {
            return this.getAdapterInstance().count();
        },

        getUpdatedTime: function()
        {
            return this.getAdapterInstance().getUpdatedTime();
        },

        remove: function(identifier, callback)
        {
            var adapter = this.getAdapterInstance(this.options);
            return adapter.remove(identifier, callback);
        },

        get: function(params, callback)
        {
            var arguments = new Arguments().format(params, callback);
            var adapter = this.getAdapterInstance();
            return adapter.get(arguments.params, arguments.callback);
        },

        getOneBy: function(key, value)
        {
            return this.getAdapterInstance().getOneBy(key, value);
        },

        getAdapterInstance: function()
        {
            switch(this.adapter) {
                case "local":
                    this.setLStorageKeyPrefix();
                    return new Local(this.resourceName);
                case "localCollection":
                    this.setLStorageKeyPrefix();
                    return new LocalCollection(this);
                case "remote":
                    return new Remote(this.resourceName);
            }
        },

        setLStorageKeyPrefix: function()
        {
            if(this.setLStorageKey != undefined){
                this.resourceName = this.setLStorageKey() + this.resourceName;
            }
        },

        post: function(params, callback)
        {
            var adapter = this.getAdapterInstance();
            return adapter.post(params, callback);
        },

        put: function(params, callback)
        {
            var adapter = this.getAdapterInstance();
            return adapter.put(params, callback);
        }

    };

    return Mapper;
});