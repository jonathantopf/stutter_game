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

Commands.Speak = function (tag, text, buffer, args)
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
// SongDemo
// ----------------------------------------------------------------------------------------------------

Commands.SongDemo = function (tag, song, singer, bpm) 
{
    Commands.BaseCommand.call(this, tag);
    this.song = song;
    this.singer = singer;
    this.ticks_per_mesure = Math.round(bpm / 16); // 16 mesures per bar

    this.mesure_phase = 0;
    this.mesure = 0;

    this.song_step = 0;
}

Commands.SongDemo.prototype = Object.create(Commands.BaseCommand)
Commands.SongDemo.prototype.constructor = Commands.SongDemo;

Commands.SongDemo.prototype.update = function ()
{    
    if (this.mesure_phase == 0)
    {
        this.mesure_phase = this.ticks_per_mesure;
        this.mesure ++; 

        for (var i = 0; i < Sound.scale.length; i ++)
        {
            if (this.song[this.mesure][i] == 1)
            {
                Sound.synth[Sound.scale[i]].play();
            } else {
                Sound.synth[Sound.scale[i]].pause();
            }
        }
    }

    if (this.song.length == this.mesure + 1)
    {
        this.completed = true;
    }

    this.mesure_phase --;
}  



// ----------------------------------------------------------------------------------------------------
// ClearBuffer
// ----------------------------------------------------------------------------------------------------

Commands.ClearBuffer = function (tag, buffer)
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

Commands.End = function (tag)
{
    Commands.BaseCommand.call(this, tag); 
}

Commands.End.prototype = Object.create(Commands.BaseCommand)
Commands.End.prototype.constructor = Commands.End;

Commands.End.prototype.update = function ()
{

}
