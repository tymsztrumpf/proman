import { dropManager } from "../controller/control_drag.js";
import { dataHandler } from "../data/dataHandler.js";
import { domManager } from "../view/domManager.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";

export let cardsManager = {
  loadCards: async function (boardId) {
    const cards = await dataHandler.getCardsByBoardId(boardId);
    if (BoardElemetnsAreEmpty(boardId)) {
      for (let card of cards) {
        addCardToBoard(card, boardId);
        dropManager.initDragAndDrop();
        add_text_change(card);
      }
      domManager.addEventListener(
        `.CreateCard[data-board-id="${boardId}"]`,
        "click",
        createCard
      );
    }
  },
};

function addCardToBoard(card, boardId) {
  const cardBuilder = htmlFactory(htmlTemplates.card);
  const content = cardBuilder(card, boardId);
  if (card["status_id"] === 1)
    domManager.addChild(`.NEW[data-board-id="${boardId}"]`, content);
  if (card["status_id"] === 2)
    domManager.addChild(`.IP[data-board-id="${boardId}"]`, content);
  if (card["status_id"] === 3)
    domManager.addChild(`.T[data-board-id="${boardId}"]`, content);
  if (card["status_id"] === 4)
    domManager.addChild(`.DONE[data-board-id="${boardId}"]`, content);
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
  return [
    document.querySelector(`.NEW[data-board-id="${boardId}"]`).innerHTML,
    document.querySelector(`.IP[data-board-id="${boardId}"]`).innerHTML,
    document.querySelector(`.T[data-board-id="${boardId}"]`).innerHTML,
    document.querySelector(`.T[data-board-id="${boardId}"]`).innerHTML,
  ];
}
function BoardElemetnsAreEmpty(boardId) {
  let BoardElements = takeBoardElements(boardId);
  for (let Element of BoardElements) {
    if (Element != "") {
      return false;
    }
  }
  return true;
}

function createCard(clickEvent) {
  const boardId = clickEvent.currentTarget.getAttribute("data-board-id");
  dataHandler.createNewCard(boardId).then((json) => {
    json.forEach((element) => {
      const cardBuilder = htmlFactory(htmlTemplates.card);
      const content = cardBuilder(element, boardId);
      domManager.addChild(`.NEW[data-board-id="${boardId}"]`, content);
      add_text_change(element);
      dropManager.initDragAndDrop();
    });
  });
}

function changeCardTextOn(clickEvent) {
  clickEvent.currentTarget.firstChild.disabled = false;
}
function changeCardTextOff(clickEvent) {
  let cardTitle = clickEvent.currentTarget.firstChild.value;
  let cardId = clickEvent.currentTarget.getAttribute("data-card-id");
  clickEvent.currentTarget.firstChild.disabled = true;
  dataHandler.changeCardTitle(cardId, cardTitle);
}
