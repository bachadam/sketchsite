// 20181218_sticks.js
let canvas;
let synthWidth = 6;
let synthHeight = 6;

let voicesLength = synthWidth * synthHeight;
let synthVoices = [];

let keyOffset = 36;

//equal temperment c-maj
let pitches = [ 130.81, 146.83, 164.81, 174.61, 196.00, 220.0,
    246.94, 261.63, 293.66, 329.63, 349.23, 392.00,
    440.00, 493.88, 532.25, 587.33, 659.25, 698.46,
    783.99, 880.00, 987.77, 1046.50, 1174.66, 1318.51,
    1396.91, 1567.98, 1760.00, 1975.53, 2093.00, 2349.32,
    2637.02, 2793.83, 3135.96, 3520.00, 3951.07, 4186.01
    ];

let notes = [ 0, 2, 4, 5, 7, 9, 11,
    12, 14, 16, 17, 19, 21, 23,
    24, 26, 28, 29, 31, 33, 35,
    36, 38, 40, 41, 43, 45, 47,
    48, 50, 52, 53, 55, 57, 59,
    60
];

let compressor = new Tone.Compressor( -10, 20 ).toMaster();

let reverb = new Tone.Freeverb( 0.9, 3000 )
    .receive( "reverb" )
    .connect( Tone.Master );
reverb.wet.value = 0.3;

let hiPassFilter = new Tone.Filter( 100, "highpass", -48 ).connect( compressor );
let loPassFilter = new Tone.Filter( 2000, "lowpass", -48 ).connect( hiPassFilter );

function setup() {

    canvas = createCanvas( 1000, 1000 );

    for ( let i = 0; i < voicesLength; i++ ) {

        let synth = new Tone.Synth( {

            oscillator: {
                type: "triangle"
            },
            envelope: {
                attack: 0.002,
                decay: 0.1,
                sustain: 0.4,
                release: 1
            }

        } ).connect( loPassFilter );

        let vol = 8 * ( -1 - ( i * 0.08 ) );  // voicesLength = 36
        synth.volume.value = vol;

        synth.send( "reverb", -10 );

        synthVoices[ i ] = synth;

    }

}

function draw() {

    background( 40 );

    let t = frameCount;

    push();
    translate( 30, 50 );

    for ( let  y = 0; y < synthWidth; y++ ) {
        for ( let x = 0; x < synthWidth; x++ ) {

            let index = x + y * synthWidth;
            let offset = ( ( 1.0 + y ) + ( x * 4 ) );
            let speed = map( mouseX, 0, width, 0, 0.009, true );
            let rotation = TWO_PI/4 * cos( t * offset * speed );
            let str = rotation.toFixed( 23 );

            let length = height / 12;

            push();
            translate( x * 150 + length, y * 150 + length );
            rotate( rotation, 0, 0, 1 );

            stroke( 255 );
            strokeWeight( 2 );
            line( 0 - length, 0, length, 0 );

            if ( rotation >= ( TWO_PI/4 - 0.004  ) || rotation <= -( TWO_PI/4 - 0.002  ) ) {

                stroke( 0, 255, 0 );
                fill( 0, 255, 0 );

                // using array
                // let freq = pitches[ index ];

                // using equation
                let note = notes[ index ] + keyOffset;
                let freq = 440.0 * Math.pow( 2, ( ( note - 49 ) / 12 ) );

                if ( synthVoices[ index ].oscillator.state == "stopped" ) {

                    synthVoices[ index ].triggerAttackRelease( freq, "8n" );

                }

            } else {

                stroke( 255 );

            }

            text( str, 0 - length, 0 );
            pop();

        }

    }

    pop();

    let keyStr = "Key:: " + keyOffset;
    let info = "Press 'O' to lower key, 'P' for raise."
    fill( 58, 189, 102, 150 );
    text( info, 20, 20 );

}

function keyPressed() {

    console.log( key );

    if ( key === 'O' ) {

        keyOffset--;

    }

    if ( key === 'P' ) {

        keyOffset++;

    }

}
