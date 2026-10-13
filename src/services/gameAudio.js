let context
export function playGameSound(correct){
 try{const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;context ||= new Audio();context.resume().then(()=>{const t=context.currentTime;const notes=correct?[523.25,659.25,783.99]:[349.23,293.66];notes.forEach((f,i)=>{const o=context.createOscillator(),g=context.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0,t+i*.12);g.gain.linearRampToValueAtTime(.1,t+i*.12+.015);g.gain.exponentialRampToValueAtTime(.001,t+i*.12+.2);o.connect(g);g.connect(context.destination);o.start(t+i*.12);o.stop(t+i*.12+.22)})}).catch(()=>{})}catch{}
}
