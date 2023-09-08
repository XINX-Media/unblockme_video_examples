document.getElementById("addNameForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById('nameField').value;
    if (name === '') {
        return;
    }

    fetch('/api/name', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            name,
        }),
    }).then((result) => {
        if (result.ok) {
            loadNames();
            document.getElementById('nameField').value = '';
        }
    });
});

function loadNames() {
    const nameContainer = document.getElementById("nameHolder");
    nameContainer.innerHTML = "";

    fetch('/api/name').then((result) => {
        if (result.ok) {
            result.json().then((data) => {
                data.forEach((item) => {
                    const div = document.createElement("div");
                    div.innerText = item.name;
                    nameContainer.appendChild(div);
                });
            });
        }
    });
}

loadNames();