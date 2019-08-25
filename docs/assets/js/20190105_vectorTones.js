// 20190105_vectorTones00

let canvas;
let clickCount = 0;

let xStart;
let yStart;

// draw help info or not
let bDrawInfo = true;

// to hold our Soundline objects
let soundLines = [];
// all audio through the limiter then master out
let limiter = new Tone.Limiter( -1 ).toMaster();

let currentScale = scales.majorFreq.c;
let freqLines = [];  // probably could get rid of this soon
let freqLinear = [];

// collect test points
let collected;

// synth UI controls
 var dial_mod;
 let dial_harmonicity;

// sound line class
// constructor takes two vectors - start and end
class SoundLine {

    constructor( start, end ) {

        this.sVec = start;
        this.eVec = end;

        this.pos = start.copy(); // have to copy a vector
        this.pct = 0;
        this.speed = 0.01;
        this.dir = 1;

        this.freq = this.getFrequency();
        console.log( "Sound line freq: " + this.freq );
        this.synth = new Tone.FMOscillator( this.freq, "sine", "sine" ).connect( limiter ).start();
        this.synth.volume.value = -60;

        //console.log( "Sound line freq: " + this.freq );

    }

    update() {

        // update position of circle along the line
        this.pct += this.speed * this.dir;

        if ( this.pct > 1 ) {

            this.pct = 0;

        }

        if ( this.pct < 0 ) {

            this.pct = 1;

        }

        // this.posX = ( 1 - this.pct ) * this.sVec.x + this.pct * this.eVec.x;
        // this.posY = ( 1 - this.pct ) * this.sVec.y + this.pct * this.eVec.y

        // using vector math!
        p5.Vector.add(
            p5.Vector.mult( this.sVec, ( 1 - this.pct ) ),
            p5.Vector.mult( this.eVec, this.pct ),
            this.pos
        );

        // update frequency and volume of synth
        this.synth.frequency.value = this.getFrequency();
        this.synth.volume.exponentialRampTo( map( this.pos.y, 0, 1, -10, -60 ), 0.005 );

    }

    draw() {

        // draw the line the node will follow
        stroke( 0, 255, 0 );
        line( this.sVec.x * width, this.sVec.y * height, this.eVec.x * width, this.eVec.y * height );

        // draw the moving sound 'node'
        fill( 100, 0, 255 );
        ellipse( this.pos.x * width, this.pos.y * height, 10, 10 );

        // draw the line's end points
        fill( 255, 200, 0 );
        ellipse( this.sVec.x * width, this.sVec.y * height, 10, 10 );
        ellipse( this.eVec.x * width, this.eVec.y * height, 10, 10 );

    }

    getFrequency() {

        // get the frequency of a linear distributed musical scale
        // scale frequecies are assummed to be loaded in an array
        // and linearly mapped to the canvas
        // but this only really works with a scale over 6 octaves

        let octaves = 6;
        // get mouse X position
        // and figure our "how far" the press is into the entire musical scale
        // PROBLEM, space on either side of the grid.

        // mouseMapped takes a normalised point and maps it to the grid space
        let mouseMapped = map( this.pos.x, 0, 1, 0-freqLinear[0], width );

        // co takes the mapped poistion and maps the press to the scale step
        let scaleStep = ( mouseMapped / freqLinear[ freqLinear.length-1 ] ) * ( 12 * octaves );

        //points mapped linear takes co to get the frequency at that sale step
        let f = Math.pow( 2, scaleStep/12 ) * currentScale[0];

        return f;

    }

}

//--begin-of-program-setup----------------------------------------
function setup() {

    canvas = createCanvas( windowWidth, 800 );
    canvas.mousePressed( collectPoint );

    console.log( "currentScale: " + currentScale );

    dial_mod = Nexus.Add.Dial( '#controls', {
        'size': [50, 50],
        'min': 0,
        'max': 200,
        'step': 0.1
    } );

    dial_mod.on( 'change', function( v ) {

        console.log( "dial: " + v );

        for ( let i = 0; i < soundLines.length; i++ ) {

            let target = soundLines[ i ].synth.modulationIndex;
            target.value = v;
        }

    } );

    dial_harmonicity = Nexus.Add.Dial( '#controls', {
        'size': [50, 50],
        'min': 0,
        'max': 20,
        'step': 0.01
    } );

    dial_harmonicity.on( 'change', function( v ) {

        console.log( "dial: " + v );

        for ( let i = 0; i < soundLines.length; i++ ) {

            let target = soundLines[ i ].synth.harmonicity;
            target.value = v;
        }

    } );

    getGridLines();

}

