'use strict';

class RotationLine {

    constructor( xPos, yPos, to, ll, idee ) {

        this.lineLength = ll;
        this.rotationDirection = 1;
        this.origin = { x: xPos , y: height };
        this.flip = false;
        // count of how many flips to go to reset back to origin
        // how many flips until reset
        // FUR = yPos / lineLength
        // maxflips = height / lineLength
        // starting flip count = maxflips - FUR
        this.count = ( height / ll ) - ( yPos / ll );

        this.resetTime = millis() - to;
        this.startAngle = 0;// sa;
        this.change = PI; // - this.startAngle;
        this.duration = 2; // lerp time
        this.rotation = 0;
        this.timeOffset = to;
        this.id = idee;

    }

    update() {

        let time = ( millis() - this.resetTime ) * 0.001;
        let prevRotation = this.rotation;

        if ( this.flip ) {

            this.rotation = easeInOutQuad( time, this.startAngle, this.change, this.duration );

            if ( this.rotation > prevRotation ) {
                this.count++;
                this.flip = false;
                this.rotation = 0;
                this.change = PI;
                this.resetTime = millis();
            }

        }
        else {

            this.rotation = easeInOutQuad( time, this.startAngle, this.change, this.duration );

            if ( this.rotation < prevRotation ) {
                this.count++;
                this.flip = true;
                this.startAngle = 0;
                this.rotation = 0;
                this.change = -PI;
                this.resetTime = millis();
                this.duration = 2;
            }

        }
    }

    draw() {

        push();

        translate( this.origin.x, this.origin.y - ( this.lineLength * this.count ) );
        rotate( this.rotation * this.rotationDirection );

        strokeWeight( 4 );
        stroke( 255 );
        line( 0, 0, 0, this.lineLength );

        // strokeWeight( 1 );
        // fill( 255, 0, 0 );
        // text( this.id, 5, 0 );
        // fill( 255, 0, 0 );
        // ellipse(0, 0, 6, 6);

        pop();
    }

};

let ourLines = [];
let defaultLength = 50.0;

function setup() {

    createCanvas( 800, 800 );

    for ( let y = 0; y <= height; y += defaultLength ) {

        for ( let x = 0; x <= width; x += defaultLength ) {

            let index = ( x / defaultLength )  + ( (y / defaultLength) * (width / defaultLength ) );
            let startTimeOffset = x * 1;
            ourLines.push( new RotationLine( x, y, startTimeOffset, defaultLength, index ) );

        }
    }

}

function draw() {

    background( 0 );

    for ( let i = 0; i < ourLines.length; i++ ) {
        ourLines[i].update();
        ourLines[i].draw();

        let maxFlipCount = height / ourLines[i].lineLength;
        if ( ourLines[i].count > ( height / ourLines[i].lineLength ) ) {
            ourLines[i].origin.y = height;
            ourLines[i].count = 0;
        }
    }

}

// need vectors for this?
//
// d = duration
// b = begin poition
// c = change in position
// t time

function easeInOutQuad( t, b, c, d ) {

    if ( ( t /= d/2 ) < 1 ) return c/2 * t * t + b;
    return -c/2 * ( ( --t ) * ( t - 2 ) - 1 ) + b;

}
