// copyright Jonathan Topf 2014

var Logic = {};

Logic.singer;
Logic.light_rig;
Logic.loaiding_indicator;
Logic.text_buffer;


// ----------------------------------------------------------------------------------------------------
// Game script
// ----------------------------------------------------------------------------------------------------

Logic.init = function ()
{
    Logic.script = 
    [
        //  command type             tag        args
        new Commands.Wait           ('loading', Logic.loaiding_indicator),
        new Commands.Lights         (null,      Logic.light_rig.lights['key'], {value : 1, speed : 0.01}),
        new Commands.Sleep          (null,      1),
        new Commands.Speak          (null,      'H... H... Hi!\ncould you give me \na hand?\n', Logic.text_buffer),
        new Commands.Sleep          (null,      2),
        new Commands.ClearBuffer    (null,      Logic.text_buffer),
        new Commands.Speak          (null,      'I\'m going shopping\nbut its kinda hard\nwith this\ns...s...s...', Logic.text_buffer),
        new Commands.Speak          (null,      'stutter', Logic.text_buffer, {jitter_mult : 3}),
        new Commands.Sleep          (null,      3),
        new Commands.ClearBuffer    (null,      Logic.text_buffer),
        new Commands.Speak          (null,      'The only thing\nthat helps is if I\n', Logic.text_buffer),
        new Commands.Speak          (null,      'sing', Logic.text_buffer, {color : 0xffff00, cycle_color : true}),
        new Commands.Sleep          (null,      6),
        new Commands.Lights         (null,      Logic.light_rig.lights['key'], {value : 0, speed : 0.02}),
        new Commands.End            ('end')
    ]

    // add a next attr to all entries
    for (var i = 0; i < Logic.script.length - 1; i ++)
    {
        if (Logic.script[i].next_key == null)
        {
            Logic.script[i].next_key = i + 1;
        }
    } 

    // initialise first step of game
    Logic.current_step = Logic.script[0];
    console.log('Initialised at step : ' + Logic.current_step.tag);
}


// ----------------------------------------------------------------------------------------------------
// Update function 
// ----------------------------------------------------------------------------------------------------

Logic.update = function (tick) 
{
    if (Logic.current_step.completed == true)   
    {
        Logic.current_step.completed = false;
        Logic.current_step = Logic.script[Logic.current_step.next_key];
        if (Logic.current_step.tag != null)
        {
            console.log('Current_step : ' + Logic.current_step.tag);
        }
    }
    Logic.current_step.updateWrapper(tick);
}