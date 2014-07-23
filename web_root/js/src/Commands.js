// copyright Jonathan Topf 2014

var Commands = {};

// ----------------------------------------------------------------------------------------------------
// BaseClass
// ----------------------------------------------------------------------------------------------------

Commands.BaseCommand = function ()
{
    this.completed = false;
    this.next = null;
    this.name = null;
}


// ----------------------------------------------------------------------------------------------------
// Wait
// ----------------------------------------------------------------------------------------------------

Commands.Wait = function (wait_object) 
{
    Commands.BaseCommand.apply(this, arguments);
    this.wait_object = wait_object;
}

Commands.Wait.prototype.update = function ()
{
    this.completed = this.wait_object.completed;
}


// ----------------------------------------------------------------------------------------------------
// Sleep
// ----------------------------------------------------------------------------------------------------

Commands.Sleep = function (time) 
{
    Commands.BaseCommand.apply(this, arguments);
    this.timer = time;
}

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

Commands.Lights = function (light, args) // args { value, speed }
{
    Commands.BaseCommand.apply(this, arguments);
    this.light = light;
    this.args = args;   
}

Commands.Lights.prototype.update = function ()
{
    this.light.target_intensity = this.args.value;
    this.light.speed = this.args.speed;
    this.completed = true;
}


// ----------------------------------------------------------------------------------------------------
// End
// ----------------------------------------------------------------------------------------------------

Commands.End = function () // args { value, speed }
{
    Commands.BaseCommand.apply(this, arguments); 
}

Commands.End.prototype.update = function ()
{

}