function draw() {

    background( 25 );

    //display frequency scale guide in a given key (cMaj for now)
    for ( let i = 0; i < freqLinear.length; i++ ) {

        // strokeWeight( 0.4 );
        // stroke( 0, 200, 0 );
        // line( freqLines[ i ], 0, freqLines[ i ], height );

        strokeWeight( 0.5 );
        stroke( 225, 0, 0 );
        line( freqLinear[ i ], 0, freqLinear[ i ], height );

    }

    // update and draw SoundLines
    for ( let i = 0; i < soundLines.length; i++ ) {

        soundLines[ i ].update();
        soundLines[ i ].draw();

    }

    if ( typeof collected === "object" ) {

        fill( 255, 200, 0 );
        ellipse( collected.x * width, collected.y * height, 10, 10 );

    }

    if ( bDrawInfo )
    {
        drawHelp();
    }

}

function collectPoint() {

    clickCount++;

    let clickMod = clickCount % 2;
    console.log( "clicks: " + clickCount );
    console.log( "Even or odd: " + clickMod );

    // even clicks set end point and creates soundline
    if ( clickMod === 0 ) {

        soundLines.push( new SoundLine(
            createVector( xStart, yStart ),
            createVector( mouseX / width, mouseY / height )
        ) );

    }

    // odd clicks set start point
    if ( clickMod === 1 ) {

        // needs to be a percent of screen dim (in case of resizing)
        xStart = mouseX / width;
        yStart = mouseY / height;

        collected = createVector( mouseX / width, mouseY / height );

    }

}

function drawHelp() {

    fill( 255, 255, 255, 50 );
    rect( 100, 100, 300, 300 );

    stroke( 255, 255, 255 );
    text("Draw lines by clicking on the grid", 115, 115);

}

function windowResized() {

    resizeCanvas( windowWidth, 800 );
    getGridLines();

}

function getGridLines() {

    // map the scale frequencies to the screen
    for ( let i = 0; i < currentScale.length; i++ ) {

        //stright mapping (looks exponential)
        freqLines[ i ] = map( currentScale[ i ] , 0, 5000, 0, width );

        // try to map it to look linear on the screen
        freqLinear[ i ] = map( Math.log( currentScale[ i ] ) + ( i/12 ), 12/3, 12, 0, width );

    }

}

function keyPressed() {

    console.log( keyCode );

    switch( keyCode ) {

        case 81 : // q
            // remove last soundLine
            if ( soundLines.length >= 1 ) {

                // grab the synth
                let target = soundLines[ soundLines.length - 1 ].synth;
                //ramp synth volume to zero
                target.volume.exponentialRampTo( -60, 0.3 );
                // stop oscillator
                target.stop();
                // dispose it
                target.dispose();
                // remove object from array
                soundLines.pop();

            } else {

                break;

            }

            collected = 0;

            break;

        case 82 : // r

            if ( soundLines.length >= 1 ) {

                soundLines[ soundLines.length - 1 ].dir *= -1;

            }

            break;

        case 187 : // =

            if ( soundLines.length >= 1 ) {

                soundLines[ soundLines.length - 1 ].speed += 0.002;

            }

            break;

        case 189 : // -

            if ( soundLines.length >= 1 ) {

                ( soundLines[ soundLines.length - 1 ].speed <= 0 )
                    ? soundLines[ soundLines.length - 1 ].speed
                    : soundLines[ soundLines.length - 1 ].speed -= 0.001;

            }

            break;

        default:
            bDrawInfo = !bDrawInfo;
            break;


    }

}
