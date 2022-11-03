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

// add_button.addEventListener('click',()=>{
//     //variable
//     let element = document.querySelector('.NEW')
//     let cards = document.querySelectorAll('.card')
//     let card_id = cards.length+1
//     let card =  '<div class="card" id ="'+card_id+'"><input class="col-sm-12" type="text" value="'+element['title']+'" disabled></div>'
//     //functions
//
//     element.innerHTML += card
//     initDraggable(document.getElementById(id));
//     createNewCard(board_id.innerHTML)
// })
//
// fetch(href)
// .then(response => response.json())
// .then(json => {
//     json.forEach(element => {
//         put_area_to_right_place(element);
//         initDraggable(document.getElementById(element['id']))
//     });
//     change_text();
// });
//
//
// initDragAndDrop();
//
// function put_area_to_right_place(element) {
//     let div_element = '<div class="card" id ="' + element['id'] + '"><input class="col-sm-12" type="text" value="' + element['title'] + '" disabled></div>';
//     if (element['status_id'] == 1)
//         document.querySelector('.NEW').innerHTML += div_element;
//     if (element['status_id'] == 2)
//         document.querySelector('.IP').innerHTML += div_element;
//     if (element['status_id'] == 3)
//         document.querySelector('.T').innerHTML += div_element;
//     if (element['status_id'] == 4)
//         document.querySelector('.DONE').innerHTML += div_element;
// }
//
// function change_text() {
//     document.querySelectorAll('.card').forEach(item => {
//         make_area_editable(item);
//         item.addEventListener('mouseleave', () => save_change_text(item));
//     });
// }
//
//
// function make_area_editable(item) {
//     item.addEventListener('dblclick', () => {
//         item.firstChild.disabled = false;
//     });
// }
//
// function save_change_text(item) {
//     item.firstChild.disabled = true;
//     fetch('/api/text/boards/' + board_id.innerHTML + '/' + item.id + "/" + item.firstChild.value);
// }
