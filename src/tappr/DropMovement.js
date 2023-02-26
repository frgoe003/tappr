export function DropMovement(ctx,d) {
      ctx.beginPath();
      ctx.fillStyle = d.state;
      ctx.arc(d.x, d.y, d.r, 0, 2 * Math.PI);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();
    }
