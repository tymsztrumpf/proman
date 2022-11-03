export const htmlTemplates = {
    board: 1,
    card: 2
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder
};

export function htmlFactory(template) {
    if (builderFunctions.hasOwnProperty(template)) {
        return builderFunctions[template];
    }

    console.error("Undefined template: " + template);

    return () => {
        return "";
    };
}


function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}">${card.title}</div>`;
}


function boardBuilder(board) {
    return `<div class="accordion" id="accordionPanelsStayOpenExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
      <button data-board-id=${board.id} class="accordion-button text-white bg bg-dark" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne${board.id}" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
      ${board.title}
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne${board.id}" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
      <div class="accordion-body bg bg-dark">
      <table class="table table-bordered ">
                        <thead>
                            <tr>
                                <th class="text-light col-sm-3" scope="col">NEW</th>
                                <th class="text-light col-sm-3" scope="col">IN PROGRESS</th>
                                <th class="text-light col-sm-3" scope="col">TESTING</th>
                                <th class="text-light col-sm-3" scope="col">DONE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="card-slot NEW"></td>
                                <td class="card-slot IP"></td>
                                <td class="card-slot T"></td>
                                <td class="card-slot DONE"></td>
                            </tr>
                    </table>
      </div>
    </div>
  </div>
</div>`}