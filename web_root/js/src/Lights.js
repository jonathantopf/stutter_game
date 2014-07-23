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
        'key' : 
        {
            light: new THREE.PointLight( 0xFFFFFF, 0),
            target_intensity : 0,
            speed: 0.005
        }
    }

    this.light_keys = Object.keys(this.lights);

    // add to scene
    this.scene_object = new THREE.Object3D();
    this.scene_object.add(this.lights['key'].light);

    // position lights
    this.lights['key'].light.position.x = -100;
    this.lights['key'].light.position.y = 100;
    this.lights['key'].light.position.z = 130;
}


// ----------------------------------------------------------------------------------------------------
// Light Rig update method
// ----------------------------------------------------------------------------------------------------

Lights.Rig.prototype.update = function (update)
{
    for (var i = 0; i < this.light_keys.length; i++)
    {
        if (this.lights[this.light_keys[i]].light.intensity < this.lights[this.light_keys[i]].target_intensity)
        {
            this.lights[this.light_keys[i]].light.intensity += this.lights[this.light_keys[i]].speed;
        } else if (this.lights[this.light_keys[i]].light.intensity > this.lights[this.light_keys[i]].target_intensity){
            this.lights[this.light_keys[i]].light.intensity -= this.lights[this.light_keys[i]].speed;
        }
    }
}

