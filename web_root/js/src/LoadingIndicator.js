// copyright Jonathan Topf 2014

// class to create a simple spinning circle loading object

// requires THREE.js
// requires commands.js

var LoadingIndicator = {}

// ----------------------------------------------------------------------------------------------------
// constructor 
// ----------------------------------------------------------------------------------------------------

LoadingIndicator.Indicator = function()
{
    this.eval = true;
    this.loading = true;
    this.completed = false;
    this.hide = false;
    this.degrees = 0;
    this.min_degrees = Commands.toRadians(720); // rotate this many times minimum - helps stop the loading object strobing
    this.numpoints = 24;
    this.rotate_speed = 0.15;
    this.rad = 20;
    this.gap = 30;

    // material
    this.material = new THREE.LineBasicMaterial({
        color: 0xffffff,
        linewidth: 1,
        linejoin: "mitre"
    });

    this.line_geo = new THREE.Geometry();
    this.line_geo.vertices = this.buildLine(this.gap);
    this.line_geo.dynamic = true;

    this.scene_object = new THREE.Line(this.line_geo, this.material);
    this.scene_object.position.z = 200;
}


// ----------------------------------------------------------------------------------------------------
// buildLine method
// ----------------------------------------------------------------------------------------------------

LoadingIndicator.Indicator.prototype.buildLine = function (gap_angle) {

    step = (360.0 - gap_angle) / this.numpoints;


    var vertices = [];

    for (var i = 0; i <= this.numpoints; i++)
    {
        y = Math.sin(Commands.toRadians(step * i)) * this.rad;
        x = Math.cos(Commands.toRadians(step * i)) * this.rad;

        vertices.push(new THREE.Vector3(x, y, 0)); 
    }
    return vertices;
}


// ----------------------------------------------------------------------------------------------------
// update method 
// ----------------------------------------------------------------------------------------------------

LoadingIndicator.Indicator.prototype.update = function (tick) 
{
    if (this.eval)
    {
        if (this.loading == false)
        {
            if (this.gap >= 360)
            {
                this.eval = false;
                this.completed = true;
            } else {
                if (this.scene_object.rotation.z < (-1 * this.min_degrees))
                {
                    this.gap += 10;

                    this.line_geo.vertices = this.buildLine(this.gap);
                    this.line_geo.verticesNeedUpdate = true;
                }
            }
        }
        this.scene_object.rotation.z -= this.rotate_speed;
    }
};

