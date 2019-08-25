// This seems to be good for now
// add text labels
let canvas;
let tinyPi;

let faders = [];

let loPass = new Tone.Filter( 4000, "lowpass", -12 ).toMaster();
let limiter = new Tone.Limiter( -6.0 ).connect( loPass );

// select a scale from the musicalScales.js
let cMajScale = cMaj.slice( 7, cMaj.length );

let startButton;

function setup() {

    console.log( "Pitches: " + cMajScale );
    console.log( "pitch length:" + cMajScale.length );

    canvas = createCanvas( 750, 600 );
    tinyPi = TWO_PI / 1000;

}

function startAudio() {

    console.log( "tone" );
}

function draw() {

    background( 50 );

    for ( let i = 0; i < faders.length; i++ ) {

        faders[ i ].update();
        faders[ i ].draw();

    }

}

function createFader() {

    console.log( mouseX );

    let noteIndex = Math.round(
        map( mouseX, 0, width, 0, cMajScale.length - 1, true )
    );
    console.log( "Index: " + noteIndex );

    let frequency = cMajScale[ noteIndex ];
    let fadeSpeed = random( 0.005, 0.1 );
    let circleColor = color( random( 255 ), random( 255 ), random( 255 ) );
    let maxVolume = map( mouseY, 0, height, -1, -15, true );

    let tempFader = new Fader(
        mouseX, mouseY, fadeSpeed, circleColor, frequency, maxVolume
    );
    tempFader.synth.volume.value = -100;
    faders.push( tempFader );

    console.log(
        "Created Fader with pitch of " + frequency
        + " at volume of " + maxVolume
    );

}

function mousePressed() {

    if ( mouseX <= width && mouseY <= height ) {

        createFader();

    }

}

function keyPressed() {

    switch( key ) {

        case 'Q' :

            if ( faders.length >= 1 ) {

                faders[ faders.length-1 ]
                    .synth.volume.exponentialRampTo( -60, 0.1 );
                faders[ faders.length-1 ].synth.stop();
                faders[ faders.length-1 ].synth.dispose();
                faders.pop();

            } else {

                break;

            }

        break;

    }

}

class Fader {

    constructor( xloc, yloc, speed, col, f, mv) {

        this.x = xloc;
        this.y = yloc;
        this.sp = speed;
        this.c = col;
        this.freq = f;

        this.synth = new Tone.Oscillator( this.freq, "sine" ).connect( limiter ).start();

        // this.perceptualMaxCo = ( this.synth.frequency.value / 20000 ) * 100.0;
        this.perceptualMaxCo = Math.pow( ( this.synth.frequency.value * 0.0002 ) * 10, 2 );
        this.maxVol = mv;
        this.arcSize = map( this.maxVol, -30, -4, 10, 150 );
        this.angle = tinyPi;
        this.direction = 1.0;

        console.log( this.perceptualMaxCo );
    }

    update() {

        // figure out the rotation angle
        this.angle += this.sp * this.direction;

        // check cirle boundires
        if ( this.angle > TWO_PI - tinyPi ) {

            this.angle = TWO_PI - tinyPi;
            this.direction *= -1;

        }

        if ( this.angle < tinyPi ) {

            this.angle = tinyPi;
            this.direction *= -1;
        }

        // set osc vol
        this.destVol = map( this.angle, 0, TWO_PI, -45, this.maxVol, true ) - this.perceptualMaxCo;

        // ramp to it
        this.synth.volume.exponentialRampTo( this.destVol, 0.001 );

    }

    draw() {

        noStroke();
        for (let i = 5; i < this.arcSize; i += 5 ) {

            fill( red( this.c ), green( this.c ), blue( this.c ), 10 );
            arc( this.x, this.y, i, i, 0, this.angle );

        }

        push();
        let lineLength = this.arcSize * 0.45;
        stroke( 210, 0, 200 );
        strokeWeight( 4 );
        translate( this.x, this.y );
        rotate( this.angle );
        line( 0 - lineLength, 0, 0 + lineLength, 0 );
        pop();

    }

}

function scramble() {

    for ( let i = 0; i < faders.length; i++ ) {

        faders[ i ].sp = random( 0.0015, 0.2 );
        faders[ i ].maxVol = random( -15, -4 );
        faders[ i ].arcSize = map( faders[ i ].maxVol, -30, -4, 10, 150 );
        faders[ i ].c = color( random( 255 ), random( 255 ), random( 255 ) );

    }

    console.log( "SCRAMBLE!" );

}
