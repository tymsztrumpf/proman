import { dataHandler } from "../data/dataHandler.js";
import { domManager } from "../view/domManager.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { cardsManager } from "./cardsManager.js";


function addTitleColumn(element, boardId) {
    const columnBuilder = htmlFactory(htmlTemplates.columnTitle);
    const content = columnBuilder(element, boardId);
    console.log(element)
    domManager.addChild(`#column-head[data-board-id="${boardId}"]`, content);
}

function addFunctionClickToAddColumn(boardId) {
    domManager.addEventListener(
        `.CreateColumn[data-board-id="${boardId}"]`,
        "click",
        createColumn)
}

function buildBodyColumn(counter, element, boardId) {
    const columnBuilder = htmlFactory(htmlTemplates.columnBody);
    const content = columnBuilder(counter, element.id, boardId);
    domManager.addChild(`#column-body[data-board-id="${boardId}"]`, content);
}

export let columnsManager = {
    loadColumns: async function (boardId) {
        let counter = 1;
        let boardStatuses =  await dataHandler.getBoardStatuses(boardId)
        boardStatuses.forEach(element =>{
            addTitleColumn(element, boardId);
            buildBodyColumn(counter, element, boardId);
            counter += 1;
        })
        cardsManager.loadCards(boardId);
        addFunctionClickToAddColumn(boardId);
        addFunctionClickToChangeTitleColumn (boardId)
    },
};

function createColumn (clickEvent)  {
    const boardId = clickEvent.currentTarget.getAttribute("data-board-id");
    let columnName = prompt("Please enter column name")
    dataHandler.createColumn(boardId,columnName);
}

function addFunctionClickToChangeTitleColumn (boardId) {
    document.querySelectorAll(`.column[data-board-id="${boardId}"]`).forEach(element => {
        element.addEventListener('dblclick',(clickEvent)=>{
            let title = prompt("Please enter board name", clickEvent.target.innerHTML)
            let id = clickEvent.target.dataset.columnId
            dataHandler.changeColumnName(id, title).then(() => {
                clickEvent.target.innerHTML = title;
            })
        })
    })
}