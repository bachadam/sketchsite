
let scales = {

    majorScales: {

        cMajor: [ "C1", "D1", "E1", "F1", "G1", "A1", "B1",
            "C2", "D2", "E2", "F2", "G2", "A2", "B2",
            "C3", "D3", "E3", "F3", "G3", "A3", "B3",
            "C4", "D4", "E4", "F4", "G4", "A4", "B4",
            "C5", "D5", "E5", "F5", "G5", "A5", "B5",
            "C6", "D6", "E6", "F6", "G6", "A6", "B6",
            "C7", "D7", "E7", "F7", "G7", "A7", "B7",
            "C8" ],

        dMajor: [ "D1", "E1", "F#1", "G1", "A1", "B1", "C#2",
            "D2", "E2", "F#2", "G2", "A2", "B2", "C#3",
            "D3", "E3", "F#3", "G3", "A3", "B3", "C#4",
            "D4", "E4", "F#4", "G4", "A4", "B4", "C#5",
            "D5", "E5", "F#5", "G5", "A5", "B5", "C#6",
            "D6", "E6", "F#6", "G6", "A6", "B6", "C#7",
            "D7", "E7", "F#7", "G7", "A7", "B7", "C#7",
            "D8" ]

    },

    majorFreq: {

        c: [ 65.41, 73.42, 82.41, 87.31, 98.0, 110.0, 123.47,
            130.81, 146.83, 164.81, 174.61, 196.00, 220.0, 246.94,
            261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88,
            532.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77,
            1046.50, 1174.66, 1318.51, 1396.91, 1567.98, 1760.00, 1975.53,
            2093.00, 2349.32, 2637.02, 2793.83, 3135.96, 3520.00, 3951.07,
            4186.01 ]

    },

    cMajor: [ "C1", "D1", "E1", "F1", "G1", "A1", "B1",
        "C2", "D2", "E2", "F2", "G2", "A2", "B2",
        "C3", "D3", "E3", "F3", "G3", "A3", "B3",
        "C4", "D4", "E4", "F4", "G4", "A4", "B4",
        "C5", "D5", "E5", "F5", "G5", "A5", "B5",
        "C6", "D6", "E6", "F6", "G6", "A6", "B6",
        "C7", "D7", "E7", "F7", "G7", "A7", "B7",
        "C8" ],

    dMajor: [ "D1", "E1", "F#1", "G1", "A1", "B1", "C#2",
        "D2", "E2", "F#2", "G2", "A2", "B2", "C#3",
        "D3", "E3", "F#3", "G3", "A3", "B3", "C#4",
        "D4", "E4", "F#4", "G4", "A4", "B4", "C#5",
        "D5", "E5", "F#5", "G5", "A5", "B5", "C#6",
        "D6", "E6", "F#6", "G6", "A6", "B6", "C#7",
        "D7", "E7", "F#7", "G7", "A7", "B7", "C#7",
        "D8" ]

};

const majorFreq = {

    cFreq: [ 65.41, 73.42, 82.41, 87.31, 98.0, 110.0, 123.47,
        130.81, 146.83, 164.81, 174.61, 196.00, 220.0, 246.94,
        261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88,
        532.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77,
        1046.50, 1174.66, 1318.51, 1396.91, 1567.98, 1760.00, 1975.53,
        2093.00, 2349.32, 2637.02, 2793.83, 3135.96, 3520.00, 3951.07,
        4186.01 ]

}


// full major scales
let cMaj = [ "C1", "D1", "E1", "F1", "G1", "A1", "B1",
             "C2", "D2", "E2", "F2", "G2", "A2", "B2",
             "C3", "D3", "E3", "F3", "G3", "A3", "B3",
             "C4", "D4", "E4", "F4", "G4", "A4", "B4",
             "C5", "D5", "E5", "F5", "G5", "A5", "B5",
             "C6", "D6", "E6", "F6", "G6", "A6", "B6",
             "C7", "D7", "E7", "F7", "G7", "A7", "B7",
             "C8" ];

let csharpMaj = [ "C#1", "D#1", "F1", "F#1", "G#1", "A#1", "C1",
                  "C#2", "D#2", "F2", "F#2", "G#2", "A#2", "C2",
                  "C#3", "D#3", "F3", "F#3", "G#3", "A#3", "C3",
                  "C#4", "D#4", "F4", "F#4", "G#4", "A#4", "C4",
                  "C#5", "D#5", "F5", "F#5", "G#5", "A#5", "C5",
                  "C#6", "D#6", "F6", "F#6", "G#6", "A#6", "C6",
                  "C#7", "D#7", "F7", "F#7", "G#7", "A#7", "C7",
                  "C#8" ];

let dMaj = [ "D1", "E1", "F#1", "G1", "A1", "B1", "C#1",
             "D2", "E2", "F#2", "G2", "A2", "B2", "C#2",
             "D3", "E3", "F#3", "G3", "A3", "B3", "C#3",
             "D4", "E4", "F#4", "G4", "A4", "B4", "C#4",
             "D5", "E5", "F#5", "G5", "A5", "B5", "C#5",
             "D6", "E6", "F#6", "G6", "A6", "B6", "C#6",
             "D7", "E7", "F#7", "G7", "A7", "B7", "C#7",
             "D8" ];

