"use strict"

let frequencies = [ 65.41, 73.42, 82.41, 87.31, 98.0, 110.0, 123.47,
    130.81, 146.83, 164.81, 174.61, 196.00, 220.0, 246.94,
    261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88,
    532.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77,
    1046.50, 1174.66, 1318.51, 1396.91, 1567.98, 1760.00, 1975.53,
    2093.00, 2349.32, 2637.02, 2793.83, 3135.96, 3520.00, 3951.07,
    4186.01 ];

let limiter = new Tone.Limiter( -1 ).toMaster();

let canvas;

let freqEmitter;

class FreqDrop {

    constructor( _x, _y, _freq, _sp ) {

        this.x = _x;
        this.y = _y;
        this.diameter = 20;
        this.freq = _freq;
        this.sp = _sp;
        this.isDead = 0;

        this.col = {

            r: 150,
            g: 150,
            b: 150,
            a: 100

        }

    }

    update() {

        if ( this.y >= windowHeight ) this.isDead = 1;
        if ( this.isDead === 0 ) this.y += this.sp;

    }

    draw() {

        push();
        translate( this.x, this.y );
        noStroke();
        fill( this.col.r, this.col.g, this.col.b, this.col.a );
        ellipse( 0, 0, this.diameter );
        fill( 255 );
        text( this.freq, -20, 0 );
        pop();

    }

    isInside() {

        let mouseVec = createVector( mouseX, mouseY );
        let centerVec = createVector( this.x, this.y );

        let distance = p5.Vector.dist( mouseVec, centerVec );
        if ( distance < this.diameter/2 ) { return true; }

        return false;

    }

};

class DropSynth {

    constructor( _x, _y, _f ) {

        this.sx = _x;
        this.sy = _y;
        this.sRotation = 180;
        this.sDiameter = 75;
        this.sMaxDiameter = 250;
        this.sAddr;
        this.sFreq = _f;

        this.synth = new Tone.Oscillator( this.sFreq, 'sine' ).connect( limiter );
        this.synth.volume.value = -60;
        this.synth.start();

        this.updateAddr();

    }

    update() {

        const prevRotation = this.sRotation;
        this.sRotation += this.sAdder;
        while ( this.sRotation > TWO_PI ) this.sRotation -= TWO_PI;

        if ( prevRotation !== this.sRotation ) {

            let v = -50 * sin( this.sRotation * 0.5 ) - 10;
            this.synth.volume.rampTo( v, 0.01 );

        }

    }

    draw() {

        push();
        translate( this.sx, this.sy );
        rotate( this.sRotation );

        noFill();
        strokeWeight( 2 );
        stroke( 100 );
        ellipse( 0, 0, this.sDiameter );

        noStroke();
        fill( 255, 0, 0 );
        ellipse( 0, -this.sDiameter/2, 15 );
        pop();

    }

    updateAddr() {

        // this.adder = map( this.diameter, 20, this.maxDiameter, 0.5, 0 );
        this.sAdder = map( this.sDiameter, 20, this.sMaxDiameter, 1.5, 0 );
        // this.synth.volume.value = map ( this.sDiameter, 10, this.sMaxDiameter, -60, -1 );
    }

    isInside() {

        let mouseVec = createVector( mouseX, mouseY );
        let centerVec = createVector( this.sx, this.sy );

        let distance = p5.Vector.dist( mouseVec, centerVec );
        if ( distance < this.sDiameter/2 ) { return true; }

        return false;

    }

    updateSize() {

        let difference = mouseY - pmouseY;
        this.sDiameter += difference;

        if ( this.sDiameter > this.sMaxDiameter ) this.sDiameter = this.sMaxDiameter;
        if ( this.sDiameter < 10 ) this.sDiameter = 10;

        this.updateAddr();

    }

};

class FreqEmitter {

    constructor() {

        this.rate = 0.01;
        this.addCount = 0;
        this.drops = [];
        this.synths = [];

    }

