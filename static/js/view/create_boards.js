import {dataHandler} from "../data/dataHandler.js";

add_board.addEventListener('click',()=>{
    let title = document.querySelector('.name_board').value
    console.log(dataHandler.createNewBoard(title))
})
