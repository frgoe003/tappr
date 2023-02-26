import React, { useState, useRef, useEffect } from "react";
import Canvas from "./Canvas";
import Rhythm from "./Rhythm";
import MatrixBG from "./MatrixBG"


const Score = (props) => {

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
 
    const [superScore,setSuperScore] = useState(0);

    const scoreChange = (newScore) => {
      setSuperScore(superScore+newScore);
    };

  
    const draw = () => {
		if (ctx) {
            ctx.fillStyle = "white";
			ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.fillStyle = "red";
            ctx.font = "50px serif";
            ctx.fillText(superScore.toString(), 50, 90);
		}
	};

	return (
		<div>
		<MatrixBG Screen={1} Key={'f'} scoreChange={scoreChange}/>
		<MatrixBG Screen={2} Key={'j'} scoreChange={scoreChange}/>
		<Canvas
			draw={draw} height={100} width={300}
			establishContext={establishContext}
			establishCanvasWidth={establishCanvasWidth}
			establishCanvasHeight={establishCanvasHeight}
		/>
		</div>
	);


}

export default Score;