    createDrop() {

        let xPos = random( 100, windowWidth-100 );
        let yPos = -1;
        let frequency = random( frequencies );
        let speed = random( 0.001, 5 );
        this.drops.push( new FreqDrop( xPos, yPos, frequency, speed ) );

    }

    createSynth( index ) {

        let drop = this.drops[ index ];
        // let temp = new DropSynth( drop.x, drop.y, drop.freq )
        this.synths.push( new DropSynth( drop.x, drop.y, drop.freq ) );


    }

    addToCount() {

        this.addCount += this.rate;
        if ( this.addCount >= 1.0 ) {

            this.createDrop();
            this.addCount = 0;

        }

    }

    updateDrops() {

        this.addToCount();

        // check if Dead
        for ( let i = this.drops.length-1; i >= 0; i-- ) {

            if ( this.drops[i].isDead === 1 ) {

                // this.drops.push( this.drops.splice( i, 1 )[0] );
                // this.drops.pop();
                this.removeDrop( i );

            }

        }

        // update and draw the ones that arent dead
        for ( let i = 0; i < this.drops.length; i++ ) {

            this.drops[i].update();
            this.drops[i].draw();

        }

    }

    updateSynths() {

        for ( let i = 0; i < this.synths.length; i++ ) {

            this.synths[i].update();

        }

    }

    drawSynths() {

        for ( let i = 0; i < this.synths.length; i++ ) {

            this.synths[i].draw();

        }

    }

    drawDrops() {

        for ( let i = 0; i < this.drops.length; i++ ) {

            this.drops[i].draw();

        }

    }

    checkIfInDrop() {

        for ( let i = this.drops.length-1; i >= 0; i-- ) {

            if ( this.drops[i].isInside() ) {

                let dropColor = this.drops[i].col;
                dropColor.r = 255;
                dropColor.g = 0;
                dropColor.b = 0;

                this.createSynth( i );
                this.removeDrop( i );

            }

        }

    }

    checkIfInSynth() {

        for ( let i = 0; i < this.synths.length; i++ ) {

            if ( this.synths[ i ].isInside() ) {

                this.synths[ i ].updateSize();

            }

        }

    }

    removeDrop( index ) {

        this.drops.push( this.drops.splice( index, 1 )[0] );
        this.drops.pop();

    }

};

//===============================/

function setup() {

    canvas = createCanvas( windowWidth, windowHeight );
    freqEmitter = new FreqEmitter();

}

function draw() {

    background( 25 );

    freqEmitter.updateDrops();
    freqEmitter.updateSynths();

    freqEmitter.drawDrops();
    freqEmitter.drawSynths();

}


function windowResized() {

    resizeCanvas( windowWidth, windowHeight );

}

function mousePressed() {

    freqEmitter.checkIfInDrop();

}

function mouseDragged() {

    freqEmitter.checkIfInSynth();

}

function shapedMap( mapMe , inMin, inMax, outMin, outMax, shaper ) {

    let pct = map( mapMe, inMin, inMax, 0, 1 );
    pct = pow( pct, shaper );
    return map( pct, 0, 1, outMin, outMax, true );

}

// function keyPressed() {
//
//     if ( key === "l" ) {
//
//         console.log( "Synths:: " + freqEmitter.synths );
//         console.log( "Drops:: " + freqEmitter.drops );
//     }
//
//     if ( key === "s") {
//
//         for ( let i = 0; i < freqEmitter.synths.length; i++ ) {
//
//             console.log( "synth " + i + ":: " + freqEmitter.synths[ i ].sFreq );
//         }
//     }
//
//     if ( key === "d") {
//
//         for ( let i = 0; i < freqEmitter.drops.length; i++ ) {
//
//             console.log( "drops " + i + ":: " + freqEmitter.drops[ i ] );
//         }
//     }
// }
