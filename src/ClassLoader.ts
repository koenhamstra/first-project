// This class is super class for the transistion screens and for the games so all of the sub classes show have the same behaviour 

abstract class ClassLoader {
  
    constructor(canvas:HTMLCanvasElement) {
       
    }

    public done = ():boolean => {
    return false;
    }
    
    public loop =()=>{
        
    }
}