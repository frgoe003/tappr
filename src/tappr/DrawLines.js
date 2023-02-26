function DrawLines(ctx, y, r){
    ctx.fillStyle = "rgba(255,0,0,0.5)";
    ctx.beginPath();
    ctx.rect(0, y, ctx.canvas.width, r*2);
    ctx.fill();
}

function FlashLines(ctx,y,r){
    console.log("flasshin")
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.beginPath();
    ctx.rect(0, y, ctx.canvas.width, r*2);
    ctx.fill();
}

export {DrawLines,FlashLines}