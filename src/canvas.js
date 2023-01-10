import React, { useRef, useEffect, useState } from "react";

const Canvas = (props) => {
    const canvasRef = useRef(null);
    const [context, setContext] = useState(null);

    var color = '#111111';
      
    //keydown handler
    useEffect(() => {
      const handleKeyDown = (event) => {
        console.log(event.key)
        if (event.key === 'Enter') {
          changeColor();
        }
        console.log(color)
      };
      window.addEventListener('keydown', handleKeyDown);
  
      // Return a cleanup function to remove the event listener when the component unmounts
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, []);

    const draw = (frameCount) => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.fillStyle = color;
        context.beginPath();
        context.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
        context.fill();
        context.beginPath();
        context.arc(150, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
        context.fill();
    };

    const changeColor = () => {
      // Change the fill style of the context to a random color
      color = '#'+Math.floor(Math.random()*16777215).toString(16);
    };

    useEffect(() => {
        //i.e. value other than null or undefined
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            setContext(ctx);
        }
    }, []);

    useEffect(() => {
        let frameCount = 0;
        let animationFrameId;

        // Check if null context has been replaced on component mount
        if (context) {
            //Our draw came here
            const render = () => {
                frameCount++;
                draw(frameCount);
                animationFrameId = window.requestAnimationFrame(render);
            };
            render();
        }
        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [draw, context]);

    
    return (
      <div>
        <canvas ref={canvasRef} {...props} />
        <button onClick={changeColor}>Change Color</button>
      </div>
    );
};

export default Canvas;