// copyright Jonathan Topf 2014

var Commands = {};

Commands.key_mapping = {
    'C' : 'A', 
    'D' : 'S', 
    'E' : 'D', 
    'F' : 'F', 
    'G' : 'G', 
    'A' : 'H', 
    'B' : 'J', 
};

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

Commands.BaseCommand.init = function ()
{

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

Commands.Speak = function (tag, text, buffer, singer, args)
{
    Commands.BaseCommand.call(this, tag);
    this.text = text;
    this.args = args;  
    this.buffer = buffer;
    this.singer = singer;
    this.mouth_phase = 0;
    this.mouth_freq = 3;
}

Commands.Speak.prototype = Object.create(Commands.BaseCommand)
Commands.Speak.prototype.constructor = Commands.Speak;

Commands.Speak.prototype.update = function ()
{    
    if (this.mouth_phase == 0)
    {
        this.singer.talk();
    }

    this.mouth_phase ++;

    if (this.mouth_phase == this.mouth_freq)
    {
        this.mouth_phase = 0;
    }

    if (this.buffer.busy == false){
        this.completed = true;
        this.singer.talk('smile');
    }
}  

Commands.Speak.prototype.init = function ()
{
    this.buffer.append(this.text, this.args);
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

    this.init();
}

Commands.SongDemo.prototype = Object.create(Commands.BaseCommand)
Commands.SongDemo.prototype.constructor = Commands.SongDemo;

Commands.SongDemo.prototype.update = function ()
{    
    if (this.mesure_phase == 0)
    {
        this.mesure_phase = this.ticks_per_mesure;

        var singing = false

        for (var i = 0; i < Sound.scale.length; i ++)
        {
            if (this.song[this.mesure][i] == 1)
            {
                Sound.synth[Sound.scale[i]].play();
                this.singer.demoKey(Commands.key_mapping[Sound.scale[i]]);
                singing = true;
            } else {
                Sound.synth[Sound.scale[i]].pause();
            }
        }

        this.mesure ++; 


        if (singing)
        {
            this.singer.talk('ooo');
        } else {
            this.singer.talk('smile');
        }
    }

    if (this.song.length == this.mesure)
    {
        this.completed = true;
    }

    this.mesure_phase --;
}  

Commands.SongDemo.prototype.init = function ()
{
    this.mesure_phase = 0;
    this.mesure = 0;
    this.song_step = 0;
}


// ----------------------------------------------------------------------------------------------------
// ABSwitch
// ----------------------------------------------------------------------------------------------------

Commands.ABSwitch = function (tag, buffer, a_text, a_key, b_text, b_key)
{
    Commands.BaseCommand.call(this, tag);
    this.buffer = buffer;

    this.a_text = a_text;
    this.a_key = a_key;
    this.b_text = b_text;
    this.b_key = b_key;
}

Commands.ABSwitch.prototype = Object.create(Commands.BaseCommand)
Commands.ABSwitch.prototype.constructor = Commands.ABSwitch;

Commands.ABSwitch.prototype.update = function ()
{    
    if (this.cycle == 1) {
        this.b_arrow.hide();
    }

    if (Keyboard.status['up'] == 1)
    {
        this.a_arrow.show();
        this.b_arrow.hide();
        this.next_key = Logic.script_key_pairs[this.a_key];
    } else if (Keyboard.status['down'] == 1)
    {
        this.a_arrow.hide();
        this.b_arrow.show();
        this.next_key = Logic.script_key_pairs[this.b_key];
    } else if (Keyboard.status['enter'] == 1)
    {
        this.completed = true;
    }
}  

Commands.ABSwitch.prototype.init = function() {
    var args = {visible : true};
    this.buffer.init();
    this.buffer.append(this.a_text,  args);
    this.buffer.append(' *', args);
    this.a_arrow = this.buffer.chars[this.buffer.chars.length -1];
    this.buffer.append('\n', args);
    this.buffer.append(this.b_text, args);
    this.buffer.append(' *', args);
    this.b_arrow = this.buffer.chars[this.buffer.chars.length -1];
    this.buffer.busy = false;   
    this.b_arrow.hide();
    this.next_key = Logic.script_key_pairs[this.a_key];
}


// ----------------------------------------------------------------------------------------------------
// SongTest
// ----------------------------------------------------------------------------------------------------

Commands.SongTest = function (tag, buffer, song, singer, success_tag, fail_tag)
{
    Commands.BaseCommand.call(this, tag);
    this.buffer = buffer;
    this.song = song;
    this.singer = singer;

    this.success_tag = success_tag;
    this.fail_tag = fail_tag;

    this.current_note = null;

    this.note_stack = [];

}

Commands.SongTest.prototype = Object.create(Commands.BaseCommand)
Commands.SongTest.prototype.constructor = Commands.SongTest;

Commands.SongTest.prototype.update = function ()
{   
    // update stack
    for (var i = 0; i < Sound.scale.length; i ++) 
    {
        if (Keyboard.status[Commands.key_mapping[Sound.scale[i]]] > 0)
        {
            this.pushNote(Sound.scale[i]);
            this.buffer.init();
        } else {
            this.popNote(Sound.scale[i]);
        }
    }

    // play and stop sounds
    for (var i = 0; i < Sound.scale.length; i ++) 
    {
        if (this.note_stack.length > 0)
        {
            if (this.note_stack[this.note_stack.length -1] != this.current_note) { // note has changed
                // sounds
                Sound.stopAll();
                this.current_note = this.note_stack[this.note_stack.length -1] ;
                Sound.synth[this.current_note].play();
                // singer
                this.singer.sing();
            }
        } else {
            Sound.stopAll()
            this.singer.talk('smile');
            this.current_note = null;
        }
    }

    // print current song notes
    var line_string = '';
    for (var i = 0; i < this.song[0].length; i++)
    {
        if (this.song[this.current_song_step][i] == undefined)
        {
            line_string += '-';
        } else {
            line_string += '1';
        }
        line_string += ',';
    }
    console.log(line_string);

    // check validity of current note
    var song_key_comparison = this.compareSongToKeys();
    if (song_key_comparison == true) 
    {
        if (this.current_song_step == this.song.length - 1)
        {
            this.completed = true;
            this.next_key = Logic.script_key_pairs[this.success_tag];
            return;
        }
        
        this.advanceStep();
    } else if (song_key_comparison = false) {
        this.completed = true;
        this.next_key = Logic.script_key_pairs[this.fail_tag];
        return;
    }
}  

Commands.SongTest.prototype.init = function ()
{   
    this.current_song_step = 0;
}

Commands.SongTest.prototype.advanceStep = function ()
{
    while (true)
    {
        this.current_song_step ++;
        for (var i = 0; i < Sound.scale.length; i++)
        {
            if (this.song[this.current_song_step][i] != this.song[this.current_song_step - 1][i])
            {
                return;
            }
        }
    }
}

Commands.SongTest.prototype.pushNote = function (note)
{
    for (var i = 0; i < this.note_stack.length; i++)
    {
        if (this.note_stack[i] == note)
        {
            return;
        }
    }

    this.note_stack.push(note);
}

Commands.SongTest.prototype.popNote = function (note)
{
    for (var i = 0; i < this.note_stack.length; i++)
    {
        if (this.note_stack[i] == note)
        {
            this.note_stack.splice(i, 1);
            return;
        }
    }

}


Commands.SongTest.prototype.compareSongToKeys = function ()
{
    var top_note = this.note_stack[this.note_stack.length - 1];

    // if no note is playing
    if (top_note == undefined)
    {
        for (var i = 0; i < Sound.scale.length; i++)
        {
            if (this.song[this.current_song_step][i] == 1)
            {
                return null;
            }
        }
        return true;
    }

    // if note is playing
    if (this.song[this.current_song_step][Sound.scale_ids[top_note]] == 1)
    {
        return true
    }

    return false
}


Commands.SongTest.prototype.isTopNote = function (note)
{
    if (this.note_stack[this.note_stack.length - 1] == note) 
    { 
        return true; 
    }
    return false;
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
    this.buffer.init();
    this.completed = true;
} 


// ----------------------------------------------------------------------------------------------------
// GoTo
// ----------------------------------------------------------------------------------------------------

Commands.GoTo = function (tag, dest_tag)
{
    Commands.BaseCommand.call(this, tag);
    this.dest_tag = dest_tag;
}

Commands.GoTo.prototype = Object.create(Commands.BaseCommand)
Commands.GoTo.prototype.constructor = Commands.GoTo;

Commands.GoTo.prototype.update = function ()
{    
    this.next_key = Logic.script_key_pairs[this.dest_tag];
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
