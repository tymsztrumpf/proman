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
      console.log("cardid:",cardId,"counter:",counter)
      dataHandler.changeCardOrder(cardId, counter)
    })
  }
};

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
  console.log(cardCounter)
  dataHandler.createNewCard(boardId,cardStatus,cardCounter).then((json) => {
    json.forEach((element) => {
      const cardBuilder = htmlFactory(htmlTemplates.card);
      const content = cardBuilder(element, boardId);
      domManager.addChild('.card-slot[data-column-id="1"]', content);
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
