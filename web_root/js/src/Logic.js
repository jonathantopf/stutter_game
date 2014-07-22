// copyright Jonathan Topf 2014

var Logic = {};

Logic.singer;
Logic.light_rig;
Logic.loaiding_indicator;

// ----------------------------------------------------------------------------------------------------
// Events 
// ----------------------------------------------------------------------------------------------------

Logic.Script = 
{
    'loading'     : { c : 'loading_wait', args : {}},
    'lights_up'   : { c : 'lights',       args : { name : 'key', value : 1, speed : 0.01 }},
    'end'         : { c : 'end',          args : { next  : 'lights_up' }}
}

// add a next attr to all entries
Logic.script_keys = Object.keys(Logic.Script);

for (var i = 0; i < Logic.script_keys.length - 1; i ++)
{
    if (Logic.Script[Logic.script_keys[i]].args.next == undefined)
    {
        Logic.Script[Logic.script_keys[i]].args.next = Logic.script_keys[i + 1];
    }
} 


// ----------------------------------------------------------------------------------------------------
// Update Loop 
// ----------------------------------------------------------------------------------------------------

Logic.update = function (tick)
{
    if (Logic.current_step.completed == true)
    {
        console.log('Logic advance to ' + Logic.current_step.next);
        Logic.current_step = new Logic.commands[Logic.Script[Logic.current_step.next].c](Logic.Script[Logic.current_step.next].args)
    }
    Logic.current_step.update(tick);
}



// ----------------------------------------------------------------------------------------------------
// commands
// ----------------------------------------------------------------------------------------------------

Logic.commands = {}

// BaseCommand class

Logic.BaseCommand = function (args)
{
    this.completed = false;
    this.args = args;
    this.next = args.next;

}


// loading_wait

Logic.commands['loading_wait'] = function (args)
{
    Logic.BaseCommand.apply(this, arguments);
}

Logic.commands['loading_wait'].prototype.update = function (tick)
{
    if (Logic.loaiding_indicator.completed == true)
    {
        this.completed = true;
    }
}


// lights

Logic.commands['lights'] = function (args) 
{
    Logic.BaseCommand.apply(this, arguments);
}

Logic.commands['lights'].prototype.update = function (tick)
{
    Logic.light_rig.lights['key'].target_intensity = this.args.value;
    Logic.light_rig.lights['key'].speed = this.args.speed;
    this.completed = true;
}


// goto

Logic.commands['goto'] = function (args)
{
    Logic.BaseCommand.apply(this, arguments);
}

Logic.commands['goto'].prototype.update = function (tick)
{
    this.completed = true;
}


// end 

Logic.commands['end'] = function (args)
{
    Logic.BaseCommand.apply(this, arguments);
}

Logic.commands['end'].prototype.update = function (tick)
{
}


// initilaize
Logic.current_step = new Logic.commands[Logic.Script['loading'].c](Logic.Script['loading'].args);
