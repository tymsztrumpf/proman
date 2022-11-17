import { dropManager } from "../controller/control_drag.js";
import { dataHandler } from "../data/dataHandler.js";
import { domManager } from "../view/domManager.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";

export let cardsManager = {
  loadCards: async function (boardId) {
    const cards = await dataHandler.getCardsByBoardId(boardId);
    if (boardElemetnsAreEmpty(boardId)) {
      for (let card of cards) {
        addCardToColumn(card, boardId);
        dropManager.initDragAndDrop();
        add_text_change(card);
        add_fun_to_del_button(card);
      }
      domManager.addEventListener(
          `.CreateCard[data-board-id="${boardId}"]`,
          "click",
          createCard
      );
    }
  },
  changeOrdercard(boardId){
    let counter = 1;
    let lastCardStatus = 0
    document.querySelectorAll(`.card[data-board-id="${boardId}"]`).forEach(card => {
      let cardId = card.dataset.cardId
      if (lastCardStatus !== card.dataset.cardStatus){
        lastCardStatus = card.dataset.cardStatus
        counter = 1
      }
      else{
        counter ++
      }
      dataHandler.changeCardOrder(cardId, counter)
    })
  }
};

function add_fun_to_del_button(card) {
  domManager.addEventListener(
          `.DeleteCard[data-card-id="${card.id}"]`,
          "click",
          deleteCard)
}

function deleteCard(clickEvent) {
  let cardId = clickEvent.target.dataset.cardId
  let boardId = clickEvent.target.dataset.boardId
  let columnStatus  = document.querySelector(`.card[data-card-id="${cardId}"]`).dataset.cardStatus

  domManager.deleteChild(`.card-slot[data-column-status="${columnStatus}"][data-board-id = "${boardId}"]`,
    document.querySelector(`.card[data-card-id="${cardId}"]`))
  dataHandler.deleteCard(cardId)
}

async function addCardToColumn(card, boardId) {
  const cardBuilder = htmlFactory(htmlTemplates.card);
  const content = cardBuilder(card, boardId);
  domManager.addChild(`[data-column-status="${card.status_id}"][data-board-id="${boardId}"]`, content);
}

function add_text_change(card) {
  domManager.addEventListener(
    `.card[data-card-id="${card.id}"]`,
    "dblclick",
    changeCardTextOn
  );
  domManager.addEventListener(
    `.card[data-card-id="${card.id}"]`,
    "mouseleave",
    changeCardTextOff
  );
}

function takeBoardElements(boardId) {
  let elements = []
  document.querySelectorAll(`.card-slot[data-board-id="${boardId}"]`).forEach(element => {
    elements.push(element.innerHTML);
  })
  return elements
}
function boardElemetnsAreEmpty(boardId) {
  let boardElements = takeBoardElements(boardId);
  for (let Element of boardElements) {
    if (Element != "") {
      return false;
    }
  }
  return true;
}

function createCard(clickEvent) {
  const boardId = clickEvent.currentTarget.getAttribute("data-board-id");
  const cardStatus = document.querySelector('.card-slot[data-column-id="1"]').dataset.columnStatus
  const cardCounter = document.querySelector('.card-slot[data-column-id="1"]').innerHTML.split('</div>').length
  dataHandler.createNewCard(boardId,cardStatus,cardCounter).then((json) => {
    json.forEach((element) => {
      const cardBuilder = htmlFactory(htmlTemplates.card);
      const content = cardBuilder(element, boardId);
      domManager.addChild(`.card-slot[data-column-id="1"][data-board-id="${boardId}"]`, content);
      add_text_change(element);
      dropManager.initDragAndDrop();
      add_fun_to_del_button(element)
    });
  });
}

function changeCardTextOn(clickEvent) {
  clickEvent.currentTarget.firstChild.children[0].disabled = false;
}
function changeCardTextOff(clickEvent) {
  let cardTitle = clickEvent.currentTarget.firstChild.children[0].value;
  let cardId = clickEvent.currentTarget.getAttribute("data-card-id");
  clickEvent.currentTarget.firstChild.children[0].disabled = true;
  dataHandler.changeCardTitle(cardId, cardTitle);
}
