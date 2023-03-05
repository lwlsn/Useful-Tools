// const osc = new Tone.Oscillator(440, "sine").toDestination().start();

// Ideas maybe add/change effects when tapping twice ? 
// To do-- equalise all waveforms ? 
// Add master volume slider.. 


// Define Variables for the Sound Generation
let masterVolume = -9;
let ready=false;
let wave;
let tempoSlider;

let synth, amsynth, duosynth, memsynth, metalsynth, plucksynth;
let numSynths = 6;

let sourceButton;
let buttonChanger = 0; 

// Variables for the effects
let reverb, delay, cheby;
let reverbAmount, delayAmount, chebyAmount;

// Variables for the sequencer
let w,h;
let maxW = 16, maxH = 16;

let bCount, baseTime;
let baseNote =40;
let chord = [], addChord = [0,2,4,7,9];
let st = [];
let bright = [];
let speed = 1000.0/8.0;// ??

let oscillator1;

let startButton,startSequencer = false;

let xOffset, yOffset;

let page = 0; 
let font=[];
let num = 80;

let backgroundImg;

function preload() {
	font[0] = loadFont("assets/FiraSans-ExtraBold.otf");
 	font[1] = loadFont("assets/RubikBubbles-Regular.ttf");
	backgroundImg = loadImage("assets/background-still.png");
}


function setup() {

	
	createCanvas(windowWidth, windowHeight);
	textFont(font[1]);
	startContext();
	loadSynth();
	loadEffects();
	loadElements();
	// changeBaseWaveform();
	loadNotes();


	// Initialise parameters
	w = (width*0.5)/maxW;
	h = (height*0.5)/maxH;
	bCount=0;
	baseTime=0;
	xOffset = width/12, yOffset= height*(4/12);

	print(w,h);

	//Initialise step sequence matrices
	for (let i=0; i< maxW; i++) {
		st[i]=[];
		bright[i] =[];
		for (let j=0; j < maxH; j++) {
			st[i][j]=0;
			bright[i][j]=0;
		}
	}
	// background("#043D76");
	image(backgroundImg, 0, 0, width, height);
	fill("#043D76");
	stroke(255);
  
  
	if (width > height) {
		  size = width / 6;
	  } else if (width < height) {
		  size = height / 4;
	  }
  
		
	smooth();
	textFont(font[1]);
	textAlign(CENTER , CENTER);
	textSize(size/4);
  
  

}

function draw() {

	if (page == 0) {

		frameRate(10);
    	let string = "USEFUL SYNTHESISER";
    	let string2 = "Press to start...";
    
    // Main Body
    rectMode(CENTER);
    rect(width/2, height/2, width-width/6, height-height/6);
  
    shiverAnimate(string, height/3);
    shiverAnimate(string2, height/2)

	}

	else if (page >= 1){

	
	image(backgroundImg, 0, 0, width, height);


	// Main Body
	fill("#043D76");
	stroke(255);
    rectMode(CENTER);
    rect(width/2, height/2, width*(10/12), height*(10/12));


	clockCount();
	showElements();
	writeText();


	if (ready) {
		// do audiostuff
		// osc.frequency.value = map(mouseX, 0, width, 110, 880); // A->A
		drawWaveform(wave, width*(1/6), -height/3);
	

	for (let i=0; i<maxW; i++) {
		for (let j=0; j< maxW; j++) {
			push();
			translate(xOffset,yOffset);
			translate(i*w+w/2, j*h+w/2);
			if (st[i][j] == 1) {
				noStroke();
				fill(255, 50+200*bright[i][j]);
				rectMode(CENTER);
				rect(0, 0, 20, 20);
			} else {
				noFill();
				strokeWeight(2);
				stroke(255, 50);
				rotate(radians(45));
          		rectMode(CENTER);
          		rect(0, 0, 15, 15, 2);
			}
			pop();
			bright[i][j]*=0.99;
		}
	}


	// Draw Line According to bCOUNT
	rectMode(CORNER);
 	noStroke();
  	fill(255, 255, 255, 200);
	push();
	translate(xOffset,0);
	fill(255);
	// ellipse(bCount%(maxW) * w+w/2, height/2, 50)
  	rect(bCount%(maxW) * w+w/2, yOffset, 4, (height*0.5)+20);
	pop();

} else {
	fill(255);
	noStroke();
	textAlign(CENTER, CENTER);
	textSize(48);
	text("USEFUL SYNTHESISER", width/2, height/2-100);
	textSize(24);
	text("Click to start...", width/2, height/2);
}
}

		
}


function mousePressed() {
	page = 1;
	if (!ready) {
		ready = true;
	  }


	for (let i=0; i < maxW; i++) {
		for (let j=0; j < maxH; j++) {
			if (overRect(i*w+xOffset, j*h+yOffset, w, h)) {
				st[i][j] = !st[i][j];
				for (let k=0; k < maxH; k++) {
					if (j!=k) st[i][k]=0;
				}
			}
		}
	}
}

function deviceTurned() {
	if (turnAxis === 'X') {

		resizeCanvas(windowWidth, windowHeight);

	}
	
}
