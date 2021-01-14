// This class is super class for the transistion screens and for the games so all of the sub classes show have the same behaviour 

abstract class ClassLoader {
  
    private audio :HTMLAudioElement;
    constructor(canvas:HTMLCanvasElement, audio : HTMLAudioElement) {
       this.audio=audio;
    }

    public done = ():boolean => {
    return false;
    }

    public draw =()=>{

    }

    public playAudio = ()=> {
        return this.audio.play();
    }
    public stopAudio =() => {
        return this.audio.pause();
    }
}