document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("/login", {
        method: "POST",
        body: JSON.stringify({
            username,
            password
        }),
        headers: {
            "Content-Type": "application/json"
        },
    }).then((response) => {
        if (!response.ok) {
            response.json().then((data) => {
                console.error(data);
            });
            return;
        }

        response.json().then((data) => {
            const token = data.token;
            document.getElementById("token_holder").innerText = token;
        });
    })
});