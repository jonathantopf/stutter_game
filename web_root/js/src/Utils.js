// copyright Jonathan Topf 2014

var Utils = {};

// ----------------------------------------------------------------------------------------------------
// toRadians 
// ----------------------------------------------------------------------------------------------------

Utils.toRadians = function (angle)
{
  return angle * (Math.PI / 180);
}


// ----------------------------------------------------------------------------------------------------
// loadObjs - creates a list of geometry objects from a list of urls 
// ----------------------------------------------------------------------------------------------------

Utils.loadObjs = function(obj_url_array, all_loaded_callback) 
{
    dummy_this = this;
    this.obj_url_array = obj_url_array;
    this.objs = [];
    this.objs_to_load = this.obj_url_array.length;
    for (var i = 0; i < obj_url_array.length; i++)
    {
        !function(i){ // clever hack to let you use i to call callbacks inside a for loop

            var loader = new THREE.OBJLoader();
            loader.load(dummy_this.obj_url_array[i], function (object)
            {
                dummy_this.objs[i] = object.children[0] // the first child is the first piece of geo in the file
                --dummy_this.objs_to_load;
                
                if (dummy_this.objs_to_load == 0)
                {
                    all_loaded_callback(dummy_this.objs);
                }
            });
 
        }(i, dummy_this) // clever hack to let you use i to call callbacks inside a for loop
    }
}


// ----------------------------------------------------------------------------------------------------
// namedArgs - takes a dict of args and transfers them to an argument 
// ----------------------------------------------------------------------------------------------------

Utils.namedArgs = function (object, args)
{
    if (args != undefined)
    {
        var args_keys = Object.keys(args);
        for (var i = 0; i < args_keys.length; i++)
        {
            object[args_keys[i]] = args[args_keys[i]];
        }
    }
}


