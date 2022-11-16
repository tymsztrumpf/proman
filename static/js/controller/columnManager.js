import { dataHandler } from "../data/dataHandler.js";
import { domManager } from "../view/domManager.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { cardsManager } from "./cardsManager.js";


function addTitleColumn(element, boardId) {
    const columnBuilder = htmlFactory(htmlTemplates.columnTitle);
    const content = columnBuilder(element.title, boardId);
    domManager.addChild(`#column-head[data-board-id="${boardId}"]`, content);
}

export let columnsManager = {
    loadColumns: async function (boardId) {
        let counter = 1;
        let boardStatuses =  await dataHandler.getBoardStatuses(boardId)
        boardStatuses.forEach(element =>{
            addTitleColumn(element, boardId);
            const columnBuilder = htmlFactory(htmlTemplates.columnBody);
            const content = columnBuilder(counter,element.id, boardId);
            domManager.addChild(`#column-body[data-board-id="${boardId}"]`, content);
            counter += 1;
        })
        counter = 0
        cardsManager.loadCards(boardId);
        domManager.addEventListener(
            `.CreateColumn[data-board-id="${boardId}"]`,
            "click",
            createColumn)
    },
};

function createColumn (clickEvent)  {
    const boardId = clickEvent.currentTarget.getAttribute("data-board-id");
    let columnName = prompt("Please enter column name")
    dataHandler.createColumn(boardId,columnName);
}