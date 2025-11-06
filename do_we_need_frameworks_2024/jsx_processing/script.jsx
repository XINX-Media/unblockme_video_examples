class VisualCard extends HTMLElement {
    static observedAttributes = ["title", "image"];

    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });

        const wrapper = <div
            style={{
                border: '1px solid black',
                borderRadius: 5,
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <img 
                src={this.getAttribute("image")}
                style={{
                    width: '50px',
                    height: '50px',
                    borderTopLeftRadius: '5px',
                    borderTopRightRadius: '5px',
                }}
            />
            <div style={{
                textAlign: 'center',
                padding: '5px',
                id: 'title',
            }}>
                {this.getAttribute("title")}
            </div>
        </div>;

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