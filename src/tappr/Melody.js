
import React, { Component } from "react";
import * as mm from "@magenta/music";
import * as Tone from 'tone'
import AddDrop from "./AddDrop"
import Rhythm from "./Rhythm";

let { DRUM1, DRUMS } = Rhythm;

export default function Melody(callback) {
    if (Tone.Transport.state === "started") {
        Tone.Transport.stop()
      }

    console.log('inside Melody.js')
    let player = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus',undefined,undefined,undefined,callback);
    player.start(DRUM1);
    player.stop();
} 

