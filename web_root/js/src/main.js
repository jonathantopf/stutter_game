// copyright Jonathan Topf 2014

// requires Utils.js
// requires LoadingIndicator.js


// ----------------------------------------------------------------------------------------------------
// initialise 
// ----------------------------------------------------------------------------------------------------

var WIDTH = 220;
    HEIGHT = 110;

// get the DOM element to attach to using jquery
var $viewport = $('#viewport');


// ----------------------------------------------------------------------------------------------------
// kayboard to note mapping 
// ----------------------------------------------------------------------------------------------------

var key_music_map =
{
    'a' : 'c',
    's' : 'd',
    'd' : 'e',
    'f' : 'f',
    'g' : 'g',
    'h' : 'a',
    'j' : 'b'
}

// ----------------------------------------------------------------------------------------------------
// stats
// ----------------------------------------------------------------------------------------------------

var stats = new Stats();
stats.setMode(1); // 0: fps, 1: ms
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);


// ----------------------------------------------------------------------------------------------------
// create a WebGL renderer and scene 
// ----------------------------------------------------------------------------------------------------

var renderer = new THREE.WebGLRenderer();
renderer.gammaInput = true;
renderer.gammaOutput = true;
var scene = new THREE.Scene();
renderer.setSize(WIDTH, HEIGHT);
$viewport.append(renderer.domElement);


// ----------------------------------------------------------------------------------------------------
// camera 
// ----------------------------------------------------------------------------------------------------

var VIEW_ANGLE = 25,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 1,
    FAR = 10000;

var camera = new THREE.PerspectiveCamera(VIEW_ANGLE,
                                         ASPECT,
                                         NEAR,
                                         FAR);
camera.position.z = 600;
scene.add(camera);


// ----------------------------------------------------------------------------------------------------
// scene objects
// ----------------------------------------------------------------------------------------------------

//  loading indicator
var loading_indicator = new LoadingIndicator.Indicator();
scene.add(loading_indicator.scene_object);

var singer = new Singer.Character();

singer.load(function () {
    loading_indicator.loading = false;
});
scene.add(singer.scene_object);

var light_rig = new Lights.Rig();
scene.add(light_rig.scene_object);

var text_buffer = new LineText.Buffer();
text_buffer.singer = singer;
scene.add(text_buffer.scene_object);


// ----------------------------------------------------------------------------------------------------
// Logic
// ----------------------------------------------------------------------------------------------------

Logic.singer = singer;
Logic.light_rig = light_rig;
Logic.loaiding_indicator = loading_indicator;
Logic.text_buffer = text_buffer;

Logic.init();


// ----------------------------------------------------------------------------------------------------
// render loop 
// ----------------------------------------------------------------------------------------------------

var tick = 0;

var render = function()
{
    stats.begin();

    // logic
    Logic.update(tick);
    // update game components
    loading_indicator.update(tick);
    text_buffer.update(tick);
    light_rig.update(tick);
    singer.update(tick);
    Keyboard.update(tick);
    // draw!
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    tick++;

    stats.end();
}

render();

