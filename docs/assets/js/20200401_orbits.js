"use strict"

let NUM_SAMPS = 10;
let NUM_ORBITS = 12;

let orbits = [];
let soundFiles = [];
let colors = [];
let shuffleMe = [];

let reverb;

let verbSettings = {

    sec: 3,
    dec: 2,
    rev: false,
    dry: 0

};

let Orbit = {

    diameter: 0,
    speed: 0,
    rotation: 0,
    playState: false,
    update: function() {

        this.rotation = ( this.rotation + this.speed ) % TWO_PI;

    },
    draw: function( c ) {

        push();
        translate( width / 2, height / 2 );
        rotate( this.rotation );
        noFill();
        if ( this.playState ) {

            strokeWeight( 6 );
            stroke( c );

        } else {

            strokeWeight( 2 );
            stroke( 100 );

        }

        ellipse( 0, 0, this.diameter, this.diameter );

        noStroke();
        fill( c );
        ellipse( 0, -this.diameter/2, 15, 15 );
        pop();

    },
    playSound: function() {

        if ( this.rotation > 6.0 || this.rotation < 0.2 ) {

            this.playState = true;
            // this.fillColor = this.playColor;

        } else {

            this.playState = false;
            // this.fillColor = { r:160, g:160, b:160 };

        }
    }

};

function preload() {

    for ( let i = 0; i < NUM_ORBITS; i++ ) {

        let sampleIndex = i % NUM_SAMPS;
        let soundFile = loadSound( '../samples/01/' + sampleIndex + '.wav',
                                function() {

                                    console.log( "Loaded Samplefile "
                                        + i
                                        + " with file index "
                                        + sampleIndex
                                    );
                                    soundFile.playMode( 'untilDone' );
                                    soundFile.setVolume( 0.2 );
                                    soundFiles.push( soundFile );

                                },

                                function() {

                                    console.log( "error" );

                                }

        );

    }

}

function setup() {

    createCanvas( 1000, 650 );

    initUI();

    // create some orbits & colors
    for ( let i = 0; i < NUM_ORBITS; i++ ) {

        let r = random( 255 );
        let g = random( 255 );
        let b = random( 255 );

        let orbit = Object.create( Orbit );
        orbit.idee = i;
        orbit.playColor = {

            r:random(100, 255),
            g:random(100, 255),
            b:random(100, 255)

        };
        orbit.diameter = 50 * (i + 1);
        orbit.speed = 0.001 * (i + 1);
        orbit.rotaion = 0;

        orbits.push( orbit );
        colors.push( color( r, g, b ) );
        shuffleMe.push(i);

    }

    masterVolume( 0.97 );
    reverb = new p5.Reverb();

    for ( let i = 0; i < soundFiles.length; i++ ) {

        soundFiles[i].disconnect();
        reverb.process(soundFiles[i], 3, 2 );

    }

    reverb.amp(0.7);

}

function draw() {

    background( 25 );

    for ( let i = 0; i < orbits.length; i++ ) {

        let index = shuffleMe[i];

        orbits[i].update();
        orbits[i].playSound();

        if ( orbits[i].playState ) {

            if ( soundFiles[index].isPlaying() ) {

                orbits[i].playState = false;

            }

            soundFiles[index].play();
        }

        orbits[i].draw( colors[index] );

    }

    let dryWet = constrain( map( mouseX, 0, width, 0, 1 ), 0, 1 );
    // 1 = all reverb, 0 = no reverb
    reverb.drywet( dryWet );

}

function initUI() {

    // orbit Speed
    let dial_orbitSpeed = Nexus.Add.Dial( '#controls', {

        'size': [50, 50],
        'min': 0.00001,
        'max': .01,
        'step': 0.00001,
        'value': 0.001

    } );

    dial_orbitSpeed.on( 'change', function( v ) {

        for ( let i = 0; i < orbits.length; i++ ) {

            orbits[i].speed = v * (i + 1);

        }

    } );

    // scramble button

    let button_scramble = Nexus.Add.Button( '#controls', {

        'size': [50, 50],
        'mode': 'button',
        'state': 'false'

    } );

    button_scramble.on( 'change', function( v ) {

        if ( v ) {

            shuffle( shuffleMe, true );
        }

    } );

    // verb UI
    let dial_verbSec = Nexus.Add.Dial( '#reverb-controls', {

        'size': [40, 40],
        'min': 0,
        'max': 10,
        'step': 0.01,
        'value': 3

    } );

    dial_verbSec.on( 'change', function( v ) {

        verbSettings.sec = v;
        onVerbChange();

    } );

    let dial_verbDecay = Nexus.Add.Dial( '#reverb-controls', {

        'size': [40, 40],
        'min': 0,
        'max': 100,
        'step': 1,
        'value': 2

    } );

    dial_verbDecay.on( 'change' , function( v ) {

        verbSettings.dec = v;
        onVerbChange();

    } );

    let toggle_verbRev = Nexus.Add.Toggle( '#reverb-controls', {

        'size': [40, 20],
        'state': false

    } );

    toggle_verbRev.on( 'change', function( v ) {

        verbSettings.rev = v;
        onVerbChange();

    } );

}

function onVerbChange() {

    reverb.set( verbSettings.sec, verbSettings.dec, verbSettings.rev );

}
