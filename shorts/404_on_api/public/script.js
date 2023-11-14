fetch("/mee").then((result) => {
    if (result.ok) {
        return result.json();
    }
}).then((data) => {
    console.log(data);
});