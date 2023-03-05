function loadElements() {

  startButton = createButton("");
  startButton.position(width*(4/48), height*(5/48));
  // startButton.style('background-color', "#FFFAFF");  
  // startButton.style("width", "100px");
  // startButton.style("height", "50px");
  startButton.addClass("play-btn");
  startButton.hide();
    
  // To do-- scale with height/width 
  reverbAmount = createSlider(0, 1, 0.1, 0.01);
  reverbAmount.position(width*(15/24),  height*(15/24));
  reverbAmount.addClass("slider");
  reverbAmount.hide();

  delayAmount = createSlider(0, 1, 0.1, 0.01);
  // delayAmount.style("width", "150px");
  delayAmount.position(width*(19/24),  height*(15/24));
  delayAmount.addClass("slider");
  delayAmount.hide();

  chebyAmount = createSlider(0,1,0.1, 0.01);
  chebyAmount.position(width*(17/24),  height*(18/24));
  chebyAmount.addClass("slider");
  chebyAmount.hide();

  sourceButton = createButton("Source");
  sourceButton.position(width*(15/24),  height*(4/12));
  sourceButton.addClass("src-btn");
  sourceButton.mousePressed(changeSource);
  sourceButton.hide();

  tempoSlider=createSlider(62.5, 125, 62.5, 0.5);
  tempoSlider.position(width*(19/24), height*(9/24));
  tempoSlider.addClass("slider");
  tempoSlider.hide();
}


function showElements() {

  // Play/Pause Button goes here
  rect(width*(3/24), height*(2/12), width*(1/12), height*(2/12) );
  startButton.show();


  // Sequencer Goes Here
  rect(width*(4/12), height*(7/12),  width*(6/12), height*(8/12));

  // Audio Effects Go Here
  rect(width*(9/12), height*(7/12), width*(4/12), height*(8/12));

  // Waveform Goes here??
  rect(width*(13/24), height*(2/12), width*(9/12), height*(2/12));

  sourceButton.show();

  reverbAmount.show();
  delayAmount.show();
  chebyAmount.show();

  tempoSlider.show();

}

// function changeBaseWaveform() {
//     changeOscillatorType();
// }



function writeText() {

  textAlign(CENTER, CENTER);
  textSize(20);

  // To do; automatically align with 
  text("Reverb", width*(16/24),  height*(14/24));
  reverb.wet.value = reverbAmount.value();

  text("Delay", width*(20/24),  height*(14/24));
  delay.wet.value = delayAmount.value();

  text("Chebyshev",width*(18/24),  height*(17/24));
  cheby.wet.value = chebyAmount.value();

  text("Master Tempo", width*(20/24), height*(4/12));
  speed = tempoSlider.value();
}


function drawWaveform(wave, initX, initY, w=width*(9/12), h=height) {

  push();
  translate(initX, initY);
  stroke(255);
  let buffer = wave.getValue(0);

  let start=0; 

  // Look for where samples go from negative to positive and set as start
  for (let i=0; i<buffer.length; i++) {
    if (buffer[i-1]<0 && buffer[i] >= 0) {
      start = i;
      break;
    }
  }

  // Calculate end in comparison so same number samples drawn per frame..
  let end= start+buffer.length/2;

  //drawing the waveform
  for (let i=start; i<end; i++) {
    let x1=map(i-1, start, end, 0, w);
    let y1=map(buffer[i-1], -1, 1, 0, h);
    let x2=map(i, start, end, 0, w);
    let y2=map(buffer[i], -1, 1, 0, h);
    stroke(255,100);
    line(x1,y1, x2,y2);

  }
  pop();

}


function shiverAnimate(string, y) {

  let txtW = textWidth(string);
  let spacing = txtW / string.length;
    
  for(let i = 0; i < string.length; i++){
    let c = string.charAt(i);
    
    let offsetX = random(-spacing / 10.0, spacing / 10.0);
    let offsetY = random(-spacing / 10.0, spacing / 10.0);
        
    let startX = (width - txtW) / 2 + spacing / 2;
    text(c, startX + i * spacing + offsetX, y + offsetY);
  }

}



// function changeSine() {
//     oscillator1.oscillator.type = "sine";
//     oscTypeText = "Sine";
//   }
  
//   function changeSquare() {
//     oscillator1.oscillator.type = "square";
//     oscTypeText = "Square";
//   }
  
//   function changeTri() {
//     oscillator1.oscillator.type = "triangle";
//     oscTypeText = "Triangle";
//   }
  
//   function changeSaw() {
//     oscillator1.oscillator.type = "sawtooth";
//     oscTypeText = "Sawtooth";
//   }
  
  
//   function changeOscillatorType() {
//     sineButton = createButton("Sine");
//     sineButton.position(width / 2 - 150, height-height/16);
//     sineButton.style('background-color', "#F3C98B");
//     sineButton.mousePressed(changeSine);

  
//     squareButton = createButton("Square");
//     squareButton.position(width / 2 - 50, height-height/16);
//     squareButton.style('background-color', "#F3C98B");
//     squareButton.mousePressed(changeSquare);
  
//     triButton = createButton("Triangle");
//     triButton.position(width / 2 + 50, height-height/16);
//     triButton.style('background-color', "#F3C98B");
//     triButton.mousePressed(changeTri);
  
//     sawButton = createButton("Sawtooth");
//     sawButton.position(width/2 +150, height-height/16);
//     sawButton.style('background-color', "#F3C98B");
//     sawButton.mousePressed(changeSaw);
//   }
