import { nicknameinput } from "./selectors.js";
import UI from "./classes/UI.js";
import DB from "./classes/DB.js";
import Game from "./classes/Game.js";

const ui = new UI();
const db = new DB();

export async function initGame(e) {
    e.preventDefault();

    const nickname = nicknameinput.value.trim();

    if(nickname === '') {
        ui.showMessage('Please, put your nickname.')
        return;
    }

    try {
        console.log(await db.createDB());
    } catch (error) {
        console.log(error)
    }

    const game = new Game(nickname);

    ui.toogleNicknameContainer()
    ui.toogleGameContainer();
    game.world.start();
}