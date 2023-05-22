export function animation(duration:number,calback:(frame:number)=>void):void {
  let frame:number = 0;
  function anim():void {
    calback(frame);
    if(frame < duration) requestAnimationFrame(anim);
    frame++;
  }
  requestAnimationFrame(anim);
}
