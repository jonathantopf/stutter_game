// copyright Jonathan Topf 2014

// class to create singing character

// requires THREE.js
// requires commands.js

var Singer = {};

// ----------------------------------------------------------------------------------------------------
// constructor 
// ----------------------------------------------------------------------------------------------------

Singer.Character = function ()
{
    this.body;
    this.eyes;
    this.head;
    this.mouth;
    this.loaded = false;

    this.mouth_shapes = {};

    this.scene_object    = new THREE.Object3D();
    this.character_root  = new THREE.Object3D();
    this.character_head  = new THREE.Object3D();
    this.character_eyes  = new THREE.Object3D();
    this.character_mouth = new THREE.Object3D();
    this.point_light     = new THREE.PointLight( 0xFFFFFF, 0);
    this.scene_object.add(this.character_root);
    this.character_root.add(this.character_head);
    this.character_head.add(this.character_eyes);
    this.character_head.add(this.character_mouth);
    this.scene_object.add(this.point_light);
    this.material_white = new THREE.MeshLambertMaterial();
    this.material_black = new THREE.MeshBasicMaterial();

    this.gaze_target = [0,0,0];
    this.gaze_point  = [0,0,0];

    this.character_head.lookAt(new THREE.Vector3(this.gaze_point[0], this.gaze_point[1], this.gaze_point[2]));

    // character state
    this.blinking = 1; // 0=closed, 1=open
}


// ----------------------------------------------------------------------------------------------------
// load method
// ----------------------------------------------------------------------------------------------------

Singer.Character.prototype.load = function (on_load_callback) 
{
    obj_url_array = [
        'obj/body.obj',
        'obj/eyes.obj',
        'obj/head.obj',
        'obj/smile.obj',
        'obj/ooo.obj',
        'obj/aaa.obj',
    ];

    // on load
    var dummy_this = this; // hack to let you use this. inside a callback 

    Commands.loadObjs(obj_url_array, function (obj_list) {
        dummy_this.body  = obj_list[0];
        dummy_this.eyes  = obj_list[1];
        dummy_this.head  = obj_list[2];
        dummy_this.mouth = obj_list[3];


        dummy_this.mouth_shapes['smile'] = obj_list[3].geometry.vertices;
        dummy_this.mouth_shapes['ooo'] = obj_list[4].geometry.vertices;
        dummy_this.mouth_shapes['aaa'] = obj_list[5].geometry.vertices;


        dummy_this.character_root.add(dummy_this.body);
        dummy_this.character_eyes.add(dummy_this.eyes);
        dummy_this.character_head.add(dummy_this.head);
        dummy_this.character_head.add(dummy_this.mouth);

        
        dummy_this.loaded = true;

        dummy_this.setup();

        on_load_callback();

    }.bind(dummy_this)); 
}

// ----------------------------------------------------------------------------------------------------
// setup method 
// ----------------------------------------------------------------------------------------------------

Singer.Character.prototype.setup = function () 
{
    this.point_light.position.x = -100;
    this.point_light.position.y = 100;
    this.point_light.position.z = 130;

    this.character_root.position.x = 130;
    this.character_root.position.y = -15;
    this.character_root.rotation.y = Commands.toRadians(-45);

    this.character_eyes.position.y = 60;

    this.material_black.color = 0x000000;

    this.mouth.material = this.material_black;

    this.eyes.material = this.material_black;

};

// ----------------------------------------------------------------------------------------------------
// behaviors 
// ----------------------------------------------------------------------------------------------------

Singer.Character.prototype.blink = function()
{
    this.blinking = 0.01;
}

// ----------------------------------------------------------------------------------------------------
// behaviors 
// ----------------------------------------------------------------------------------------------------

Singer.Character.prototype.setMouth = function(shape)
{
    this.mouth.geometry.vertices = this.mouth_shapes[shape];
    this.mouth.geometry.verticesNeedUpdate = true;
}

// ----------------------------------------------------------------------------------------------------
// update method 
// ----------------------------------------------------------------------------------------------------

Singer.Character.prototype.update = function (tick) 
{
    // fade up light when loaded
    if (this.loaded)
    {
        if (this.point_light.intensity < 1)
        {
            this.point_light.intensity += 0.005;
        }
    }

    // blink
    if (this.blinking < 1)
    {
        this.blinking *= 2;
        this.character_eyes.scale.y = this.blinking;
    }

    // random gaze
    if (Math.random() > 0.99)
    {
        this.gaze_target = [Math.random() * 0.5,
                            Math.random() * 0.5,
                            5];

        if (Math.random() > 0.4)
        {
            this.blink();
        }
    }

    // head rotation

    this.gaze_point = [((this.gaze_point[0] * 5) + this.gaze_target[0]) / 6,
                       ((this.gaze_point[1] * 5) + this.gaze_target[1]) / 6,
                       ((this.gaze_point[2] * 5) + this.gaze_target[2]) / 6]

    this.character_head.lookAt(new THREE.Vector3(this.gaze_point[0], this.gaze_point[1], this.gaze_point[2]))

};

