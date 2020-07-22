'use strict'

const NUM_GRAINS = 25;
const vectors = [];
const synths = [];

const radius = 100;

function setup() {

    createCanvas( 1200, 800, WEBGL );
    colorMode( HSB, 1 );
    blendMode( ADD );
    noLights();

    camera( 0, 0, 100, 0, 0, 0, 0, 1, 0 );

    let gl = document.getElementById( 'defaultCanvas0' ).getContext('webgl');
    gl = document.getElementById('defaultCanvas0').getContext('webgl');
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);

    background( 25 );

    let parts = [];
    let parts2 = [];
    for ( let i = 0; i < NUM_GRAINS; i++ ) {

        let angle = map( i , 0, NUM_GRAINS, 0.0001, TWO_PI );
        vectors.push( {
            vec: createVector( Math.sin(angle) + 0.1, Math.cos(angle), Math.cos( i + PI + 0.3 ) ),
            pos: createVector( 0, 0, 0 )
        } );

        parts.push( Math.sin(angle) * 0.5 + 0.5 );
        parts2.push( Math.cos(angle) * 0.5 + 0.5 );

        const tempSynth = new Tone.Oscillator( 100 + (i*50), "sine").toMaster();
        tempSynth.volume.value = -76.0;
        tempSynth.start();

        synths.push( tempSynth );
    }

}

function draw() {

    orbitControl();
    background( 0,0,0, .71 );

    for ( let i = 0; i < vectors.length; i++ ) {

        const v0 = vectors[i];

        // check bounds
        const origin = createVector( 0, 0, 0 );
        const dist = p5.Vector.dist( v0.pos, origin );
        if ( dist > radius ) v0.vec.mult( -1 );

        v0.pos.add( v0.vec );

        const vol = map( dist, 0, radius, -76.0, -20.0 );
        synths[i].volume.linearRampTo( vol, 0.001 );

    }

    noStroke();
    let alpha = 0.82;

    beginShape( TRIANGLE_FAN );
    for ( let i = 0; i < vectors.length; i++ ) {

        const i0 = 0 + i;
        const i1 = parseInt( (vectors.length/4 + i) % (vectors.length-1), 10 );
        const i2 = parseInt( (vectors.length/2 + i) % (vectors.length-1), 10 );

        const v0 = vectors[ i0 ]; // 0
        const v1 = vectors[ i1 ]; // 1/4
        const v2 = vectors[ i2 ]; // 1/2

        const angle = map( i, 0, NUM_GRAINS, 0, Math.PI*2 );

        const r = 0.4 + 0.4 * Math.cos( angle );
        const g = 0.75 + 0.25 * Math.cos( angle - 0.5 );
        const b = 0.75 + 0.25 * Math.sin( angle + 0.30 );

        fill( r, 0, 0, alpha );
        vertex( v0.pos.x, v0.pos.y, v0.pos.z );
        fill( r, 0, 0, alpha );
        curveVertex( v1.pos.x, v1.pos.y, v1.pos.z );
        fill( r, 1, 1, alpha );
        curveVertex( v2.pos.x, v2.pos.y, v2.pos.z );

    }
    endShape();

}
