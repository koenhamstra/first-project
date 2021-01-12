
  
  /**
  * Start the game whenever the entire DOM is loaded
  */
  let init = () =>
  new CompleetGame(document.getElementById("canvas") as HTMLCanvasElement);
  
  // Add EventListener to load the game whenever the browser is ready
  window.addEventListener("load", init);
