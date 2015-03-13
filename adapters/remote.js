;
define(["http"], function(Http){

    var Remote = function(resourceName) {
        this.resourceName =  resourceName;
    };

    Remote.prototype = {

        delete: function(params, callback)
        {
            var data = {
                url  : this.resourceName,
                type : "DELETE",
                data : params
            }

            new Http(data).success(callback);
        },

        get: function(params, callback)
        {
            var data = {
                url:this.resourceName
            }
            if(params != null){
                data.data = params;
            }
            var http = new Http(data);
            return callback == null ?
                http.response :
                http.success(callback);
        },

        post: function(params, callback)
        {
            var data = {
                url  : this.resourceName,
                type : "POST",
                data : params
            }

            new Http(data).success(callback);
        },

        put: function(callback)
        {

        }
    };

    return Remote;
});