Sound = {};

Sound.scale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

Sound.songs = {
    'testing' : [
//       Note , style  
//       C D E F G A B
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
        [ , , , , , ,1], // -    |
        [ , , , , ,1, ], // -----|
        [ , , ,1, , , ], // -    |
        [ ,1, , , , , ], // --   |
        [ , , , , , , ]  // -    |
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