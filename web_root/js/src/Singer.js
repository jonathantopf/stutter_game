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

    this.talking_keys = ['ooo', 'aaa', 'mmm', 'eee'];

    this.scene_object    = new THREE.Object3D();
    this.character_root  = new THREE.Object3D();
    this.speech_bubbles_root = new THREE.Object3D();
    this.character_head  = new THREE.Object3D();
    this.character_eyes  = new THREE.Object3D();
    this.character_mouth = new THREE.Object3D();
    this.scene_object.add(this.character_root);
    this.scene_object.add(this.speech_bubbles_root);
    this.character_root.add(this.character_head);
    this.character_head.add(this.character_eyes);
    this.character_head.add(this.character_mouth);
    this.material_white = new THREE.MeshLambertMaterial();
    this.material_black = new THREE.MeshBasicMaterial();

    this.gaze_target = [0,0,0];
    this.gaze_point  = [0,0,0];

    this.character_head.lookAt(new THREE.Vector3(this.gaze_point[0], this.gaze_point[1], this.gaze_point[2]));

    // notes
    // this.notes = [];
    // this.note_phase = 0

    // for (var i = 0; i < 10; i++)
    // {
    //     var note = new Singer.Note();
    //     this.notes.push(note);
    //     this.speech_bubbles_root.add(note.scene_object);
    // }

    // demo keys
    this.demo_objects = {
        'A' : new Singer.DemoBubble('A'),
        'S' : new Singer.DemoBubble('S'),
        'D' : new Singer.DemoBubble('D'),
        'F' : new Singer.DemoBubble('F'),
        'G' : new Singer.DemoBubble('G'),
        'H' : new Singer.DemoBubble('H'),
        'J' : new Singer.DemoBubble('J'),
        'K' : new Singer.DemoBubble('K'),
        'L' : new Singer.DemoBubble('L')
    }

    this.demo_objects_keys = Object.keys(this.demo_objects);

    for (var i = 0; i < this.demo_objects_keys.length; i++)
    {
        this.speech_bubbles_root.add(this.demo_objects[this.demo_objects_keys[i]].scene_object);
    }

    // position objects
    this.character_root.position.x = 130;
    this.character_root.position.y = -15;
    this.character_root.rotation.y = Utils.toRadians(-45);

    this.character_eyes.position.y = 60;

    this.speech_bubbles_root.position.x = 60;

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
        'obj/mmm.obj',
        'obj/eee.obj',
    ];

    // on load
    var dummy_this = this; // hack to let you use this. inside a callback 

    Utils.loadObjs(obj_url_array, function (obj_list) {
        dummy_this.body  = obj_list[0];
        dummy_this.eyes  = obj_list[1];
        dummy_this.head  = obj_list[2];
        dummy_this.mouth = obj_list[3];


        dummy_this.mouth_shapes['smile'] = obj_list[3].geometry.vertices;
        dummy_this.mouth_shapes['ooo'] = obj_list[4].geometry.vertices;
        dummy_this.mouth_shapes['aaa'] = obj_list[5].geometry.vertices;
        dummy_this.mouth_shapes['mmm'] = obj_list[6].geometry.vertices;
        dummy_this.mouth_shapes['eee'] = obj_list[7].geometry.vertices;

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
// setup method - called after objs load
// ----------------------------------------------------------------------------------------------------

Singer.Character.prototype.setup = function () 
{
    this.material_black.color = 0x000000;
    this.mouth.material = this.material_black;
    this.eyes.material = this.material_black;
};


// ----------------------------------------------------------------------------------------------------
// sing/talk 
// ----------------------------------------------------------------------------------------------------

Singer.Character.prototype.sing = function (shape)
{
    if (shape == undefined)
    { 
        shape = this.randomMouthShape() 
    }
    this.mouth.geometry.vertices = this.mouth_shapes[shape];
    this.mouth.geometry.verticesNeedUpdate = true;

    if (this.note_phase == 9) {this.note_phase = 0;} else {this.note_phase ++;}

    this.notes[this.note_phase].reset();
}


Singer.Character.prototype.talk = function (shape)
{
    if (shape == undefined) 
    { 
        shape = this.randomMouthShape() 
    }
    this.mouth.geometry.vertices = this.mouth_shapes[shape];
    this.mouth.geometry.verticesNeedUpdate = true;
}


Singer.Character.prototype.randomMouthShape = function()
{
    return this.talking_keys[Math.floor(Math.random()*this.talking_keys.length)];
}


// ----------------------------------------------------------------------------------------------------
// demo
// ----------------------------------------------------------------------------------------------------

Singer.Character.prototype.demoKey = function (key)
{
    this.demo_objects[key].reset();
}

// ----------------------------------------------------------------------------------------------------
// update method 
// ----------------------------------------------------------------------------------------------------

Singer.Character.prototype.update = function (tick) 
{
    // blinking
    if (Math.random() > 0.992) { this.blinking = 0.01; }

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
            this.blinking = 0.01;
        }
    }

    // head rotation
    this.gaze_point = [((this.gaze_point[0] * 5) + this.gaze_target[0]) / 6,
                       ((this.gaze_point[1] * 5) + this.gaze_target[1]) / 6,
                       ((this.gaze_point[2] * 5) + this.gaze_target[2]) / 6]

    this.character_head.lookAt(new THREE.Vector3(this.gaze_point[0], this.gaze_point[1], this.gaze_point[2]))

    // // notes

    // for (var i = 0; i < this.notes.length; i++)
    // {
    //     this.notes[i].update();
    // }

    for (var i = 0; i < this.demo_objects_keys.length; i++)
    {
        var key = this.demo_objects_keys[i];
        this.demo_objects[key].updateWrapper();
    }

};


