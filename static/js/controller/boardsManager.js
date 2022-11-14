import { dataHandler } from "../data/dataHandler.js";
import { domManager } from "../view/domManager.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { cardsManager } from "./cardsManager.js";




export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content);
            domManager.addEventListener(
                `.accordion-button[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler
            );
        }
    },
    createNewBoard: function () {
        domManager.addEventListener(
            `#add_board`,
            "click",
            createSchema
        );
    }
};

function createSchema() {
    const content = htmlFactory(htmlTemplates.NewboardSchema)
    domManager.addChild("#NewBoard", content);
    domManager.addEventListener(
        `.SendBoard`,
        "click",
        createBoardInSQL
    );

}

async function createBoardInSQL() {
    let title = document.querySelector('.title_Board').value
    await dataHandler.createNewBoard(title)
    clearBoards();
    deleteSchemaAdd();
    boardsManager.loadBoards()
}
function clearBoards() {
    document.querySelector('#root').innerHTML = '';
}
function deleteSchemaAdd() {
    document.querySelector('#NewBoard').innerHTML = '';
}



function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    cardsManager.loadCards(boardId);
}
