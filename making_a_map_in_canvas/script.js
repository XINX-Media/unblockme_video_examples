const canvasObj = document.getElementById("canvas");
const imageHolder = document.getElementById("image_holder");
const mapWidthHolder = document.getElementById("map_width_holder");
const mapHeightHolder = document.getElementById("map_height_holder");
const cellSizeHolder = document.getElementById("cell_size_holder");
const generateMapButton = document.getElementById("generate_map_button");
const hiddenCanvas = document.getElementById("hidden_canvas");
const saveMapButton = document.getElementById("save_map_button");

let prevX = null;
let prevY = null;
canvasObj.addEventListener("mousemove", (event) => {
    const { x, y } = event;
    if (!event.buttons) {
        prevX = x;
        prevY = y;
        return;
    }

    if (prevX === null) {
        prevX = x;
        prevY = y;
    }

    const diffX = prevX - x;
    const diffY = prevY - y;

    mapOffsetX -= diffX;
    mapOffsetY -= diffY;

    prevX = x;
    prevY = y;

    renderMap();
});

canvasObj.addEventListener("mousewheel", (event) => {
    // calculate unit-diff will be between -1 and 1
    const diff = event.deltaY / Math.abs(event.deltaY);

    mapZoomLevel -= diff * 10;

    if (mapZoomLevel < minZoom) {
        mapZoomLevel = minZoom;
    }
    if (mapZoomLevel > maxZoom) {
        mapZoomLevel = maxZoom;
    }

    renderMap();

    event.preventDefault();
});

const context = canvasObj.getContext("2d");

function shape(context, points, color, fill=true) {
    context.save();
    // set color
    context.strokeStyle = color;
    context.fillStyle = color;
    // start a draw path
    context.beginPath();
    // place pen on paper
    context.moveTo(points[0].x, points[0].y);
    for (let i=1;i<points.length;i++) {
        context.lineTo(points[i].x, points[i].y);
    }
    // end draw path (take pen off paper)
    context.closePath();
    // actually do the drawing that I just outlined
    if (!fill) {
        context.stroke();
    } else {
        context.fill();
    }

    context.restore();
}

function line(context, points, color) {
    shape(context, points, color, false);
}
/*
shape([
    {x:100, y:100},
    {x:100, y:200},
    {x:200, y:200},
], "#f00", true);

shape([
    { x: 200, y: 200 },
    { x: 300, y: 300 },
    { x: 400, y: 200 },
], "#000", true);

context.drawImage(imageHolder, 0, 0, 100, 100);

line([
    {x:300, y:0},
    {x:300, y:300},
], "#000");

*/

let mapOffsetX = 0;
let mapOffsetY = 0;
let mapZoomLevel = 100;
const minZoom = 10;
const maxZoom = 200;
const startMapX = 0;
const startMapY = 0;
let startMapWidth = 1000;
let startMapHeight = 1000;
let startCellSize = 25;
let tree = new Tree(EMPTY, 0, 0, startMapWidth/startCellSize, startMapHeight/startCellSize);

