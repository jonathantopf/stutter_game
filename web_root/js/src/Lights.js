// copyright Jonathan Topf 2014

// ----------------------------------------------------------------------------------------------------
// Lights
// ----------------------------------------------------------------------------------------------------

var Lights = {}

Lights.Rig = function ()
{
    // create lights
    this.key_light = new THREE.PointLight( 0xFFFFFF, 1);

    // add to scene
    this.scene_object = new THREE.Object3D();
    this.scene_object.add(this.key_light);

    // position lights
    this.key_light.position.x = -100;
    this.key_light.position.y = 100;
    this.key_light.position.z = 130;
}