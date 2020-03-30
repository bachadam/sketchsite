

let imgs = [];

function setup() {

	let container = createDiv();
	container.style( 'border', '0px' );
	container.style( 'padding', '0px' );
	container.style( 'margin', '0px' );
	container.style( 'position', 'absolute' );
	container.style( 'top', '10px' );
	container.style( 'left', '10px' );

    for ( let i = 0; i < manhattanCams.length; i++ ) {

        let img = createImg( 'http://207.251.86.238/cctv'
							+ manhattanCams[i]
							+'.jpg',
							'camera'
							);
        img.size( 340, 240 );

		img.style( 'padding', '0px' );
		img.style( 'margin', '-5px' );
		img.style( 'border', '0px' );

		imgs.push( img );

		container.child( img );

    }

	frameRate( 0.25 );

}

function draw() {

	for ( let i = 0; i < imgs.length; i++ ) {

		let url = imgs[ i ].elt.src;
		imgs[ i ].elt.src = url;

	}

}

// timedRefresh(1000);

function timedRefresh(time) {
	setTimeout( draw() , time );
	// setTimeout("location.reload(true);", time);
}
