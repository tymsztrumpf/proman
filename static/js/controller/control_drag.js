import {dataHandler} from "../data/dataHandler.js";
const secondClass = 1

const ui = {
    mixedCardsContainer: null,
    slots: null,
    cards: null,
};
const game = {
    dragged: null,
};

export let dropManager = {
    initDragAndDrop : async function () {
        initElements();
        initDragEvents();
    }
}


function initElements() {
    ui.slots =  document.querySelectorAll("td");
    ui.cards = document.querySelectorAll(".card")
}


function initDragEvents() {
    ui.slots.forEach(function (slot) {
        initDropzone(slot);
    });
    ui.cards.forEach(function (card) {
        initDraggable(card);
    });

}


function initDraggable(draggable) {
    draggable.setAttribute("draggable", true);
    draggable.addEventListener("dragstart", handleDragStart);
    draggable.addEventListener("dragend", handleDragEnd);
}

function initDropzone(dropzone) {
    dropzone.addEventListener("dragover", handleDragOver);
    dropzone.addEventListener("drop", handleDrop);
}

function handleDragStart(e) {
    game.dragged = e.currentTarget;
}

function handleDragEnd() {
    game.dragged = null;
}

function handleDragOver(e) {
    e.preventDefault();
}



function handleDrop(e) {
    const dropzone = e.currentTarget;
    let cardId = game.dragged.getAttribute('data-card-id');
    let boardId = dropzone.getAttribute('data-board-id');
    let columnName = dropzone.classList[secondClass]
    let cardBoardId = game.dragged.getAttribute('data-board-id')

    e.preventDefault();
    if(boardId == cardBoardId) dropzone.appendChild(game.dragged);
    dataHandler.changeCardStatus(boardId, cardId, columnName)

}

