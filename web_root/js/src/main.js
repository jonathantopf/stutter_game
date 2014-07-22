// copyright Jonathan Topf 2014

// requires Commands.js
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


// ----------------------------------------------------------------------------------------------------
// render loop 
// ----------------------------------------------------------------------------------------------------

var tick = 0;

var render = function()
{
    stats.begin();

    if (singer.loaded){
        if (Math.random() > 0.992)
        {
            singer.blink();
        }

        for (var letter in Keyboard.status)
        {
            if (Keyboard.status[letter] == 1)
            {
                // play sound
                Music.notes[key_music_map[letter]].play()
                // set mouth
                switch (letter){
                    case 'a': 
                        singer.sing('ooo');
                        break;
                    case 's':
                        singer.sing('aaa');
                        break;
                    case 'd': 
                        singer.sing('ooo');
                        break;
                    case 'f':
                        singer.sing('aaa');
                        break;
                    case 'g': 
                        singer.sing('ooo');
                        break;
                    case 'h':
                        singer.sing('aaa');
                        break;
                    case 'j': 
                        singer.sing('ooo');
                        break;
                }

            } else if(Keyboard.status[letter] == 3) {
                // stop sound
                Music.notes[key_music_map[letter]].pause()
                // reset mouth
                singer.talk('smile')
            }

        }
    }

    sentence.update(tick);


    loading_indicator.update(tick);
    singer.update(tick);
    Keyboard.update();
    // draw!
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    tick++;
    stats.end();
}

render();





