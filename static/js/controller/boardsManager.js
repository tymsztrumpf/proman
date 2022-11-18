import { dataHandler } from "../data/dataHandler.js";
import { domManager } from "../view/domManager.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import {columnsManager} from "./columnManager.js";


function addFunctionToChangeName(board) {
    domManager.addEventListener(
        `.accordion-button[data-board-id="${board.id}"]`,
        "dblclick",
        change_name
    );
}
async function deleteBoard(clickEvent) {
    let id = clickEvent.target.dataset.boardId
    await dataHandler.deleteBoard(id)
    console.log(document.querySelector(`.accordion-item[data-board-id="${id}"]`))
    document.querySelector("#root").innerHTML = ''
    boardsManager.loadBoards()
}
function addFunctionToDeleteBoard(board) {
    domManager.addEventListener(
        `#delateButton[data-board-id="${board.id}"]`,
        "click",
        deleteBoard
    );
}
export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content);
            addAcordingFunction(board);
            addFunctionToChangeName(board);
            addFunctionToDeleteBoard(board)

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

function addAcordingFunction(board) {
    domManager.addEventListener(
        `.accordion-button[data-board-id="${board.id}"]`,
        "click",
        showHideButtonHandler
    );
}

function createSchema() {
    const content = htmlFactory(htmlTemplates.newBoardSchema)
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
    await boardsManager.loadBoards()
}
function clearBoards() {
    document.querySelector('#root').innerHTML = '';
}
function deleteSchemaAdd() {
    document.querySelector('#NewBoard').innerHTML = '';
}



function showHideButtonHandler(clickEvent) {
    // domManager.addChild(`#column-body`, '');
    // domManager.addChild(`#column-head`, '');
    // setInterval(columnsManager.loadColumns(1),1000)
    const boardId = clickEvent.target.dataset.boardId;
    let status = clickEvent.target.dataset.boardStatus
    if (status === "0") {
        clickEvent.target.dataset.boardStatus = "1"
        columnsManager.loadColumns(boardId)
    }
}
function change_name(clickEvent) {
    let title = prompt("Please enter board name", clickEvent.target.innerHTML)
    let id = clickEvent.target.dataset.boardId
    dataHandler.changeBoardName(id, title).then(() => {
        clickEvent.target.innerHTML = title;
    })

}