// ----------------------------------------------------------------------------------------------------
// SpeachBubble
// ----------------------------------------------------------------------------------------------------
// class for notes and demo keys do derive from

Singer.SpeachBubble = function ()
{    
    this.scene_object = new THREE.Object3D();
    this.scene_object.position.y = 200; // set nice and far out of view to start
    this.velocity = [0,0,0];
    this.target_velocity = [0,0,0];
    this.accelaration_factor = 0.06;
}


Singer.SpeachBubble.reset = function ()
{
    this.velocity = 
    [
        -2 - (Math.random() * 2),
        (Math.random() - 0.5) * 1,
        0
    ];

    this.target_velocity = 
    [
        0,
        2 + (Math.random() * 1),
        0
    ];

    this.scene_object.position.x = 0;
    this.scene_object.position.y = 0;
    this.scene_object.position.z = 0;

    this.scene_object.rotation.z += Utils.toRadians(Math.random() * -70);
}


Singer.SpeachBubble.updateWrapper = function ()
{
    // move
    for (var i = 0; i < 3; i++)
    {   
        this.velocity[i] = (this.velocity[i] * (1-this.accelaration_factor)) + (this.target_velocity[i] * this.accelaration_factor);
    }

    this.scene_object.rotation.z = (this.scene_object.rotation.z * (1-this.accelaration_factor));

    this.scene_object.position.add( new THREE.Vector3
    (
        this.velocity[0],
        this.velocity[1],
        this.velocity[2]
    ));

    this.update();
}


// ----------------------------------------------------------------------------------------------------
// DemoBubble
// ----------------------------------------------------------------------------------------------------

Singer.DemoBubble = function (letter){
    Singer.SpeachBubble.call(this);
    this.char_object = new LineText.Character(letter, {color : 0xffdddd, cycle_color : true, sparkle : true, key_outline : true});
    this.scene_object.scale.set(20,20,20);
    this.scene_object.add(this.char_object.scene_object);
    this.char_object.show();

}

Singer.DemoBubble.prototype = Object.create(Singer.SpeachBubble);
Singer.DemoBubble.prototype.constructor = Singer.DemoBubble;

Singer.DemoBubble.prototype.update = function () 
{
    this.char_object.update();
}




