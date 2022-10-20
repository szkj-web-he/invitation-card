export const mountElement = (el?: Element): Element => {
    if (el) {
        return el;
    }
    let node = document.querySelector("body > div[data-type=r_portal]");

    if (!node) {
        node = document.createElement("div");
        node.setAttribute("data-type", "r_portal");
        node.setAttribute("style", "height: 0;position: absolute;top: 0;left: 0;");
        document.body.appendChild(node);
    }

    return node;
};
