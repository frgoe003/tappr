export default function Scoring(drops,yLine) {
    let s = 0;
    
    for (let i=0; i<drops.length; i++){

        let d = drops[i];
        let diff = Math.abs(yLine-d.y+d.r)
        let score  = diff>2*d.r ? 0 : 100 * ((2*d.r-diff)/(2*d.r));

        if ((yLine)>(d.y+d.r+20) || ((d.y+d.r-20)>(yLine) && d.state!='white')){
            continue
        }
        if ((d.y+d.r-20)>(yLine) && d.state=='white'){
            d.state = "ff3232"
            continue
        } 
        s+=score;
        console.log(score)
        if (score>=70){
            d.state = "#02f900"
        }
        else if (score>0){
            d.state = "#ffff00"
        }
        else{
            d.state = "ff3232"
        }
    }
    return [s,drops];
}