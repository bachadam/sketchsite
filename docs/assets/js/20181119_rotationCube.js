
function setup() {

  createCanvas( 600, 600, WEBGL );

}

function draw() {

  background( 25 );

  push();

    translate(0, 0, -200 );
    rotateY( frameCount * 0.005 );
    rotateX( frameCount * 0.002 );
    noFill();
    stroke( 255 );
    strokeWeight( 2 );

    push();

        rotateZ( TWO_PI / 8 );
        rotateY( frameCount * -0.01 );

        push();

            rotateX( TWO_PI / 8 );
            rotateY( frameCount * 0.015 )

            push();

                rotateZ( TWO_PI / 8 );
                rotateY( TWO_PI / 8 );
                rotateY( frameCount * -0.02 );
                // fill( 0, 255, 0, 10);
                box( 100, 100, 100 );

            pop();

            // fill( 255, 0, 0, 10 );
            box(200, 200, 200);

        pop();

        // fill( 0, 0, 255, 10 );
        box( 300, 300, 300 );

    pop();

    // fill( 255, 255, 0, 10 );
    box( 400, 400, 400 );

  pop();

}
