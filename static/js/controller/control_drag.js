const ui = {
    mixedCardsContainer: null,
    slots: null,
    cards: null,
};
const game = {
    dragged: null,
};

function initDragAndDrop() {
    initElements();
    initDragEvents();
}

function initElements() {
    ui.slots =  document.querySelectorAll("td");
}


function initDragEvents() {
    ui.slots.forEach(function (slot) {
        initDropzone(slot);
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
    e.preventDefault();
    const clas = 1
    const dropzone = e.currentTarget;
    dropzone.appendChild(game.dragged);
    let where = dropzone.classList[clas];
    let id = game.dragged.id
    fetch('/api/boards/'+board_id.innerHTML+'/'+id+"/"+where)
}

add_button.addEventListener('click',()=>{
    let element = document.querySelector('.NEW')
    let cards = document.querySelectorAll('.card')
    let id = cards.length+1
    let card =  '<div class="card" id ="'+id+'"><input class="col-sm-12" type="text" value="'+element['title']+'" disabled></div>'
    element.innerHTML += card
    initDraggable(document.getElementById(id));
    fetch('/api/add/boards/'+board_id.innerHTML)
})


let href= '/api/boards/'+board_id.innerHTML+'/cards/'
fetch(href)
.then(response => response.json())
.then(json => {
    json.forEach(element => {
        let div_element = '<div class="card" id ="'+element['id']+'"><input class="col-sm-12" type="text" value="'+element['title']+'" disabled></div>'
        if(element['status_id'] == 1)document.querySelector('.NEW').innerHTML += div_element;    
        if(element['status_id'] == 2)document.querySelector('.IP').innerHTML += div_element;    
        if(element['status_id'] == 3)document.querySelector('.T').innerHTML += div_element;    
        if(element['status_id'] == 4)document.querySelector('.DONE').innerHTML += div_element;    
        initDraggable(document.getElementById(element['id']))
    });
    document.querySelectorAll('.card').forEach(item =>{
        item.addEventListener('dblclick',()=>{
            item.firstChild.disabled = false
        }) 
        item.addEventListener('mouseleave',()=>{
            item.firstChild.disabled = true
            fetch('/api/text/boards/'+board_id.innerHTML+'/'+item.id+"/"+item.firstChild.value)
        }) 
        });


});


initDragAndDrop();
 