import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {dropManager} from "../controller/control_drag.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);

        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card, boardId);
            if (card['status_id'] === 1) domManager.addChild(`.NEW[data-board-id="${boardId}"]`, content);

            if (card['status_id'] === 2) domManager.addChild(`.IP[data-board-id="${boardId}"]`, content);

            if (card['status_id'] === 3) domManager.addChild(`.T[data-board-id="${boardId}"]`, content);

            if (card['status_id'] === 4) domManager.addChild(`.DONE[data-board-id="${boardId}"]`, content);
            await dropManager.initDragAndDrop();
            // domManager.addChild(`.board[data-board-id="${boardId}"]`, content);
            // domManager.addEventListener(
            //     `.card[data-card-id="${card.id}"]`,
            //     "click",
            //     changeCardTextOn
            // );
            // domManager.addEventListener(
            //     `.card[data-card-id="${card.id}"]`,
            //     "click",
            //     changeCardTextOff
            // );

        }
    },
    createNewCard: function () {
        domManager.addEventListener(
                `#new-card-btn`,
                "click",
                createCard
        );
    }
};

function createCard(clickEvent) {
    console.log(clickEvent.target.dataset.id)
    // const boardId = clickEvent.target.dataset.boardId;
    // // const cardId = clickEvent.target.dataset.cardId;
    // const board = dataHandler.createNewCard(boardId);
    // const cardBuilder = htmlFactory(htmlTemplates.card);
    // const content = cardBuilder(board)
    // domManager.addChild("#root", content);



}

// function deleteButtonHandler(clickEvent) {
// }

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
