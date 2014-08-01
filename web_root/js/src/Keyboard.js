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
    'a'     : 0,
    's'     : 0,
    'd'     : 0,
    'f'     : 0,
    'g'     : 0,
    'h'     : 0,
    'j'     : 0,
    'down'  : 0,
    'up'    : 0,
    'enter' : 0
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
        if (Keyboard.status['a'] == 0)
        {
            Keyboard.status['a'] = 1;
        }
    break;
    case 83: //s
        if (Keyboard.status['s'] == 0)
        {
            Keyboard.status['s'] = 1;
        }
    break;
    case 68: //d
        if (Keyboard.status['d'] == 0)
        {
            Keyboard.status['d'] = 1;
        }
    break;
    case 70: //f
        if (Keyboard.status['f'] == 0)
        {
            Keyboard.status['f'] = 1;
        }
    break;
    case 71: //g
        if (Keyboard.status['g'] == 0)
        {
            Keyboard.status['g'] = 1;
        }
    break;
    case 72: //h
        if (Keyboard.status['h'] == 0)
        {
            Keyboard.status['h'] = 1;
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
        if (Keyboard.status['a'] == 2)
        {
            Keyboard.status['a'] = 3;
        }
    break;
    case 83: //s
        if (Keyboard.status['s'] == 2)
        {
            Keyboard.status['s'] = 3;
        }
    break;
    case 68: //d
        if (Keyboard.status['d'] == 2)
        {
            Keyboard.status['d'] = 3;
        }
    break;
    case 70: //f
        if (Keyboard.status['f'] == 2)
        {
            Keyboard.status['f'] = 3;
        }
    break;
    case 71: //g
        if (Keyboard.status['g'] == 2)
        {
            Keyboard.status['g'] = 3;
        }
    break;
    case 72: //h
        if (Keyboard.status['h'] == 2)
        {
            Keyboard.status['h'] = 3;
        }
    break;
    case 74: //j
        if (Keyboard.status['j'] == 2)
        {
            Keyboard.status['j'] = 3;
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



