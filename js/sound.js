// Components for building sound in Tone.js

function loadSynth() {
    oscillator1 = new Tone.Synth({
        oscillator: {
          type: "square"
        },
        envelope: {
          attack: 0.25,
          decay: 0.5, 
          sustain: 0.8, 
          release: 0.8
        }
      }).toDestination();


      // Define 6 Synthesis Sources
    synth = new Tone.Synth();
    amsynth = new Tone.AMSynth(30, "sine", "square");
    duosynth = new Tone.DuoSynth();
    memsynth = new Tone.MembraneSynth();
    metalsynth = new Tone.MetalSynth();
    plucksynth = new Tone.PluckSynth();

    // Todo -- add detune slider
    synth.set({ detune: -1200 });

    wave = new Tone.Waveform();
    Tone.Master.connect(wave);
  
    Tone.Master.volume.value= masterVolume; 

}

function loadEffects() {

    // Define Audio Effects
    reverb = new Tone.JCReverb(0.2).toDestination();
    delay = new Tone.FeedbackDelay(0.5);
    cheby = new Tone.Chebyshev(50);
    synth.chain(cheby, delay, reverb);

}

function loadNotes() {
    for (let i=0; i < maxH; i++) {
        chord[i] = convertMidiToString(baseNote + parseInt(addChord[i%5]+parseInt(i/5)*12));

    }
    
}


function convertMidiToString(num) {
    let noteNum;
    switch(num) {
        case 40:
            noteNum = "E2"
            break;
        case 42: 
            noteNum = "F#2"
            break;
        case 44: 
            noteNum = "G#2"
            break;
        case 47:
            noteNum = "B2"
            break;
        case 49: 
            noteNum = "C#3"
            break;
        case 52: 
            noteNum = "E3"
            break;
        case 54: 
            noteNum = "F#3"
            break;
        case 56: 
            noteNum = "G#3"
            break;
        case 59: 
            noteNum = "B3"
            break;
        case 61: 
            noteNum = "C#4"
            break;
        case 64: 
            noteNum = "E4"
            break; 
        case 66:
            noteNum = "F#4"
            break;
        case 68:
            noteNum = "G#4"
            break;
        case 71: 
            noteNum = "B4"
            break;
        case 73: 
            noteNum = "C#5"
            break;
        case 76: 
            noteNum = "E5" 
    } 

    return noteNum;
}

function playSound(x) {
    for (let i=0; i < maxH; i++) {
        if(st[x][i] == 1) {
            bright[x][i]=1.0;
            // print(chord[i]);
            // oscillator1.triggerAttackRelease(chord[i], "16n");

            let val =buttonChanger%numSynths;
            if (val == 0) {
                synth.triggerAttackRelease(chord[i], "16n");
            } else if (val == 1) {
              amsynth.triggerAttackRelease(chord[i], "16n");
            } else if (val == 2) {
              duosynth.triggerAttackRelease(chord[i], "16n");
            } else if (val == 3) {
              memsynth.triggerAttackRelease(chord[i], "16n");
            } else if (val == 4) {
              metalsynth.triggerAttackRelease(chord[i], "16n");
            } else {
              plucksynth.triggerAttackRelease(chord[i], "16n");
            }
        } 
    }
}


function startContext() {
    console.log("Tone is: ", Tone.context.state)
    document.body.addEventListener("click", () => {
      Tone.context.resume();
      console.log("Tone is: ", Tone.context.state);
    });
}
  

function changeSource() {
    buttonChanger++;
    print(buttonChanger%numSynths);
  
    if (buttonChanger%numSynths == 0) {
      print("simple synth");
      // Disconnect final synth
      plucksynth.disconnect();
      // Connect initial synth
      synth.chain(cheby, delay, reverb);
    }
    else if (buttonChanger%numSynths == 1){
      print("AM synth") 
      synth.disconnect();
      amsynth.chain(cheby, delay, reverb);
    } else if (buttonChanger%numSynths == 2)  {
      print("Duo synth")
      amsynth.disconnect();
      duosynth.chain(cheby, delay, reverb);
  
    } else if (buttonChanger%numSynths == 3) {
      print("Membrane Synth");
      duosynth.disconnect();
      memsynth.chain(cheby, delay, reverb);
    } else if (buttonChanger%numSynths == 4) {
      print("Metal Synth");
      memsynth.disconnect();
      metalsynth.chain(cheby, delay, reverb);
    } else {
      print("Pluck Synth");
      metalsynth.disconnect();
      plucksynth.chain(cheby, delay, reverb);
    }
  

}


// To-do; Classify sketch

// class Synth1 {
//     constructor() {

//     }

//     loadSynth() {
//         oscillator1 = new Tone.Synth({
//             oscillator: {
//               type: "square"
//             },
//             envelope: {
//               attack: 0.25,
//               decay: 0.5, 
//               sustain: 0.8, 
//               release: 0.8
//             }
//           }).toDestination();

//     }

//     convertMidiToString(num) {
//         let noteNum;
//         switch(num) {
//             case 40:
//                 noteNum = "E2"
//                 break;
//             case 42: 
//                 noteNum = "F#2"
//                 break;
//             case 44: 
//                 noteNum = "G#2"
//                 break;
//             case 47:
//                 noteNum = "B2"
//                 break;
//             case 49: 
//                 noteNum = "C#3"
//                 break;
//             case 52: 
//                 noteNum = "E3"
//                 break;
//             case 54: 
//                 noteNum = "F#3"
//                 break;
//             case 56: 
//                 noteNum = "G#3"
//                 break;
//             case 59: 
//                 noteNum = "B3"
//                 break;
//             case 61: 
//                 noteNum = "C#4"
//                 break;
//             case 64: 
//                 noteNum = "E4"
//                 break; 
//             case 66:
//                 noteNum = "F#4"
//                 break;
//             case 68:
//                 noteNum = "G#4"
//                 break;
//             case 71: 
//                 noteNum = "B4"
//                 break;
//             case 73: 
//                 noteNum = "C#5"
//                 break;
//             case 76: 
//                 noteNum = "E5" 
//         } 
    
//         return noteNum;

//     }




// }
