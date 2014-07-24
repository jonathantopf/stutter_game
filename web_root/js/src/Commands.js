// copyright Jonathan Topf 2014

var Commands = {};

// ----------------------------------------------------------------------------------------------------
// BaseClass
// ----------------------------------------------------------------------------------------------------

Commands.BaseCommand = function (tag)
{
    this.completed = false;
    this.tag = tag;
    this.current_key = null;
    this.next_key = null;
    this.cycle = 0;
}

Commands.BaseCommand.updateWrapper = function (tick)
{
    this.update(tick);
    this.cycle ++;
}


// ----------------------------------------------------------------------------------------------------
// Wait
// ----------------------------------------------------------------------------------------------------

Commands.Wait = function (tag, wait_object) 
{
    Commands.BaseCommand.call(this, tag);
    this.wait_object = wait_object;
}

Commands.Wait.prototype = Object.create(Commands.BaseCommand)
Commands.Wait.prototype.constructor = Commands.Wait;

Commands.Wait.prototype.update = function ()
{
    this.completed = this.wait_object.completed;
}


// ----------------------------------------------------------------------------------------------------
// Sleep
// ----------------------------------------------------------------------------------------------------

Commands.Sleep = function (tag, time) 
{
    Commands.BaseCommand.call(this, tag);
    this.timer = time;
}

Commands.Sleep.prototype = Object.create(Commands.BaseCommand)
Commands.Sleep.prototype.constructor = Commands.Sleep;

Commands.Sleep.prototype.update = function ()
{
    if (this.timer <= 0)
    {
        this.completed = true;
    } else {
        this.timer -= 1 / 60;
    }
}


// ----------------------------------------------------------------------------------------------------
// Lights
// ----------------------------------------------------------------------------------------------------

Commands.Lights = function (tag, light, args) // args { value, speed }
{
    Commands.BaseCommand.call(this, tag);
    this.light = light;
    this.args = args;   
}

Commands.Lights.prototype = Object.create(Commands.BaseCommand)
Commands.Lights.prototype.constructor = Commands.Lights;

Commands.Lights.prototype.update = function ()
{
    this.light.target_intensity = this.args.value;
    this.light.speed = this.args.speed;
    this.completed = true;
}


// ----------------------------------------------------------------------------------------------------
// Speak
// ----------------------------------------------------------------------------------------------------

Commands.Speak = function (tag, text, buffer, args) // args { value, speed }
{
    Commands.BaseCommand.call(this, tag);
    this.text = text;
    this.args = args;  
    this.buffer = buffer;
}

Commands.Speak.prototype = Object.create(Commands.BaseCommand)
Commands.Speak.prototype.constructor = Commands.Speak;

Commands.Speak.prototype.update = function ()
{    
    if (this.cycle == 0)
    {
        this.buffer.append(this.text, this.args);
    }
    if (this.buffer.busy == false){
        this.completed = true;
    }
}  


// ----------------------------------------------------------------------------------------------------
// ClearBuffer
// ----------------------------------------------------------------------------------------------------

Commands.ClearBuffer = function (tag, buffer) // args { value, speed }
{
    Commands.BaseCommand.call(this, tag);
    this.buffer = buffer;
}

Commands.ClearBuffer.prototype = Object.create(Commands.BaseCommand)
Commands.ClearBuffer.prototype.constructor = Commands.ClearBuffer;

Commands.ClearBuffer.prototype.update = function ()
{    
    this.buffer.init()
    this.completed = true;
}  


// ----------------------------------------------------------------------------------------------------
// End
// ----------------------------------------------------------------------------------------------------

Commands.End = function (tag) // args { value, speed }
{
    Commands.BaseCommand.call(this, tag); 
}

Commands.End.prototype = Object.create(Commands.BaseCommand)
Commands.End.prototype.constructor = Commands.End;

Commands.End.prototype.update = function ()
{

}