function drawMap() {
    const context = hiddenCanvas.getContext("2d");
    hiddenCanvas.width = startMapWidth;
    hiddenCanvas.height = startMapHeight;

    const mapX = startMapX;
    const mapY = startMapY;
    const cellSize = startCellSize;
    const mapWidth = startMapWidth;
    const mapHeight = startMapHeight;

    shape(context, [
        {x: mapX, y: mapY},
        {x: mapX + mapWidth, y: mapY},
        {x: mapX + mapWidth, y: mapY + mapHeight},
        {x: mapX, y: mapY + mapHeight},
    ], "#0a0", true);

    /*for (const cell of cells) {
        let { x, y, color } = cell;

        x *= cellSize;
        y *= cellSize;
        x += mapX;
        y += mapY;

        shape(context, [
            {x, y},
            {x: x+cellSize, y},
            {x: x+cellSize, y:y+cellSize},
            {x, y: y+cellSize},
        ], color, true);
    }*/

    let drawCount = 0;
    tree.recurse((cell) => {
        let { x, y, width, height, value } = cell;
        const color = COLORS[value];

        if (cell.children.length) {
            return;
        }

        //console.log(color, value);

        x *= cellSize;
        y *= cellSize;
        x += mapX;
        y += mapY;
        width *= cellSize;
        height *= cellSize;

        shape(context, [
            {x, y},
            {x: x+width, y},
            {x: x+width, y:y+height},
            {x, y: y+height},
        ], color, true);
        drawCount ++;
    });
    console.log('render drew ', drawCount);

    shape(context, [
        {x: mapX, y: mapY},
        {x: mapX + mapWidth, y: mapY},
        {x: mapX + mapWidth, y: mapY + mapHeight},
        {x: mapX, y: mapY + mapHeight},
    ], "#000", false);

    for (let i=mapX;i<mapX+mapWidth;i+=cellSize) {
        line(context, [{x:i,y:mapY},{x:i,y:mapY + mapHeight}], "#000");
    }

    for (let i=mapY;i<mapY+mapHeight;i+=cellSize) {
        line(context, [{x:mapX,y:i},{x:mapX+mapWidth,y:i}], "#000");
    }

    tree.recurse((cell) => {
        let { x, y, width, height } = cell;

        x *= cellSize;
        y *= cellSize;
        x += mapX;
        y += mapY;
        width *= cellSize;
        height *= cellSize;

        shape(context, [
            {x, y},
            {x: x+width, y},
            {x: x+width, y:y+height},
            {x, y: y+height},
        ], "#f00", false);
        drawCount ++;
    });
}

function renderMap() {
    shape(context, [
        {x:0,y:0},
        {x:400,y:0},
        {x:400,y:400},
        {x:0,y:400},
    ],"#fff",true);

    context.drawImage(hiddenCanvas, mapOffsetX, mapOffsetY, startMapWidth * (mapZoomLevel / 100), startMapHeight * (mapZoomLevel / 100));
}

drawMap();
renderMap();

mapWidthHolder.value = startMapWidth;
mapHeightHolder.value = startMapHeight;
cellSizeHolder.value = startCellSize;

mapWidthHolder.addEventListener("change", () => {
    startMapWidth = mapWidthHolder.value;

    drawMap();
    renderMap();
});

mapHeightHolder.addEventListener("change", () => {
    startMapHeight = mapHeightHolder.value;

    drawMap();
    renderMap();
});

cellSizeHolder.addEventListener("change", () => {
    startCellSize = cellSizeHolder.value;

    drawMap();
    renderMap();
});

generateMapButton.addEventListener("click", () => {
    const heightInCells = Math.floor(startMapHeight / startCellSize);
    const widthInCells = Math.floor(startMapWidth / startCellSize);

    tree = new Tree(EMPTY, 0, 0, widthInCells, heightInCells);

    generateMap(widthInCells, heightInCells, tree.get.bind(tree), tree.set.bind(tree));

    for (let i=0;i<widthInCells;i++) {
        for (let j=0;j<heightInCells;j++) {
            const neighbors = [
                tree.get(i-1, j),
                tree.get(i, j-1),
                tree.get(i+1, j),
                tree.get(i, j+1),
            ];
            const neighborsNotEmpty = neighbors.filter((e) => e !== EMPTY);
            const uniqueNeighbors = Array.from(new Set(neighborsNotEmpty));

            //console.log(i, j, neighbors, uniqueNeighbors);

            if (uniqueNeighbors.length < 2) {
                tree.set(i, j, uniqueNeighbors[0]);
            }
        }
    }

    drawMap();
    renderMap();
});

saveMapButton.addEventListener("click", () => {
    const rawDataUrl = hiddenCanvas.toDataURL("image/png");

    var a = document.createElement("a"); //Create <a>
    a.href = rawDataUrl; //Image Base64 Goes here
    a.download = "Image.png"; //File name Here
    a.click(); //Downloaded file
    //console.log(rawDataUrl);
});