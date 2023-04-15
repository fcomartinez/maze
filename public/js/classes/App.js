import { startBtn } from '../selectors.js';
import { initGame } from '../functions.js'

class App{
    constructor() {
        this.initApp();
    }

    initApp() {
        startBtn.addEventListener('click', initGame);
    }
}

export default App;