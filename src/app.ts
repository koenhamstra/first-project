// Initialize the game after the DOM is loaded.
let init = () => {
  const KiwiWars = new FullGame(
    document.getElementById("canvas") as HTMLCanvasElement
  );
};

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);
