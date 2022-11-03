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

function boardBuilder(board) {
    return `<div class="accordion" id="accordionPanelsStayOpenExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                  <button data-board-id=${board.id} class="accordion-button text-dark bg bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne${board.id}" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                  ${board.title}
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseOne${board.id}" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
                  <div class="accordion-body bg bg-light">
                    <div class="board-columns">
                        <div class="board-column column-new">
                            <div class="board-column-title">New</div>
                            <div class="board-column-content">
                                <div class="card" data-card-id="card">
                                    <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                                    <div class="card-title">test</div>
                                </div>
                            </div>
                        </div>
                        <div class="board-column column-in-progress">
                            <div class="board-column-title">In Progress</div>
                            <div class="board-column-content">
                                <div class="card" data-card-id="card">
                                    <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                                    <div class="card-title">test</div>
                                </div>
                            </div>
                        </div>
                        <div class="board-column column-testing">
                            <div class="board-column-title">Testing</div>
                            <div class="board-column-content">
                                <div class="card" data-card-id="card">
                                    <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                                    <div class="card-title">test</div>
                                </div>
                            </div>
                        </div>
                        <div class="board-column column-done">
                            <div class="board-column-title">Done</div>
                            <div class="board-column-content">
                                <div class="card" data-card-id="card">
                                    <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                                    <div class="card-title">test</div>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
}

            // <section class="board">
            //     <div class="board-header" data-board-id=${board.id}>
            //         <span class="board-title">${board.title}</span>
            //         <button class="toggle-board-button" data-board-id="${board.id}">Show Cards</button>
            //         <button class="board-add">Add Card</button>
            //         <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
            //     </div>
            //     <div class="board-columns">
            //         <div class="board-column column-new">
            //             <div class="board-column-title">New</div>
            //             <div class="board-column-content"></div>
            //         </div>
            //         <div class="board-column column-in-progress">
            //             <div class="board-column-title">In Progress</div>
            //             <div class="board-column-content"></div>
            //         </div>
            //         <div class="board-column column-testing">
            //             <div class="board-column-title">Testing</div>
            //             <div class="board-column-content"></div>
            //         </div>
            //         <div class="board-column column-done">
            //             <div class="board-column-title">Done</div>
            //             <div class="board-column-content"></div>
            //         </div>
            //     </div>
            // </section>

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}">
                <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                <div class="card-title">${card.title}</div>
            </div>`;

}

