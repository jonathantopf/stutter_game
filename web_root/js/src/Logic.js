// copyright Jonathan Topf 2014

var Logic = {};

Logic.singer;
Logic.light_rig;
Logic.loaiding_indicator;
Logic.text_canvas;


// ----------------------------------------------------------------------------------------------------
// Game script
// ----------------------------------------------------------------------------------------------------

Logic.init = function ()
{
    Logic.script = 
    {
        'loading'     : new Commands.Wait(Logic.loaiding_indicator),
        'lights_up'   : new Commands.Lights(Logic.light_rig.lights['key'], {value : 1, speed : 0.01}),
        'pause'       : new Commands.Sleep(1),
        'hello'       : new Commands.Speak('Hello there!', Logic.text_canvas),
        'test'        : new Commands.Sleep(3),
        'numm'        : new Commands.ClearCanvas(Logic.text_canvas),
        'lights_down' : new Commands.Lights(Logic.light_rig.lights['key'], {value : 0, speed : 0.01}),
        'end'         : new Commands.End()
    }

    // add a next attr to all entries
    Logic.script_keys = Object.keys(Logic.script);

    for (var i = 0; i < Logic.script_keys.length - 1; i ++)
    {
        if (Logic.script[Logic.script_keys[i]].next == null)
        {
            Logic.script[Logic.script_keys[i]].next = Logic.script_keys[i + 1];
            Logic.script[Logic.script_keys[i]].command_name = Logic.script_keys[i];
        }
    } 

    // initialise first step of game
    Logic.current_step = Logic.script['loading'];
    console.log('Initialised at step : ' + Logic.current_step.command_name);
}


// ----------------------------------------------------------------------------------------------------
// Update function 
// ----------------------------------------------------------------------------------------------------

Logic.update = function (tick) 
{
    if (Logic.current_step.completed == true)   
    {
        Logic.current_step.completed = false;
        Logic.current_step = Logic.script[Logic.current_step.next];
        console.log('Current_step : ' + Logic.current_step.command_name);
    }
    Logic.current_step.updateWrapper(tick);
}