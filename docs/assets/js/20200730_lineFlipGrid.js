'use strict';

class VerticalRotator {

    constructor( xPos, yPos, to, ll, speed, idee ) {
        this.lineLength = ll;
        this.rotationDirection = 1;
        this.origin = { x: xPos , y: height };
        this.flip = false;
        // this.count = height / yPos; // 0 at height
        // count of how many flips to go to reset back to origin
        // how many flips until reset
        // FUR = yPos / lineLength
        // maxflips = height / lineLength
        // starting flip count = maxflips - FUR
        this.count = ( height / ll ) - ( yPos / ll );

        this.resetTime = millis() - to;
        this.startAngle = 0;// sa;
        this.change = PI; // - this.startAngle;
        this.duration = speed; // lerp time in seconds
        this.rotation = 0;
        this.timeOffset = to;
        this.id = idee;

        //moving x point in quad during ccw rotation (flip = true)
        // value gets added to
        this.quadMovingX = this.lineLength;

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
                // this.duration = 2;
            }

        }
    }

    draw() {

        // push();

        let translatedX = this.origin.x;
        let translatedY = this.origin.y - ( this.lineLength * this.count );
        // translate( this.origin.x, this.origin.y - ( this.lineLength * this.count ) );
        let rotatedLinePoints = rotatePointsByAngle( 0, 0 + this.lineLength, this.rotation );

        let rtX = rotatedLinePoints.x + translatedX;
        let rtY = rotatedLinePoints.y + translatedY;

        if ( this.flip ) { // ccw

            if ( rtY > translatedY ) {

                fill( 0, 0, 255, 100 );
            }
            else {
                fill( 255, 0, 0, 100 );
            }
            noStroke();
            quad( translatedX, translatedY,
                translatedX + this.lineLength, translatedY,
                rtX + this.lineLength, rtY,
                rtX, rtY
            );

        }
        else { //cw

            if ( rtY > translatedY ) {

                fill( 255, 0, 0, 100 );
            }
            else {
                fill( 0, 0, 255, 100 );
            }
            noStroke();
            quad( translatedX, translatedY,
                translatedX + this.lineLength, translatedY,
                rtX + this.lineLength, rtY,
                rtX, rtY
            );
        }

        strokeWeight( 2 );
        stroke( 255 );
        line( translatedX, translatedY, rtX, rtY );

        // pop();
    }

};

class HorizontalRotator {

    constructor( xPos, yPos, to, ll, speed, idee ) {
        this.lineLength = ll;
        this.rotationDirection = 1;
        this.origin = { x: width , y: yPos };
        this.flip = false;
        // count of how many flips to go to reset back to origin
        // how many flips until reset
        // FUR = yPos / lineLength
        // maxflips = height / lineLength
        // starting flip count = maxflips - FUR
        this.count = ( width / ll ) - ( xPos / ll );

        this.resetTime = millis() - to;
        this.startAngle = 0;// sa;
        this.change = PI; // - this.startAngle;
        this.duration = speed; // lerp time in seconds
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
                // this.duration = 2;
            }
        }
    }

    draw() {

        // push();

        let translatedX = this.origin.x - ( this.lineLength * this.count );
        let translatedY = this.origin.y;
        // translate( this.origin.x, this.origin.y - ( this.lineLength * this.count ) );
        let rotatedLinePoints = rotatePointsByAngle( 0 + this.lineLength, 0, this.rotation );

        let rtX = rotatedLinePoints.x + translatedX;
        let rtY = rotatedLinePoints.y + translatedY;

        if ( this.flip ) { // ccw

            if ( rtX > translatedX ) {

                fill( 0, 255, 0, 100 );
            }
            else {
                fill( 255, 150, 0, 100 );
            }

            noStroke();
            quad( translatedX, translatedY,
                 translatedX, translatedY + this.lineLength,
                 rtX, rtY + this.lineLength,
                 rtX, rtY
            );

        }
        else { //cw

            if ( rtX > translatedX ) {

                fill( 255, 150, 0, 100 );
            }
            else {
                fill( 0, 255, 0, 100 );
            }

            noStroke();
            quad( translatedX, translatedY,
                 translatedX, translatedY + this.lineLength,
                 rtX, rtY + this.lineLength,
                 rtX, rtY
            );
        }

        strokeWeight( 2 );
        stroke( 255 );
        line( translatedX, translatedY, rtX, rtY );

        // pop();
    }

};


// = = == = ==  = = = == = = = = == = = = = == = = =  = = ==
// = = === = = = = === = = = == == == = = = = = = = = = ===
// = = = == == = = == = = = = = = = = = = = = = = = = = ==
//

let verticalLines = [];
let horizontalLines = [];

let defaultLength = 50.0;

function setup() {

    createCanvas( 800, 800 );

    for ( let i = 0; i < 128; i++ ) {

        let index = i;
        let startTimeOffset = index;

        verticalLines.push( new VerticalRotator(
                            Math.floor( random( width / defaultLength ) ) * defaultLength,
                            Math.floor( random( height / defaultLength ) ) * defaultLength,
                            startTimeOffset, defaultLength, random( 0.5, 8 ), index
                        ) );

        horizontalLines.push( new HorizontalRotator(
                                Math.floor( random( width / defaultLength ) ) * defaultLength,
                                Math.floor( random( height / defaultLength ) ) * defaultLength,
                                startTimeOffset, defaultLength, random( 0.5, 8 ), index
                            ) );

    }

    // for ( let y = 0; y <= height; y += defaultLength ) {
    //
    //     for ( let x = 0; x <= width; x += defaultLength ) {
    //
    //         let index = ( x / defaultLength )  + ( (y / defaultLength) * (width / defaultLength ) );
    //         let startTimeOffset = x * 1;
    //         verticalLines.push( new VerticalRotator( x, y, startTimeOffset, defaultLength, index ) );
    //
    //     }
    // }

}

function draw() {

    background( 0, 255 );

    blendMode( SCREEN );

    for ( let i = 0; i < verticalLines.length; i++ ) {

        verticalLines[i].update();
        verticalLines[i].draw();

        let maxFlipCount = height / verticalLines[i].lineLength;
        if ( verticalLines[i].count > ( height / verticalLines[i].lineLength ) ) {

            verticalLines[i].origin.y = height;
            verticalLines[i].count = 0;
        }
    }

    for ( let i = 0; i < horizontalLines.length; i++ ) {

        horizontalLines[i].update();
        horizontalLines[i].draw();

        let maxFlipCount = height / horizontalLines[i].lineLength;
        if ( horizontalLines[i].count > ( width / horizontalLines[i].lineLength ) ) {

            horizontalLines[i].origin.x = width;
            horizontalLines[i].count = 0;
        }
    }

    blendMode( BLEND );

}

// Time, Begin, total Change, Duration
function easeInOutQuad( t, b, c, d ) {

    if ( ( t /= d/2 ) < 1 ) return c/2 * t * t + b;
    return -c/2 * ( ( --t ) * ( t - 2 ) - 1 ) + b;

}

function rotatePointsByAngle( x, y, angle ) {

    // positive angles will rotate x,y points cw around the origin
    // negative will rotate ccw
    // angle of 0 points to the right ( x positive )
    //
    let rotatedPoints = {
        x : ( x * Math.cos( angle ) ) - ( y * Math.sin( angle ) ) ,
        y : ( x * Math.sin( angle ) ) + ( y * Math.cos( angle ) )
    };

    return rotatedPoints;

}
