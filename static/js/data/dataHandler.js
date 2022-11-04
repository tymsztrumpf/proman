export let dataHandler = {
    getBoards: async function () {
        return await apiGet("/api/boards");
    },
    getBoard: async function (boardId) {
        return await apiGet(`/api/boards/${boardId}`)
    },
    getStatuses: async function () {
        return await apiGet(`/api/statuses`)
    },
    getStatus: async function (statusId) {
        return await apiGet(`/api/statuses/${statusId}`)
    },
    getCardsByBoardId: async function (boardId) {
        return await apiGet(`/api/boards/${boardId}/cards/`);
    },
    changeCardStatus: async function(boardId, cardId, status){
        await apiPut(`/api/boards/${boardId}/${cardId}/${status}`)
    },
    changeCardOrder: async function(cardId,cardOrder){
        await apiPost(`/api/boards/cards/${cardId}/${cardOrder}`)
    },
    changeCardTitle: async function(boardId, cardId, title){
        await apiPut(`/api/boards/${boardId}/${cardId}/title/${title}`)
    },
    createNewBoard: async function (boardTitle) {
        await apiPost(`/api/boards/${boardTitle}`)
    },
    createNewCard: async function (boardId ) {
        return await apiPost(`/api/boards/${boardId}/newcard`)
    },
};

async function apiGet(url) {
    let response = await fetch(url, {
        method: "GET",
    });
    if (response.ok) {
        return await response.json();
    }
}

async function apiPost(url, payload) {
    let response = await fetch(url, {
        method: "POST",
        "headers": {"Content-Type": "application/json"},
        "body": JSON.stringify(payload)
    });
    if (response.ok){
        return await response.json(); 
    } 
}

async function apiDelete(url) {
    let response = await fetch(url, {
        method: "DELETE",
    });
    if (response.ok) {
        return await response.json();
    }
}

async function apiPut(url) { //update
    let response = await fetch(url, {
        method: "PUT",
    });
    if (response.ok) {
        return await response.json();
    }
}

async function apiPatch(url) {
    let response = await fetch(url, {
        method: "PATCH",
    });
    if (response.ok) {
        return await response.json();
    }
}
