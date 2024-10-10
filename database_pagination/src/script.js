/*
This script performs some action over every single element in the database
*/

const { ORDER, WhereBuilder, WHERE_COMPARE } = require("@bucky24/database");
const { init, ObjectModel } = require("./db");
const performComplexOperation = require("./operations");

async function main() {
    await init();

    // Get all objects from the database
    const PAGE_SIZE = 100000;
    let offsetId = 0;

    let objects = [];
    do {
        const builder = WhereBuilder.new()
            .compare('id', WHERE_COMPARE.GT, offsetId);
        objects = await ObjectModel.search(builder, {'id': ORDER.ASC }, PAGE_SIZE);

        console.log(`Got ${objects.length} objects with ${offsetId}`);
        console.log(`Using ${process.memoryUsage().heapUsed / 1024 / 1024}MB heap memory`);

        for (const object of objects) {
            await performComplexOperation(object);
            offsetId = object.id;
        }
    } while (objects.length > 0);

    console.log(`All done!`);
}

main().then(() => {
    process.exit(0);
});