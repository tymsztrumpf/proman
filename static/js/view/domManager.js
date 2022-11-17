export let domManager = {
    addChild(parentIdentifier, childContent) {
        const parent = document.querySelector(parentIdentifier);
        if (parent) {
            parent.insertAdjacentHTML("beforeend", childContent);
        } else {
            console.error("could not find such html element: " + parentIdentifier);
        }
    },
    addEventListener(parentIdentifier, eventType, eventHandler) {
        const parent = document.querySelector(parentIdentifier);
        if (parent) {
            parent.addEventListener(eventType, eventHandler);
        } else {
            console.error("could not find such html element: " + parentIdentifier);
        }
    },
    deleteChild(parentIdentifier, childIdentifier){
        const parent = document.querySelector(parentIdentifier);
        console.log(parent, childIdentifier)
        if (parent) {
            parent.removeChild(childIdentifier);
        } else {
            console.error("could not find such html element" + parentIdentifier)
        }

    }
};