import { dataHandler } from "../data/dataHandler.js";
import { domManager } from "../view/domManager.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { cardsManager } from "./cardsManager.js";


function addTitleColumn(element, boardId) {
    const columnBuilder = htmlFactory(htmlTemplates.columnTitle);
    const content = columnBuilder(element, boardId);
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

    },
};

function changeColumnName(clickEvent) {
    let title = prompt("Please enter board name", clickEvent.target.innerHTML)
    let id = clickEvent.target.dataset.boardId
    dataHandler.changeBoardName(id, title).then(() => {
        clickEvent.target.innerHTML = title;
    })

}