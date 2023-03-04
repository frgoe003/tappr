import React, { useEffect, useState, useRef } from "react";
import PlayerStats from "./PlayerStats";
import {DropMovement} from "./DropMovement"
import {DrawLines,FlashLines}from "./DrawLines"
import AddDrop from "./AddDrop"
import data from "../data";
import LineCollision from "./LineCollision";
import Scoring from "./Scoring";
import * as Tone from 'tone'
import playVAE from "./MusicVAE"
import playRNN from "./MusicRNN"

import { testAudio } from "./PlayNote";

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import Rhythm from "./Rhythm";
let {DRUMS,DRUM1,DRUM2,EASY1,DRUMTEST1,DRUMTEST2} = Rhythm;

// init params
let temperature = 0.5;
let s = 0;
let RNNsample = DRUMS;
let RNNsteps = 30;
let speed = 2;
let drops = AddDrop(0,10,42,'white',[])
let { paddleProps, player } = data;
let screenAspectRatio = window.innerHeight/window.innerWidth

// selecters
const sampleMap = {
  "DRUMS":DRUMS,"DRUM1":DRUM1,"DRUM2":DRUM2,"EASY1":EASY1,"DRUMTEST1":DRUMTEST1,"DRUMTEST2":DRUMTEST2
};


// select handlers
function setTemp(e) {
  console.log(e.target.value);
  temperature = parseFloat(e.target.value);
}
function setSpeed(e) {
  console.log(e.target.value);
  speed = parseFloat(e.target.value);
}
function setPatternLength(e) {
  console.log(e.target.value);
  RNNsteps = parseFloat(e.target.value);
}
function dropsFromMelody(){
  addSeq(RNNsample)
}
async function dropsFromRNN(){
  playRNN(temperature,RNNsample,RNNsteps).then((RNNseq) => {
    //console.log(RNNseq.probs)
    RNNseq.sequence.then((seq) => addSeq(seq))
  });
}

// add new RNNsequence to screen
function addSeq(seq){
  let time = new Map()
  for (let i=0;i<seq.notes.length;i++){
    let start = (seq.notes[i].quantizedStartStep)
    if (time.has(start)){
      time.get(start).push(seq.notes[i].pitch)
    }
    else{
      time.set(start,[seq.notes[i].pitch])
    }
  }
  let timeArr = Array.from(time.keys());
  let j = 0;
  let prev = Tone.now()
  function go(){
    if (j===timeArr.length){return}
    for (let k=0;k<time.get(timeArr[j]).length;k++){
      let pitch = time.get(timeArr[j])[k]
      console.log("pitch: "+pitch+" at t = "+(Tone.now()-prev))
      drops = AddDrop(0,10,pitch,'white',drops)
      prev = Tone.now()
    }
    j++
    setTimeout(go, speed*100);
  }
  go()
}


//MAIN Render
export default function Board() {
  const canvasRef = useRef(null);

  let yLine = window.innerHeight/2; //############################ you really need to fix this bru

  //dropdown handler
  const getInitialState = () => {
    const value = DRUMS;
    return value;
  };
  const [sample, setSample] = useState(getInitialState);
  const handleSampleChange = (e) => {
    setSample(e.target.value);
    RNNsample = sampleMap[e.target.value];
  };

  //keydown handler
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === ' ') { //props.Key
        //FlashLines(ctx,yLine,20);
        [s, drops] = Scoring(drops,yLine);
				player.score += s;
        player.clicks += 1;
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		}; 
	}, drops);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      PlayerStats(ctx, player, canvas);
      DrawLines(ctx,yLine,20)

      for (let i=0; i<drops.length; i++){
        let d = drops[i];
        //move each drop
        DropMovement(ctx,d);

        //check for collision with yLine, play note 
        LineCollision(ctx,d,yLine)

        d.y+=5;
        if (d.y-d.r > (ctx.canvas.height)){
          drops.splice(i, 1);
        }
        if ((d.y > (yLine+2*d.r)) && d.state==="ff3232"){
          player.lives-=1
        }
      }

      requestAnimationFrame(render);
    };
    render();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <canvas
        id="canvas"
        ref={canvasRef}
        height={
          screenAspectRatio*1 > 1 ? window.innerHeight*0.8 : window.innerHeight*0.5
        }
        width={
          screenAspectRatio*1 > 1 ? window.innerWidth*0.9 : window.innerWidth*0.6
        }
      />
      <button onClick={dropsFromMelody}>Melody!</button>
      <button onClick={playVAE}>playVAE!</button>
      <button onClick={dropsFromRNN}>playRNN!</button>
      <button onClick={testAudio}>TestAudioBuffer</button>
      <div>
        <input type="range" min="0" max="2" step="0.1" defaultValue="0.5" onChange={setTemp}></input>
        <p>{`Temperature: ${temperature}`}</p>
      </div>
      <div>
        <input type="range" min="0.5" max="10" step="0.1" defaultValue="5" onChange={setSpeed}></input>
        <p>{`Speed`}</p>
      </div>
      <div>
        <input type="range" min="10" max="100" step="2" defaultValue="20" onChange={setPatternLength}></input>
        <p>{`Pattern length`}</p>
      </div>
      <div>
      <select value={sample} onChange={handleSampleChange}>
        <option value={"DRUMS"}>DRUMS</option>
        <option value={"DRUM1"}>DRUM1</option>
        <option value={"DRUM2"}>DRUM2</option>
        <option value={"EASY1"}>EASY1</option>
        <option value={"DRUMTEST1"}>DRUMTEST1</option>
        <option value={"DRUMTEST2"}>DRUMTEST2</option>
      </select>
      <p>{`You selected ${sample}`}</p>
    </div>
      
    </div>
  );
}