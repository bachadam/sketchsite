'use strict';

let canvasHeight = 600;
let canvasWidth = 600;


const NUM_GRAINS = 600;


let emitter;

class GrainEmitter {

    constructor() {

        this.grains = [];
        this.hits = [];
        this.addCounter = 0;
        this.boundry = 400;
        this.grainDur = 0.1001;
        this.pbMax = 1;
        this.pbMin = 1;
        this.synth = new Tone.GrainPlayer( {

            'url': './samples/01/1_edit.wav',
            'loop': 'true',
            'grainSize': this.grainDur,
            'overlap': 0.09

        } ).toMaster();

        this.synth.start( );

    }

    createGrain() {

        this.grains.push( {

            xPos: 0,
            yPos: 0,
            size: 3,
            moveVec: {
                x: Math.sin( millis() * 6.00001 ),
                y: Math.cos( millis() * 6.00 )
            },
            isAlive: true

        } );

    }

    createHit( x, y ) {

        const a = Math.atan2( y, x );

        this.hits.push( {

            xPos: x,
            yPos: y,
            life: 255,
            angle: a

        } );

        const ls = map( a, -PI, PI, 0, this.synth.buffer.duration );
        // let le = ls + 0.015;
        const dTune = Math.floor( Math.random() * 10 - 5 );
        const pbr = 1 * ( Math.random() * (this.pbMax - this.pbMin) + this.pbMin );//  Math.random( 0.1, 2 );

        this.synth.loopStart = ls;
        this.synth.loopEnd = ls + 0.02;
        this.synth.detune = dTune;
        this.synth.playbackRate = pbr;

    }

    update() {

        //this.addCounter = 0;

        for ( let i = 0; i < this.grains.length; i++ ) {

            // update  position
            this.grains[i].yPos += this.grains[i].moveVec.y;
            this.grains[i].xPos += this.grains[i].moveVec.x;

            // still in boundry?
            const distance = () => {

                let center = createVector( 0, 0 );
                let position = createVector( this.grains[i].xPos, this.grains[i].yPos );

                return p5.Vector.dist( center, position );

            };

            if ( distance() >= this.boundry/2 ) {

                this.grains[i].isAlive = false;

                // create a hit if at boundry
                this.createHit( this.grains[i].xPos, this.grains[i].yPos );

            }

        }

        // remove if dead
        for ( let i = this.grains.length-1; i >= 0; --i ) {

            if ( !this.grains[i].isAlive ) {

                // this.removeGrain( i );

                this.grains.push( this.grains.splice( i, 1 )[0] );
                this.grains.pop();

                this.addCounter += 1;

            }

        }

        while ( this.addCounter > 0 ) {

            this.createGrain();
            this.addCounter--;

        }

        // update hits

        for ( let i = 0; i < this.hits.length; i++ ) {

            this.hits[i].life -= ( 255 / 10 );

        }

    }

    // removeGrain( index ) {
    //
    //     this.grains.push( this.grains.splice( index, 1 )[0] );
    //     this.grains.pop();
    //
    //     this.addCounter += 1;
    //
    // }

    draw() {

        stroke( 255, 120 );
        for ( let i = 0; i < this.grains.length; i++ ) {

            push();
            translate( this.grains[i].xPos, this.grains[i].yPos );
            point( 0, 0 );
            pop();

        }

        // draw hits
        for ( let i = 0; i < this.hits.length; i++ ) {
            noStroke();
            fill( 255, 0, 0, this.hits[i].life );

            push();
            translate( this.hits[i].xPos, this.hits[i].yPos );
            // point( 0, 0 );
            ellipse( 0, 0, 4 );
            pop();

            stroke( 255, 0, 0, 50 );
            strokeWeight( 1 );
            line( 0, 0, this.hits[i].xPos, this.hits[i].yPos );

            // arc( 0, 0, this.boundry/2, this.boundry/2, 0, this.hits[i].angle );

        }

        // draw boundry
        // push()
        // translate( canvasWidth/2, canvasHeight/2 );
        // noFill();
        // stroke( 255, 0, 0 );
        // ellipse( 0, 0, this.boundry );
        // pop();

    }

    removeHits() {

        for ( let i = this.hits.length-1; i >= 0; --i ) {

            if ( this.hits[i].life <= 0 ) {

                this.hits.push( this.hits.splice( i, 1 )[0] );
                this.hits.pop();

            }

        }


    }

};

function setup() {

    frameRate( 50 );

    createCanvas( 600, 600 );

    emitter = new GrainEmitter();

    for ( let i = 0; i < NUM_GRAINS; i++ ) {

        emitter.createGrain();

    }

}

function draw() {

    background( 0 );

    emitter.update();

    push();
    translate( width/2, height/2 );
    emitter.draw();
    pop();

    emitter.removeHits();

    // fill( 255 );
    // noStroke();
    // text( frameRate().toFixed(2), 25,25 );

}

function mouseMoved() {

    const playbackRateMax = map( mouseX, 0, windowWidth, 0.1, 2.0);
    const playbackRateMin = map( mouseY, 0, windowHeight, 0.1, 2.0 );

    emitter.pbMax = playbackRateMax;
    emitter.pbMin = playbackRateMin;

}

function mousePressed() {

    for ( let i = 0; i < emitter.grains.length; i++ ) {

        emitter.grains[i].isAlive = false;

    }

    emitter.pbMax = 1;
    emitter.pbMin = 1;

}
