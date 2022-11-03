import {boardsManager} from "./controller/boardsManager.js";



function init() {
    boardsManager.loadBoards();
    boardsManager.createNewBoard();
}


init();