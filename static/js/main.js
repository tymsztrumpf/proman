import {boardsManager} from "./controller/boardsManager.js";
import {domManager} from "./view/domManager.js";

function init() {
    boardsManager.loadBoards();
    boardsManager.createNewBoard();
    domManager.initialize();
}

init();
