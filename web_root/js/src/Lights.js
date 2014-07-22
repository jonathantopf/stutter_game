// copyright Jonathan Topf 2014

// ----------------------------------------------------------------------------------------------------
// Light Rig constructor
// ----------------------------------------------------------------------------------------------------

var Lights = {}

Lights.Rig = function ()
{
    // create lights
    this.lights = 
    {
        key : 
        {
            light: new THREE.PointLight( 0xFFFFFF, 0),
            target_intensity : 1,
            speed: 0.005
        }
    }

    console.log(new THREE.PointLight( 0xFFFFFF, 1));

    // add to scene
    this.scene_object = new THREE.Object3D();
    this.scene_object.add(this.lights.key.light);

    // position lights
    this.lights.key.light.position.x = -100;
    this.lights.key.light.position.y = 100;
    this.lights.key.light.position.z = 130;
}


// ----------------------------------------------------------------------------------------------------
// Light Rig update method
// ----------------------------------------------------------------------------------------------------

Lights.Rig.prototype.update = function (update)
{
    for (var key in this.lights)
    {
        if (this.lights[key].light.intensity < this.lights[key].target_intensity)
        {
            this.lights[key].light.intensity += this.lights[key].speed;
        }
    }
}

