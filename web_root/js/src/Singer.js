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
    this.notes_root      = new THREE.Object3D();
    this.character_head  = new THREE.Object3D();
    this.character_eyes  = new THREE.Object3D();
    this.character_mouth = new THREE.Object3D();
    this.scene_object.add(this.character_root);
    this.scene_object.add(this.notes_root);
    this.character_root.add(this.character_head);
    this.character_head.add(this.character_eyes);
    this.character_head.add(this.character_mouth);
    this.material_white = new THREE.MeshLambertMaterial();
    this.material_black = new THREE.MeshBasicMaterial();

    this.gaze_target = [0,0,0];
    this.gaze_point  = [0,0,0];

    this.character_head.lookAt(new THREE.Vector3(this.gaze_point[0], this.gaze_point[1], this.gaze_point[2]));

    // notes
    this.notes = [];
    this.note_phase = 0

    for (var i = 0; i < 10; i++)
    {
        var note = new Singer.Note();
        this.notes.push(note);
        this.notes_root.add(note.scene_object);
    }

    // position objects
    this.character_root.position.x = 130;
    this.character_root.position.y = -15;
    this.character_root.rotation.y = Utils.toRadians(-45);

    this.character_eyes.position.y = 60;

    this.notes_root.position.x = 60;

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

    Utils.loadObjs(obj_url_array, function (obj_list) {
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

Singer.Character.prototype.sing = function(shape)
{
    this.mouth.geometry.vertices = this.mouth_shapes[shape];
    this.mouth.geometry.verticesNeedUpdate = true;

    if (this.note_phase == 9) {this.note_phase = 0;} else {this.note_phase ++;}

    this.notes[this.note_phase].reset();
}


Singer.Character.prototype.talk = function(shape)
{
    this.mouth.geometry.vertices = this.mouth_shapes[shape];
    this.mouth.geometry.verticesNeedUpdate = true;
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

    // notes

    for (var i = 0; i < this.notes.length; i++)
    {
        this.notes[i].update();
    }

};


// ----------------------------------------------------------------------------------------------------
// Note class
// ----------------------------------------------------------------------------------------------------

// notes generated from man_model.ma using following python code:
// import maya.cmds as cmds
// import json
// for item in cmds.ls(sl=True):
//     print json.dumps(cmds.getAttr(item + '.cv[*]'))

Singer.notes_points = 
[
    [[-4.616093500404645, -4.331184838401498, 1.0249786576085652e-15], [-7.434796197976084, -1.0788355719728528, 1.6508563844919353e-15], [-9.60302904226188, -3.6807149851157703, 2.132300789786852e-15], [-7.651619482404698, -6.499417682687271, 1.6990008250214346e-15], [-4.616093500404645, -4.331184838401498, 1.0249786576085652e-15], [-6.133856491404686, 14.098794338027513, 1.361989741315003e-15], [4.92413101445274, 19.30255316431337, -1.0933767256890414e-15], [6.875540574309923, -0.4283657186871075, -1.5266766904544588e-15], [3.623191307881285, 1.3062205567415006, -8.045100825120966e-16], [3.1895447390241145, -2.5965985629728863, -7.082212014531108e-16], [5.357777583309911, -4.11436155397292, -1.1896656067480273e-15], [6.875540574309923, -0.4283657186871075, -1.5266766904544588e-15]],
    [[-1.230626023112933, 12.339446224707748, 2.7325386912678447e-16], [2.075929161775548, 10.604859949279136, -4.609488705645921e-16], [2.9576772110791296, 14.941325637850673, -6.567362678156229e-16], [0.3124330631683563, 17.543205050993592, -6.937407606252416e-17], [-1.682341231456661, 13.206739362422057, 3.735547941020958e-16], [-0.17541942414860046, -7.608295942721311, 3.895093674546334e-17], [-4.992510144242459, -1.1035974098640118, 1.1085599425767388e-15]],
    [[6.676386672190972, 14.458487072842068, -1.482455640939178e-15], [0.4034124508219463, 19.526619871465122, -8.957555825038683e-17], [-0.11294815892634347, -2.5200253422930032, 2.5079529340020438e-17], [-1.847534434354941, -6.206021177578812, 4.102350535759449e-16], [-5.301805958152414, -5.899791730791907, 1.1772374093813408e-15], [-5.53353026964075, -2.4604212340541167, 1.2286905425772931e-15], [-2.9316508564978108, -1.1594815274826544, 6.509572562233969e-16], [-0.11294815892634347, -2.5200253422930032, 2.5079529340020438e-17]],
    [[2.3527091142622965, 14.789884447577741, -5.224063657656811e-16], [1.0286594750384666, -3.218315618803267, -2.2840828672309557e-16], [-0.7059268003901309, -6.904311454089061, 1.567472375128289e-16], [-4.160198324187604, -6.59808200730216, 9.237495933182248e-16], [-4.391922635675911, -3.1587115105643733, 9.752027265141708e-16], [-1.7900432225330007, -1.8577718039928968, 3.974694401602809e-16], [1.0286594750384666, -3.218315618803267, -2.2840828672309557e-16]],
    [[4.953262430266477, 11.229742361301277, -1.0998451994043094e-15], [-0.6501208847354576, 19.63481733380413, 1.4435583501880736e-16], [1.1097071207871636, -2.390827481340363, -2.464044792034689e-16], [-0.49125954064194843, -5.792881636877244, 1.0908153063170466e-16], [-3.493072030821537, -4.39203580812676, 7.756177990726558e-16], [-3.8933136961788364, -1.5903441506258034, 8.644893015314539e-16], [-1.4918637040351541, -0.38961915455396934, 3.3126028677869047e-16], [1.1097071207871636, -2.390827481340363, -2.464044792034689e-16]]

]


// ----------------------------------------------------------------------------------------------------
// Note constructor
// ----------------------------------------------------------------------------------------------------

Singer.Note = function () 
{
    // build geo
    this.material = new THREE.LineBasicMaterial
    ({
        color: 0xfffffff,
        linewidth: 1,
        linejoin: "mitre"
    });

    this.material.visible = false;

    this.geometry = new THREE.Geometry();
    this.line_points = Singer.notes_points[Math.floor(Math.random()*Singer.notes_points.length)];

    for (var i = 0; i < this.line_points.length; i++)
    {
        this.geometry.vertices.push(new THREE.Vector3(this.line_points[i][0], this.line_points[i][1], this.line_points[i][2]))
    }

    this.scene_object = new THREE.Line(this.geometry, this.material);

    this.velocity = [0,0,0];
    this.target_velocity = [0,0,0];
    this.accelaration_factor = 0.06;
}


// ----------------------------------------------------------------------------------------------------
// Note reset method
// ----------------------------------------------------------------------------------------------------

Singer.Note.prototype.reset = function ()
{
    this.velocity = 
    [
        -2 - (Math.random() * 5),
        (Math.random() - 0.5) * 2,
        0
    ];

    this.target_velocity = 
    [
        0,
        2 + (Math.random() * 2),
        0
    ];

    this.scene_object.position.x = 0;
    this.scene_object.position.y = 0;
    this.scene_object.position.z = 0;

    this.scene_object.rotation.z += Utils.toRadians(Math.random() * -70);

    this.material.visible = true;
}


// ----------------------------------------------------------------------------------------------------
// Note update method
// ----------------------------------------------------------------------------------------------------

Singer.Note.prototype.update = function ()
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

    // visibility
    if (this.scene_object.position.y > 200)
    {
        this.material.visible = false;
    }
}





