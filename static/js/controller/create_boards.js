const board = `<div class="accordion " id="accordionFlushExample"><div class=" accordion-item"><h2 class="accordion-header" id="flush-headingOne"><div class=" accordion-button collapsed bg  bg-dark text-light" type="button" data-bs-toggle="collapse"data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne"><form action="/add_board"method="post"><input name="name_board" type="text"> <button type="submit">sub</button></form></div></h2></div></div>`

add_board.addEventListener('click',()=>{

    console.log(document.querySelector('.boards').innerHTML += board)
})

