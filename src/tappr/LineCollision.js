import {playNote} from "./PlayNote"

export default function LineCollision(ctx,d,yLine) {

  if (d.y===yLine){
    playNote(d.pitch)
  }
  return
} 