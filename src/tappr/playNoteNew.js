import * as Tone from 'tone'
import * as mm from "@magenta/music";

var samplesPath = 'https://storage.googleapis.com/melody-mixer/piano/';
var samples = {};
var NUM_NOTES = 88;
var MIDI_START_NUM = 21;
for (var i = MIDI_START_NUM; i < NUM_NOTES + MIDI_START_NUM; i++) {
    samples[i] = samplesPath + i + '.mp3';
}

var players = new Tone.Players(samples, function onPlayersLoaded(){
    console.log("Tone.js players loaded");
}).toDestination();

export default function playNote(midiNote, numNoteHolds){
   var duration = Tone.Transport.toSeconds('8n') * (numNoteHolds || 1);
   var player = players.get(midiNote);
   player.fadeOut = 0.05;
   player.fadeIn = 0.01;
   player.start(Tone.now(), 0, duration);
}

function toNoteSequence(pattern) {
    return mm.sequences.quantizeNoteSequence(
      {
        ticksPerQuarter: 220,
        totalTime: pattern.length / 2,
        timeSignatures: [
          {
            time: 0,
            numerator: 4,
            denominator: 4
          }
        ],
        tempos: [
          {
            time: 0,
            qpm: 120
          }
        ],
        notes: _.flatMap(pattern, (step, index) =>
          step.map(d => ({
            pitch: midiDrums[d],
            startTime: index * 0.5,
            endTime: (index + 1) * 0.5
          }))
        )
      },
      1
    );
  }