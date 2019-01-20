
// 20181220_cubeOfCubes.js

let canvas;
let h = 255;

function setup() {

    canvas = createCanvas( 800, 800, WEBGL );
    colorMode( HSB, 255 );

    let lightColor = color( 30, 30, 90 );
    let lightDirection = createVector( 0, 1500, 300 );
    ambientLight( 30, 40, 45 );
    directionalLight( lightColor, lightDirection );

    let pointColor = color( 12, 70, 150 );
    let pointDir = createVector( 0, 0, 1000 );
    pointLight( pointColor, pointDir );

}

function draw() {

    background( 28 );

    let t = frameCount * 0.001;

    drawCubes();

}

function drawCubes() {

    let t = frameCount * 0.001;

    let gridWidth = 200;
    let gridHeight = 200;
    let gridDepth = 300;
    let spacing = 5;
    let size = 15;

    push();
    rotateX( PI + PI * cos( t ) );

    for ( let x = 0; x < gridWidth; x += size ) {
        for ( let y = 0; y < gridHeight; y+= size ) {
            for ( let z = 0; z < gridDepth; z += size ) {

                let h =  255 * noise( sin( t * ( x*0.04 ) ),
                    cos(t * ( y * 0.05 ) ),
                    cos( tan( t * ( t + x * 0.03 ) ) )
                );

                let boxColor = color( h, 255, 200, 170 );
                specularMaterial( boxColor );
                noStroke();

                let xPos = gridWidth * ( ( sin( ( t * 0.1 + x )
                    * ( t * 0.1 + x ) ) )
                    * sin( ( t * 0.1 + x ) )
                );
                let yPos = gridHeight * ( ( cos( ( t * 0.1 + y )
                    * ( t * 0.1 + y ) ) )
                    * cos( ( t * 0.1 + y ) )
                );
                let nz;
                let zPos = ( gridDepth + gridDepth * sin( t * 2) )
                    * ( 1 - 2 * ( noise( sin( t * 20 + z ), z ) )
                );

                push();
                    translate( xPos, yPos, zPos );
                    box( size, size );
                pop();

            }

        }

    }

    pop();

}
