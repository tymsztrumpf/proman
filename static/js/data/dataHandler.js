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
    getCard: async function (cardId) {
        return await apiGet(`/api/boards/cards/${cardId}`);
    },
    changeCardStatus: async function(cardId,status){
        await apiPost(`/api/boards/cards/${cardId}/${status}`)
    },
    changeCardOrder: async function(cardId,cardOrder){
        await apiPost(`/api/boards/cards/${cardId}/${cardOrder}`)
    },
    changeCardTitle: async function(cardId,title){
        await apiPost(`/api/boards/cards/${cardId}/${title}`)
    },
    createNewBoard: async function (boardTitle) {
        await apiPost(`/api/boards/${boardTitle}`)///?????????????????????????
    },
    createNewCard: async function (cardTitle ,boardId ,statusId) {
        await apiPost(`/api/boards/${boardId}/cards/`,{'cardTitle':cardTitle,'statusId':statusId})
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
    if (response.ok) return await response.json();
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
