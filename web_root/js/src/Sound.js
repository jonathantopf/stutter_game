Sound = {};

Sound.scale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

Sound.scale_ids = {};

for (var i = 0; i < Sound.scale.length; i++)
{
    Sound.scale_ids[Sound.scale[i]] = i;
}

// NOTE: ONLY ONE NOTE PER LINE
// SONGS MUST START AND END WITH BLANK LINE

Sound.songs = {
    'testing' : [
//       Note , style  
//       C D E F G A B
        [ , , , , , , ], // -    |
        [1, , , , , , ], // -----| 
        [ ,1, , , , , ], // -    |
        [ , ,1, , , , ], // --   |
        [ , , ,1, , , ], // -    |
        [ , , , ,1, , ], // ---- | 
        [ , , , , ,1, ], // -    |
        [ , , , , , ,1], // --   |
        [ , , , , ,1, ], // -    |
        [ , , , ,1, , ], // ---  | 
        [ , , ,1, , , ], // -    |
        [ , ,1, , , , ], // --   |
        [ ,1, , , , , ], // -    |
        [1, , , , , , ], // ---- | 
        [ , ,1, , , , ], // -    |
        [ , , , ,1, , ], // --   |
        [ , , , , , , ], // -    |
    ]
};               

// notes from http://www.phy.mtu.edu/~suits/notefreqs.html
// c is c6

Sound.synth = {
    'C' : T("tri", {freq:1046.50}),
    'D' : T("tri", {freq:1174.66}),
    'E' : T("tri", {freq:1318.51}),
    'F' : T("tri", {freq:1396.91}),
    'G' : T("tri", {freq:1567.98}),
    'A' : T("tri", {freq:1760.00}), 
    'B' : T("tri", {freq:1975.53})
};


Sound.stopAll = function ()
{
    for (var i = 0; i < Sound.scale.length ; i++)
    {
        Sound.synth[Sound.scale[i]].pause();
    }
}