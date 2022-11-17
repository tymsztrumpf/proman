export const htmlTemplates = {
    board: 1,
    card: 2,
    newBoardSchema: 3,
    columnTitle: 4,
    columnBody: 5
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder,
    [htmlTemplates.newBoardSchema]: newBoardSchema,
    [htmlTemplates.columnTitle]: columnTitleBuilder,
    [htmlTemplates.columnBody]: columnBodyBuilder
}
;

export function htmlFactory(template) {
    if (builderFunctions.hasOwnProperty(template)) {
        return builderFunctions[template];
    }

    console.error("Undefined template: " + template);

    return () => {
        return "";
    };
}


function cardBuilder(card, boardId) {
    return `<div class="card" data-card-status="${card.status_id}" data-card-id="${card.id}" data-board-id=${boardId}><input class="col-sm-12" type="text" value="${card.title}" disabled></div>`;
}


function boardBuilder(board) {
    // language=HTML
    return `<div class="accordion" id="accordionPanelsStayOpenExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
      <button data-board-status="0" data-board-id=${board.id} class="accordion-button text-white bg bg-dark" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne${board.id}" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
      ${board.title}
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne${board.id}" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
      <div class="accordion-body bg bg-dark">
      <table class="table table-bordered ">
      <button data-board-id=${board.id} class="CreateCard">ADD Card</button>
      <button data-board-id=${board.id} class="CreateColumn">ADD Column</button>
                        <thead>
                            <tr id="column-head" data-board-id="${board.id}">
                            </tr>
                        </thead>
                        <tbody>
                            <tr id="column-body" data-board-id="${board.id}">
                            </tr>
                    </table>
      </div>
    </div>
  </div>
</div>`}

function newBoardSchema() {
    return `
    <div class="accordion" >
        <div class="accordion-item">
            <div class="accordion-button text-white bg bg-dark">
                <input class="title_Board" type="text"> <button class="SendBoard">+</button>  
            </div>
        </div>
    </div>`}

function columnTitleBuilder(column, boardId) {
    return `<th class="text-light column" data-column-id="${column.cloumn_id}" data-board-id=${boardId} scope="col">${column.name.toUpperCase()}</th>`
}
function columnBodyBuilder(id,status,boardId) {
    return `<td class="card-slot" data-column-id="${id}" data-column-status="${status}" data-board-id=${boardId}></td>`
}