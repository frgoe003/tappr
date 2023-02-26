import * as Tone from 'tone'
import clap3 from "./utils/clp_analogue.wav"
import bd_ghost3 from "./utils/bd_ghost.wav"
import bd_hybrid3 from "./utils/bd_hybrid.wav"
import bd_sonikboom3 from "./utils/bd_sonikboom.wav"

import tekk1 from "./utils/acer-hardtekk-kick.wav"
import tekk2 from "./utils/dreckige-hardtekk-kick.wav"
import tekk3 from "./utils/kick-tech.wav"

import midtom3 from "./utils/mid-tom-g-key-24-P8Y.wav"
import cowbell3 from "./utils/prc_dnthavacowman.wav"
import lowpop3 from "./utils/prc_itgoespop.wav"

// hi hats open/closed
import hihat11 from "./utils/hat_closer.wav"
import hihat22 from "./utils/hat_lilcloser.wav"

import snare3 from "./utils/snr_royalty.wav"
import shaker3 from "./utils/shaker_bot.wav"

/*

*/



const clap = new Audio(clap3); //+++

const drumSamples = new Tone.ToneAudioBuffers({
	bd_ghost: bd_ghost3,
  bd_hybrid: bd_hybrid3,
  bd_sonikboom: bd_sonikboom3,
  tech1: tekk1,
  tech2: tekk2,
  tech3: tekk3,
  midtom: midtom3,
  cowbell: cowbell3,
  lowpop: lowpop3,
  hihat1: hihat11,
  hihat2: hihat22,
  snare: snare3,
  shaker: shaker3,
  clap: clap3
}, () => console.log("buffer loaded")
);

function testAudio(){
  const player = new Tone.Player().toDestination();
  player.buffer = drumSamples.get("tech1");
  player.start(0)
}

let NoteMap = {
  34: "bd_ghost",
  36: "tech3",
  38: "hihat2",
  40: "tech1",
  42: "snare",
  44: "lowpop"
}

function playNote(pitch){

    let note = NoteMap[pitch] ? NoteMap[pitch] : "snare"
    const player = new Tone.Player().toDestination();
    player.buffer = drumSamples.get(note);
    player.start()
}


export {playNote,testAudio}



/*
  'Kick', 1
    //
  'Snare', 2
    //
  'Hi-hat closed', 3
  'Hi-hat open', 4
    //
  'Tom low', 5
  'Tom mid', 6
  'Tom high', 7
    //
  'Clap', 8
  'Rim' 9

let HardStyle = {
    34: snare,
    36: shaker,
    38: prc,
    40: techKick3,
    42: bd_hybrid,
    44: techKick1
}
*/
