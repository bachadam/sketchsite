// mute button added
// good to go?

let canvas;
let animate = false;
let tinyPi;

let gridWidth = 7;
let gridHeight = 6;

let faders = [];

let hiPass = new Tone.Filter( 55, "highpass", -12 ).toMaster();
let loPass = new Tone.Filter( 5000, "lowpass", -12 ).connect( hiPass );
let limiter = new Tone.Limiter( -6.0 ).connect( loPass );

// select a scale from the musicalScales.js
let cMajScale = cMaj.slice( 7, cMaj.length );

// gui stuff
let mute = false;

let volumeSlider;

function setup() {

    console.log( "copy start: " + cMajScale );
    tinyPi = TWO_PI / 1000;

    canvas = createCanvas( 750, 700 );
    canvas.mousePressed( toggleAnimate );

    volumeSlider = createSlider( -60, 5, -10, 0.1 );
    volumeSlider.position( 10, canvas.height + 5 );
    let cWidthStr = String( canvas.width ) + 'px';
    volumeSlider.style( 'width', cWidthStr );
    volumeSlider.mouseReleased( changeVolume );

    console.log( 'Init volumeSlider:' + volumeSlider.value() );
    Tone.Master.volume.value = volumeSlider.value();

    // Create the Fader objects
    for ( let x = 0; x < gridWidth; x++ ) {
        for ( let y = 0; y < gridHeight; y++ ) {

            let noteIndex = x + y * gridWidth;
            let frequency = cMajScale[ noteIndex ];
            console.log(
                "note: " + frequency
                + " at " + noteIndex
            );

            let xPosition = 70 + x * 100;
            let yPosition = 100 + y * 100;
            let fadeSpeed = random( 0.005, 0.1 );
            let circleColor = color( random( 255 ), random( 255 ), random( 255 ) );
            let tempFader = new Fader(
                xPosition, yPosition, fadeSpeed, circleColor, frequency
            );
            tempFader.synth.volume.value = -100;
            faders.push( tempFader );

            // cMajScale.splice( noteIndex, 1 );

        }

    }

}


function changeVolume() {

    console.log( volumeSlider.value() );
    Tone.Master.volume.exponentialRampTo( volumeSlider.value(), 0.1 );

}

function draw() {

    background( 50 );

    for ( let i = 0; i < faders.length; i++ ) {

        if ( animate ) {

            faders[ i ].update();

        }

        faders[ i ].draw();

    }

}

class Fader {

    constructor( xloc, yloc, speed, col, f ) {

        this.x = xloc;
        this.y = yloc;
        this.sp = speed;
        this.c = col;
        this.freq = f;

        this.synth = new Tone.Oscillator( this.freq, "sine" ).connect( limiter ).start();

        this.perceptualMaxCo = Math.pow( ( this.synth.frequency.value * 0.0002 ) * 10, 2 );
        this.maxVol = random( -15, -1 );
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
        this.destVol = map( this.angle, 0, TWO_PI, -30, this.maxVol, true ) - this.perceptualMaxCo;

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

function toggleAnimate() {

    animate =! animate;

    if ( animate ) {

        scramble();

    }

}

function scramble() {

    for ( let i = 0; i < faders.length; i++ ) {

        faders[ i ].sp = random( 0.0015, 0.25 );
        faders[ i ].maxVol = random( -15, -4 );
        faders[ i ].arcSize = map( faders[ i ].maxVol, -30, -4, 10, 150 );
        faders[ i ].c = color( random( 255 ), random( 255 ), random( 255 ) );

    }

    console.log( "SCRAMBLE!" );

}
