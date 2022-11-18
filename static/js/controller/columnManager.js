import {dataHandler as dataManager, dataHandler} from "../data/dataHandler.js";
import { domManager } from "../view/domManager.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { cardsManager } from "./cardsManager.js";


function addTitleColumn(element, boardId) {
    const columnBuilder = htmlFactory(htmlTemplates.columnTitle);
    const content = columnBuilder(element, boardId);
    domManager.addChild(`#column-head[data-board-id="${boardId}"]`, content);
}

function addFunctionClickToAddColumn(boardId) {
    domManager.addEventListener(
        `.CreateColumn[data-board-id="${boardId}"]`,
        "click",
        createColumn)
}

function buildBodyColumn(element, boardId) {
    const columnBuilder = htmlFactory(htmlTemplates.columnBody);
    const content = columnBuilder(element, boardId);
    domManager.addChild(`#column-body[data-board-id="${boardId}"]`, content);
}

export let columnsManager = {
    loadColumns: async function (boardId) {
        let boardStatuses =  await dataHandler.getBoardStatuses(boardId)
        boardStatuses.forEach(element =>{
            addTitleColumn(element, boardId);
            addFunctionClickToChangeDeleteColumn(element, boardId)
            buildBodyColumn(element, boardId);
        })
        cardsManager.loadCards(boardId);
        addFunctionClickToAddColumn(boardId);
        addFunctionClickToChangeTitleColumn (boardId)
    },
};

function addFunctionClickToChangeDeleteColumn(column,boardId){
    document.querySelectorAll(`.DeleteColumn[data-board-id="${boardId}"][data-column-id="${column.cloumn_id}"]`).forEach(btnDelete =>{
        btnDelete.addEventListener("click",(btn) =>{
            let columnId = btn.target.dataset.columnId
            console.log(columnId)
            document.querySelectorAll(`.card[data-column-id="${columnId}"]`).forEach(card => {
                dataHandler.deleteCard(card.dataset.cardId)
            })
            dataHandler.deleteColumn(columnId)
            reloadcolumns(boardId)

        })
    })
}

function reloadcolumns(boardId) {
    console.log(document.querySelector(`#column-head[data-board-id="${boardId}"]`).innerHTML = '')
    document.querySelector(`#column-body[data-board-id="${boardId}"]`).innerHTML = ''
    columnsManager.loadColumns(boardId)

}
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