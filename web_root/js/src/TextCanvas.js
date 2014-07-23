// copyright Jonathan Topf 2014

var TextCanvas = {}

// ----------------------------------------------------------------------------------------------------
// letter data built using maya 
// ----------------------------------------------------------------------------------------------------

TextCanvas.Canvas = function () 
{
    this.singer;
    this.text_objects = [];
    this.scene_object = new THREE.Object3D();
    this.busy = false;
    this.visibility_phase = 0;

    // position scene object
    this.scene_object.position.z = 575;
    this.scene_object.position.x = -10;
}


TextCanvas.Canvas.prototype.appendText = function (text, args)
{
    if (args == undefined)
    {
        args = {
            color : 0xffffff,
            jitter_freq : 3,
            jitter_scale : 0.05,
            scale : 1
        }
    }

    // create chunk
    var text_object = new JitterText.Text(
        text,
        args.color,
        args.jitter_freq,
        args.jitter_scale,
        args.scale
    );
    this.text_objects.push(text_object);
    this.scene_object.add(text_object.scene_object);
    this.busy = true;
}


TextCanvas.Canvas.prototype.clear = function ()
{
    for (var i = 0; i < this.text_objects.length; i++)
    {
        this.scene_object.remove(this.text_objects[i].scene_object);
    }

    this.text_objects = [];
    this.visibility_phase = 0
}


TextCanvas.Canvas.prototype.update = function (tick)
{
    for (var i = 0; i < this.text_objects.length; i++)
    {
        this.text_objects[i].update(tick)
    }

    // if the last line geoin the last text object is visible then mark canvas complete
    if (this.text_objects.length > 0)
    {
        if (this.text_objects.slice(-1)[0].line_geos.slice(-1)[0].material.visible == true)
        {
            this.busy = false;
        }
    }
}