let dsharpMaj = [ "D#1", "F1", "G1", "G#1", "A#1", "C2", "D2",
                  "D#2", "F2", "G2", "G#2", "A#2", "C3", "D3",
                  "D#3", "F3", "G3", "G#3", "A#3", "C4", "D4",
                  "D#4", "F4", "G4", "G#4", "A#4", "C5", "D5",
                  "D#5", "F5", "G5", "G#5", "A#5", "C6", "D6",
                  "D#6", "F6", "G6", "G#6", "A#6", "C7", "D7",
                  "D#7", "F7", "G7", "G#7", "A#7", "C8", "D8",
                  "D#8" ];

let eMaj = [ "E1", "F#1", "G#1", "A1", "B1", "C#2", "D#2",
             "E2", "F#2", "G#2", "A2", "B2", "C#3", "D#3",
             "E3", "F#3", "G#3", "A3", "B3", "C#4", "D#4",
             "E4", "F#4", "G#4", "A4", "B4", "C#5", "D#5",
             "E5", "F#5", "G#5", "A5", "B5", "C#6", "D#6",
             "E6", "F#6", "G#6", "A6", "B6", "C#7", "D#7",
             "E7", "F#7", "G#7", "A7", "B7", "C#8", "D#8",
             "E8" ];

let fMaj = [ "F1", "G1", "A1", "A#1", "C2", "D2", "E2",
             "F2", "G2", "A2", "A#2", "C3", "D3", "E3",
             "F3", "G3", "A3", "A#3", "C4", "D4", "E4",
             "F4", "G4", "A4", "A#4", "C5", "D5", "E5",
             "F5", "G5", "A5", "A#5", "C6", "D6", "E6",
             "F6", "G6", "A6", "A#6", "C7", "D7", "E7",
             "F7", "G7", "A7", "A#7", "C8", "D8", "E8",
             "F8" ];

let fsharpMaj = [ "F#1", "G#1", "A#1", "B1", "C#2", "D#2", "F2",
                  "F#2", "G#2", "A#2", "B2", "C#3", "D#3", "F3",
                  "F#3", "G#3", "A#3", "B3", "C#4", "D#4", "F4",
                  "F#4", "G#4", "A#4", "B4", "C#5", "D#5", "F5",
                  "F#5", "G#5", "A#5", "B5", "C#6", "D#6", "F6",
                  "F#6", "G#6", "A#6", "B6", "C#7", "D#7", "F7",
                  "F#7", "G#7", "A#7", "B7", "C#8", "D#8", "F8",
                  "F#8" ];

let gMaj = [ "G1", "A1", "B1", "C2", "D2", "E2", "F#2",
             "G2", "A2", "B2", "C3", "D3", "E3", "F#3",
             "G3", "A3", "B3", "C4", "D4", "E4", "F#4",
             "G4", "A4", "B4", "C5", "D5", "E5", "F#5",
             "G5", "A5", "B5", "C6", "D6", "E6", "F#6",
             "G6", "A6", "B6", "C7", "D7", "E7", "F#7",
             "G7", "A7", "B7", "C8", "D8", "E8", "F#8",
             "G8" ];

let gsharpMaj = [ "G#1", "A#1", "C2", "C#2", "D#2", "F2", "G2",
                  "G#2", "A#2", "C3", "C#3", "D#3", "F3", "G3",
                  "G#3", "A#3", "C4", "C#4", "D#4", "F4", "G4",
                  "G#4", "A#4", "C5", "C#5", "D#5", "F5", "G5",
                  "G#5", "A#5", "C6", "C#6", "D#6", "F6", "G6",
                  "G#6", "A#6", "C7", "C#7", "D#7", "F7", "G7",
                  "G#7", "A#7", "C8", "C#8", "D#8", "F8", "G8",
                  "G#8" ];

let aMaj = [ "A1", "B1", "C#2", "D2", "E2", "F#2", "G#2",
             "A2", "B2", "C#3", "D3", "E3", "F#3", "G#3",
             "A3", "B3", "C#4", "D4", "E4", "F#4", "G#4",
             "A4", "B4", "C#5", "D5", "E5", "F#5", "G#5",
             "A5", "B5", "C#6", "D6", "E6", "F#6", "G#6",
             "A6", "B6", "C#7", "D7", "E7", "F#7", "G#7",
             "A7", "B7", "C#8", "D8", "E8", "F#8", "G#8",
             "A8" ];

let asharpMaj = [ "A#1", "C2", "D2", "D#2", "F2", "G2", "A2",
                  "A#2", "C3", "D3", "D#3", "F3", "G3", "A3",
                  "A#3", "C4", "D4", "D#4", "F4", "G4", "A4",
                  "A#4", "C5", "D5", "D#5", "F5", "G5", "A5",
                  "A#5", "C6", "D6", "D#6", "F6", "G6", "A6",
                  "A#6", "C7", "D7", "D#7", "F7", "G7", "A7",
                  "A#7", "C8", "D8", "D#8", "F8", "G8", "A8",
                  "A#8" ];

let bMaj = [ "B1", "C#2", "D#2", "E2", "F#2", "G#2", "A#2",
             "B2", "C#3", "D#3", "E3", "F#3", "G#3", "A#3",
             "B3", "C#4", "D#4", "E4", "F#4", "G#4", "A#4",
             "B4", "C#5", "D#5", "E5", "F#5", "G#5", "A#5",
             "B5", "C#6", "D#6", "E6", "F#6", "G#6", "A#6",
             "B6", "C#7", "D#7", "E7", "F#7", "G#7", "A#7",
             "B7", "C#8", "D#8", "E8", "F#8", "G#8", "A#8",
             "B8" ];


// minor scales

// major arpeggios

// minor arpeggios