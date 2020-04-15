'use strict';

const NUM_GRAINS = 720;

let emitter;

class GrainEmitter {

    constructor() {

        this.grains = [];
        this.hits = [];
        this.addCounter = 0;
        this.boundry = 200;

    }

    createGrain( i ) {

        this.grains.push( {

            xPos: 0,
            yPos: 0,
            col: {
                r: 180 + 180 * Math.sin( map( i, 0, NUM_GRAINS, 0, PI ) ),
                g: 60 + 40 * Math.cos( map( i , 0, NUM_GRAINS, 0, PI ) ),
                b: 70 + 30 * Math.sin(  map( i , 0, NUM_GRAINS, 0, PI/2 ) )
            },
            moveVec: {
                x: Math.cos( millis() * TWO_PI ),
                y: Math.sin( millis() * TWO_PI * 1.01 )
            },
            isAlive: true,
            direction: 1

        } );

    }

    createHit( angle ) {

        // const a = Math.atan2( y, x );

        this.hits.push( {

            xPos: this.boundry * Math.cos( angle ),
            yPos: this.boundry * Math.sin( angle ),
            life: 100,
            angle: angle

        } );

    }

    update() {

        for ( let i = 0; i < this.grains.length; i++ ) {

            // update  position
            this.grains[i].yPos += this.grains[i].moveVec.y * this.grains[i].direction;
            this.grains[i].xPos += this.grains[i].moveVec.x * this.grains[i].direction;

            // still in boundry?
            const distance = () => {

                let center = createVector( 0, 0 );
                let position = createVector( this.grains[i].xPos, this.grains[i].yPos );

                return p5.Vector.dist( center, position );

            };

            const d = distance();
            if ( d >= this.boundry || d < 0  ) {

                // turn around
                this.grains[i].direction *= -1;

            }

            // reset if dead
            if ( !this.grains[i].isAlive ) {

                this.grains[i].xPos = 0;
                this.grains[i].yPos = 0;
                this.grains[i].moveVec.x =  Math.sin( millis() * 6.00001 );
                this.grains[i].moveVec.y = Math.cos( millis() * 6.00 );
                this.grains[i].isAlive = true

            }

        }

    }

    draw() {

        // draw hits
        for ( let i = 0; i < this.hits.length; i++ ) {

            stroke( 360, 100, 100, 0);
            strokeWeight( 2 );

            fill(
                this.grains[i].col.r,
                this.grains[i].col.g,
                this.grains[i].col.b,
                0.02
            )
            triangle(
                this.hits[i].xPos,this.hits[i].yPos,
                this.grains[i].xPos, this.grains[i].yPos,
                this.grains[ ( this.grains.length - 1 ) - i ].xPos, this.grains[ ( this.grains.length - 1 ) - i ].yPos
            );

        }

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

    colorMode( HSB );
    blendMode( SOFT_LIGHT );
    frameRate( 30 );

    createCanvas( 600, 600 );

    emitter = new GrainEmitter();

    // create grains
    for ( let i = 0; i < NUM_GRAINS; i++ ) {

        emitter.createGrain( i );

        // create hit... one for every grain

        const a = map( i, 0, NUM_GRAINS, -PI, PI );
        emitter.createHit( a );

    }

}

function draw() {

    background( 0 );

    emitter.update();

    push();
    translate( width/2, height/2 );
    emitter.draw();
    pop();

}
