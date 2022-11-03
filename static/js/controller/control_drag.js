import {dataHandler} from "../data/dataHandler.js";


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
    ui.slots =  document.querySelectorAll(".board-column-content");
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
    dropzone.addEventListener("dragenter", handleDragEnter);
    dropzone.addEventListener("dragover", handleDragOver);
    dropzone.addEventListener("dragleave", handleDragLeave);
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

function handleDragEnter(e) {

}

function handleDragLeave(e) {

}


function handleDrop(e) {
    const secondClass = 1
    const dropzone = e.currentTarget;
    let cardId = game.dragged.getAttribute('data-card-id');
    let boardId = dropzone.getAttribute('data-board-id');
    let columnName = dropzone.classList[secondClass]

    e.preventDefault();
    dropzone.appendChild(game.dragged);
    dataHandler.changeCardStatus(boardId, cardId, columnName)

}