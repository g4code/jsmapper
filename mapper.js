;
define(["./adapters/remote", "./adapters/local", "./adapters/local-collection", "./arguments"], function(Remote, Local, LocalCollection, Arguments){

  var Mapper = function() {};

    Mapper.prototype = {

        adapter:'remote',

        count: function()
        {
            return this.getAdapterInstance().count();
        },

        delete: function(identifier, callback)
        {
            var adapter = this.getAdapterInstance(this.options);
            adapter.delete(identifier, callback);
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
                    return new Local(this.resourceName);
                case "localCollection":
                    return new LocalCollection(this);
                case "remote":
                    return new Remote(this.resourceName);
            }
        },

        post: function(params, callback)
        {
            var adapter = this.getAdapterInstance();
            adapter.post(params, callback);
        },

        put: function(params, callback)
        {
            var adapter = this.getAdapterInstance();
            adapter.put(params, callback);
        }

    };

    return Mapper;
});