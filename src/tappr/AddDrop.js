const drop = class {
  constructor(x,y,r,pitch,state,type) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.pitch = pitch;
    this.state = state; // true: to go; false: crossed line; used for det. color status
    this.type = type ? type : 'snare';
}
}
const soundMap = new Map([
  [34, 250],
  [36, 350],
  [38, 450],
  [40, 550],
  [42, 650],
  [44, 750],
]);

export default function AddDrop(y,r,pitch,state,drops) {
    let x = soundMap.has(pitch) ? soundMap.get(pitch) : 250;
    let d1 = new drop(x,y,r,pitch,state)
    drops.push(d1);
    return drops
}