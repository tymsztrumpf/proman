import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {dropManager} from "../controller/control_drag.js";


export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);

        if(BoardElemetnsAreEmpty(boardId)){
                for (let card of cards) {
                const cardBuilder = htmlFactory(htmlTemplates.card);
                const content = cardBuilder(card, boardId);
                if (card['status_id'] === 1) domManager.addChild(`.NEW[data-board-id="${boardId}"]`, content);
                if (card['status_id'] === 2) domManager.addChild(`.IP[data-board-id="${boardId}"]`, content);
                if (card['status_id'] === 3) domManager.addChild(`.T[data-board-id="${boardId}"]`, content);
                if (card['status_id'] === 4) domManager.addChild(`.DONE[data-board-id="${boardId}"]`, content);
                dropManager.initDragAndDrop();
                click_change_text(card)
                domManager.addEventListener(
                    `.CreateCard[data-board-id="${boardId}"]`,
                    "click",
                    createCard
                );
        }     
        }

    },

};

function click_change_text(card){
    domManager.addEventListener(
        `.card[data-card-id="${card.id}"]`,
        "dblclick",
        changeCardTextOn
    );
    domManager.addEventListener(
        `.card[data-card-id="${card.id}"]`,
        "mouseleave",
        changeCardTextOff
    );
}

function takeBoardElements(boardId) {
    return [document.querySelector(`.NEW[data-board-id="${boardId}"]`).innerHTML,
    document.querySelector(`.IP[data-board-id="${boardId}"]`).innerHTML,
    document.querySelector(`.T[data-board-id="${boardId}"]`).innerHTML,
    document.querySelector(`.T[data-board-id="${boardId}"]`).innerHTML,];
}
function BoardElemetnsAreEmpty(boardId){
    let BoardElements = takeBoardElements(boardId)
    for(let Element of BoardElements){
        if(Element != ''){
            return false
        } 
    }
    return true
}

function createCard(clickEvent){
    let boardId = clickEvent.currentTarget.getAttribute('data-board-id');
    let json = dataHandler.createNewCard(boardId) 
    json.then((json) => {
        json.forEach(element => {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(element, boardId)
            domManager.addChild(`.NEW[data-board-id="${boardId}"]`, content)
            click_change_text(element)
            dropManager.initDragAndDrop();
        });
    })
}



function changeCardTextOn(clickEvent) {
    clickEvent.currentTarget.firstChild.disabled = false

}
function changeCardTextOff(clickEvent) {
    let boardId = clickEvent.currentTarget.getAttribute('data-board-id');
    let title = clickEvent.currentTarget.firstChild.value
    let cardId = clickEvent.currentTarget.getAttribute('data-card-id');

    clickEvent.currentTarget.firstChild.disabled = true
    dataHandler.changeCardTitle(boardId, cardId, title)
}
