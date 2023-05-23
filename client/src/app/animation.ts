export function animation(calback:(frame:number)=>boolean):void {
  let frame:number = 0;
  function anim():void {
    if(calback(frame))requestAnimationFrame(anim);
    frame++;
  }
  requestAnimationFrame(anim);
}
