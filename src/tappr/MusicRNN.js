import * as mm from "@magenta/music";
import * as Tone from 'tone'
import Rhythm from "./Rhythm";

let { DRUM1,DRUM2, DRUMS } = Rhythm;

let rnn = new mm.MusicRNN('https://storage.googleapis.com/download.magenta.tensorflow.org/tfjs_checkpoints/music_rnn/drum_kit_rnn');
rnn.initialize();

let rnn_steps = 20;
let rnn_temperature = 0; 
/*
The softmax temperature to use when sampling from the logits. Argmax is used if not provided. 
Temperature can be any number value above 0, however, anything above 1.5 will essentially result in random results.
*/

export default function playRNN(temp,seq,steps) {
    //let rnnPlayer = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus',undefined,undefined,undefined,callback);
    return rnn.continueSequenceAndReturnProbabilities(seq, steps, temp)
}