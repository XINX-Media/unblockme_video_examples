function handleGreeting(level) {
    switch (level) {
        case "ceo":
            console.log("Welcome in, King of All");
            break;
        case "programmer":
            console.log("Get to work!");
            break;
        default:
            console.log("Dunno who you are!");
    }
}

handleGreeting("ceo");