// copyright Jonathan Topf 2014

var Commands = {};

// ----------------------------------------------------------------------------------------------------
// toRadians 
// ----------------------------------------------------------------------------------------------------

Commands.toRadians = function (angle)
{
  return angle * (Math.PI / 180);
}


// ----------------------------------------------------------------------------------------------------
// loadObjs - creates a list of geometry objects from a list of urls 
// ----------------------------------------------------------------------------------------------------

Commands.loadObjs = function(obj_url_array, all_loaded_callback) 
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