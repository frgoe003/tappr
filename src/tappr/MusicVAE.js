import * as mm from "@magenta/music";
import * as Tone from 'tone'
import Rhythm from "./Rhythm";

let { DRUM1, DRUMS } = Rhythm;

let music_vae = new mm.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_small_q2');
music_vae.initialize();

let vaePlayer = new mm.Player();
let vae_temperature = 0.5;

export default function playVAE() {
  if (vaePlayer.isPlaying()) {
    vaePlayer.stop();
    return;
  }
  music_vae
  .sample(1, vae_temperature)
  .then((sample) => vaePlayer.start(sample[0]));
} 