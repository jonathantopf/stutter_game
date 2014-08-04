// copyright Jonathan Topf 2014

var Keyboard = {}


// ----------------------------------------------------------------------------------------------------
// key status
// ----------------------------------------------------------------------------------------------------

// 0 : up
// 1 : pressed
// 2 : down
// 3 : released

Keyboard.status = {
    'A'     : 0,
    'S'     : 0,
    'D'     : 0,
    'F'     : 0,
    'G'     : 0,
    'H'     : 0,
    'J'     : 0,
    'down'  : 0,
    'up'    : 0,
    'enter' : 0
}

Keyboard.anyKeyPressed = function ()
{

}


// ----------------------------------------------------------------------------------------------------
// key bindings
// ----------------------------------------------------------------------------------------------------

//event listener
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);

function onKeyDown(event){
  var keyCode = event.keyCode;
  switch(keyCode){
    case 65: //a
        if (Keyboard.status['A'] == 0)
        {
            Keyboard.status['A'] = 1;
        }
    break;
    case 83: //s
        if (Keyboard.status['S'] == 0)
        {
            Keyboard.status['S'] = 1;
        }
    break;
    case 68: //d
        if (Keyboard.status['D'] == 0)
        {
            Keyboard.status['D'] = 1;
        }
    break;
    case 70: //f
        if (Keyboard.status['F'] == 0)
        {
            Keyboard.status['F'] = 1;
        }
    break;
    case 71: //g
        if (Keyboard.status['G'] == 0)
        {
            Keyboard.status['G'] = 1;
        }
    break;
    case 72: //h
        if (Keyboard.status['H'] == 0)
        {
            Keyboard.status['H'] = 1;
        }
    break;
    case 74: //j
        if (Keyboard.status['J'] == 0)
        {
            Keyboard.status['J'] = 1;
        }
    break;
    case 38: //up
        if (Keyboard.status['up'] == 0)
        {
            Keyboard.status['up'] = 1;
        }
    break;
    case 40: //down
        if (Keyboard.status['down'] == 0)
        {
            Keyboard.status['down'] = 1;
        }
    break;
    case 13: //enter
        if (Keyboard.status['enter'] == 0)
        {
            Keyboard.status['enter'] = 1;
        }
    break;
  }
}

function onKeyUp(event){
  var keyCode = event.keyCode;
  switch(keyCode){
    case 65: //a
        if (Keyboard.status['A'] == 2)
        {
            Keyboard.status['A'] = 3;
        }
    break;
    case 83: //s
        if (Keyboard.status['S'] == 2)
        {
            Keyboard.status['S'] = 3;
        }
    break;
    case 68: //d
        if (Keyboard.status['D'] == 2)
        {
            Keyboard.status['D'] = 3;
        }
    break;
    case 70: //f
        if (Keyboard.status['F'] == 2)
        {
            Keyboard.status['F'] = 3;
        }
    break;
    case 71: //g
        if (Keyboard.status['G'] == 2)
        {
            Keyboard.status['G'] = 3;
        }
    break;
    case 72: //h
        if (Keyboard.status['H'] == 2)
        {
            Keyboard.status['H'] = 3;
        }
    break;
    case 74: //j
        if (Keyboard.status['J'] == 2)
        {
            Keyboard.status['J'] = 3;
        }
    break;
    case 38: //up
        if (Keyboard.status['up'] == 2)
        {
            Keyboard.status['up'] = 3;
        }
    break;
    case 40: //down
        if (Keyboard.status['down'] == 2)
        {
            Keyboard.status['down'] = 3;
        }
    break;
    case 13: //enter
        if (Keyboard.status['enter'] == 2)
        {
            Keyboard.status['enter'] = 3;
        }
    break;
  }
}


// ----------------------------------------------------------------------------------------------------
// update key function 
// ----------------------------------------------------------------------------------------------------

Keyboard.update = function () 
{
    for (var key in Keyboard.status)
    {
        if (Keyboard.status[key] == 1)
        {
            Keyboard.status[key] = 2;
        } else if (Keyboard.status[key] == 3) {
            Keyboard.status[key] = 0;
        }
    }
}



