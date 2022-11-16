export let dataHandler = {
    getBoards: async function () {
        return await apiGet("/api/boards");
    },
    getBoardStatuses: async function (boardId) {
        return await apiGet(`/api/boards/${boardId}/statuses`);
    },
    createNewBoard: async function (boardTitle) {
        await apiPost(`/api/boards`, { 'board_title': boardTitle })
    },
    changeBoardName: async function (boardId, boardTitle) {
        await apiPut(`/api/boards/${boardId}/title`, { 'title': boardTitle })
    },
    getCardsByBoardId: async function (boardId) {
        return await apiGet(`/api/boards/${boardId}/cards`);
    },
    createNewCard: async function (boardId,cardStatus,cardCounter) {
        return await apiPost(`/api/boards/${boardId}/cards`,{ 'status': cardStatus,'order':cardCounter })
    },
    changeCardStatus: async function (cardId, cardStatus) {
        await apiPut(`/api/cards/${cardId}/status`, { 'status': cardStatus })
    },
    changeCardOrder: async function (cardId, cardOrder) {
        await apiPut(`/api/cards/${cardId}/order`, { 'order': cardOrder })
    },
    changeCardTitle: async function (cardId, cardTitle) {
        await apiPut(`/api/cards/${cardId}/title`, { 'title': cardTitle })
    },
    changeColumnTitle: async function (columnId, columnTitle) {
        await apiPut(`/api/columns/${columnId}/title`, { 'title': columnTitle })
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
        "headers": { "Content-Type": "application/json" },
        "body": JSON.stringify(payload)
    });
    if (response.ok) {
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

async function apiPut(url, payload) { //update
    let response = await fetch(url, {
        method: "PUT",
        "headers": { "Content-Type": "application/json" },
        "body": JSON.stringify(payload)
    });
    if (response.ok) {
        return await response.json();
    }
}

async function apiPatch(url, payload) {
    let response = await fetch(url, {
        method: "PATCH",
        "headers": { "Content-Type": "application/json" },
        "body": JSON.stringify(payload)
    });
    if (response.ok) {
        return await response.json();
    }
}
