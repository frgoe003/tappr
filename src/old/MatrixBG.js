import React, { useState, useEffect, useId} from "react";
import * as Tone from 'tone'
import Canvas from "./Canvas";
import Score from "./Score";
import simple  from "./Rhythm";
import click3 from "./click3.wav"
//import getRandRhythm  from "./Rhythm"

const MatrixBG = React.memo((props) =>{
	var [score, setScore] = useState(0)
	const [ctx, setCtx] = useState(null);
	const [canvasWidth, setCanvasWidth] = useState(null);
	const [canvasHeight, setCanvasHeight] = useState(null);
	const establishContext = (context) => {
		setCtx(context);
	};

	const establishCanvasWidth = (width) => {
		setCanvasWidth(width);
	};
	const establishCanvasHeight = (width) => {
		setCanvasHeight(width);
	};

	const handleScoreChange = (s) => {
		props.scoreChange(s)
	}

	var refScore = 0;

	const drop = class {
		constructor(x,y,r,type) {
		  this.x = canvasWidth ? canvasWidth/2 : x; // ctx.canvas.width ? ctx.canvas.width / 
		  this.y = y;
		  this.r = r;
		  this.ref = null;
		  this.type = type ? type : 'snare';
		}
	};
	
	var drops = [];
	let d1 = new drop(0,0,10,'snare')
	drops.push(d1);
	let timeout;
	const r = 10;

	const disturbanceEffect = (e) => { 
		clearTimeout(timeout);
		const bounds = e.target.getBoundingClientRect();
		const x = e.clientX - bounds.left;
		const y = e.clientY - bounds.top;
		drawCircle(x,y,10)
	};

	function drawCircle(x,y,r){
		ctx.fillStyle = "rgb(255, 255, 255)";
		ctx.beginPath();
		ctx.arc(x,y,r, 0, 2 * Math.PI);
		ctx.fill();
	}

	function drawLines(circleRadius){
		ctx.fillStyle = "rgba(255,0,0,0.5)";
		ctx.beginPath();
		ctx.rect(0, ctx.canvas.height-2*r-10, ctx.canvas.width, circleRadius*2);
		ctx.fill();
	}

	function addNewDrop(type){
		let d1 = new drop(0,0,10,type)
		drops.push(d1);
	}

	function keydownScoring() {
		if (!drops.length){
			return -1
		}
		var yStart = ctx.canvas.height-2*r-10;
		let d = drops[0];
		let diff = Math.abs(yStart-d.y+d.r)
		let score  = diff>2*r ? 0 : 100 * ((2*r-diff)/(2*r));
		return score;
	}

	function addRangeDrops(){
		const now = Tone.now()
		const loop = new Tone.Loop((time) => {

			addNewDrop('kick');
		}, "1");
		// triggered every sec // "8n" -> eighth note.
		loop.start();
		//loop2.start();
		Tone.Transport.start();
	}

	const draw = () => {
		if (ctx) {
			ctx.fillStyle = "rgba(0, 0, 0, 1)";
			ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

			//draw score evaluation zone
			drawLines(r); 
			
			
			for (let i = 0; i < drops.length; i++) {
				let curr = drops[i];
				drawCircle(curr.x,curr.y,curr.r);
				curr.y+=2;
				if (curr.y-curr.r > (ctx.canvas.height-2*r-10)){ //ctx.canvas.height
					console.log(drops);
					simple(props.Screen,curr.type);
					drops.splice(i, 1);

					/*
					console.log('drop del',score);
					//setScore(score+1);
					addNewDrop();
					*/
				}
			}
		}
	};

	//keydown handler
	useEffect((ctx) => {
		const handleKeyDown = (event) => {
			if (event.key === props.Key) { //props.Key
				let s = keydownScoring(ctx);
				console.log('Score: '+s+' on screen '+props.Screen);
				handleScoreChange(s);
			}
			else if (event.key === 'a') {
				addNewDrop();
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		}; 
	}, drops);

	function deleteAll(){
		drops = [];
	}

	//<Score score = {score}/>
	return (
		<div>
		<Canvas
			draw={draw} height={200} width={200}
			establishContext={establishContext}
			establishCanvasWidth={establishCanvasWidth}
			establishCanvasHeight={establishCanvasHeight}
		/>
		<button onClick={addRangeDrops}>Add Rhythm</button>
		<button onClick={deleteAll}>Delete All</button>
		</div>
	);
});

export default MatrixBG;