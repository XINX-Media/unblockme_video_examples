const { init, ObjectModel } = require("./db");

// https://stackoverflow.com/a/1349426
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

init().then(async () => {
    const max = 1000000
    for (let i=0;i<max;i++) {
        await ObjectModel.insert({
            string: makeid(70),
        });
        if (i % 1000 == 0) {
            console.log(`${i}/${max}`);
        }
    }
    process.exit(0);
});