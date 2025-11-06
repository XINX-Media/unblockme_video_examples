function createVisualCard(nameSignal, image) {
    const card = document.createElement("visual-card");
    card.setAttribute("title", nameSignal.getValue());
    card.setAttribute("image", image);

    nameSignal.observe((newName) => {
        card.setAttribute("title", newName);
    });

    return card;
}

class VisualCard extends HTMLElement {
    static observedAttributes = ["title", "image"];

    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });

        const wrapper = document.createElement("div");
        wrapper.style.border = "1px solid black";
        wrapper.style.borderRadius = '5px';
        wrapper.style.display = 'inline-flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.alignItems = 'center';

        const img = document.createElement("img");
        img.src = this.getAttribute("image");
        img.style.width = "50px";
        img.style.height = "50px";
        img.style.borderTopLeftRadius = '5px';
        img.style.borderTopRightRadius = '5px';
        wrapper.appendChild(img);

        const title = document.createElement("div");
        title.textContent = this.getAttribute("title");
        title.style.textAlign = 'center';
        title.style.padding = '5px';
        title.setAttribute("id", "title");
        wrapper.appendChild(title);

        shadow.appendChild(wrapper);
    }

    disconnectedCallback() {
        console.log("Custom element removed from page.");
    }

    adoptedCallback() {
        console.log("Custom element moved to new page.");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "title") {
            const titleElem = this.shadowRoot?.getElementById("title");
            if (titleElem) {
                titleElem.textContent = newValue;
            }
        }
    }
}

customElements.define("visual-card", VisualCard);