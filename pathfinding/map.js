const minZoom = 10;
const maxZoom = 200;
const startMapX = 0;
const startMapY = 0;
const startCellSize = 25;

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

class Map {
    constructor(canvasId, renderFn, width = 1000, height = 1000) {
        this.canvasObj = document.getElementById(canvasId);
        this.hiddenCanvas = document.createElement("canvas");
        this.renderFn = renderFn;

        this.mapOffsetX = 0;
        this.mapOffsetY = 0;
        this.mapZoomLevel = 100;
        this.startMapWidth = width;
        this.startMapHeight = height;

        this.tree = new Tree(EMPTY, 0, 0, this.startMapWidth/startCellSize, this.startMapHeight/startCellSize);
            
        let prevX = null;
        let prevY = null;
        this.canvasObj.addEventListener("mousemove", (event) => {
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

            this.mapOffsetX -= diffX;
            this.mapOffsetY -= diffY;

            prevX = x;
            prevY = y;

            this.renderFn();
        });

        this.canvasObj.addEventListener("mousewheel", (event) => {
            // calculate unit-diff will be between -1 and 1
            const diff = event.deltaY / Math.abs(event.deltaY);

            this.mapZoomLevel -= diff * 10;

            if (this.mapZoomLevel < minZoom) {
                this.mapZoomLevel = minZoom;
            }
            if (this.mapZoomLevel > maxZoom) {
                this.mapZoomLevel = maxZoom;
            }

            this.renderFn();

            event.preventDefault();
        });
        
        this.context = this.canvasObj.getContext("2d");
    }

    drawMap() {
        const context = this.hiddenCanvas.getContext("2d");
        this.hiddenCanvas.width = this.startMapWidth;
        this.hiddenCanvas.height = this.startMapHeight;

        const mapX = startMapX;
        const mapY = startMapY;
        const cellSize = startCellSize;
        const mapWidth = this.startMapWidth;
        const mapHeight = this.startMapHeight;

        shape(context, [
            {x: mapX, y: mapY},
            {x: mapX + mapWidth, y: mapY},
            {x: mapX + mapWidth, y: mapY + mapHeight},
            {x: mapX, y: mapY + mapHeight},
        ], "#0a0", true);

        let drawCount = 0;
        this.tree.recurse((cell) => {
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

        this.tree.recurse((cell) => {
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

    renderMap() {
        this.context.drawImage(
            this.hiddenCanvas,
            this.mapOffsetX,
            this.mapOffsetY,
            this.startMapWidth * (this.mapZoomLevel / 100),
            this.startMapHeight * (this.mapZoomLevel / 100),
        );
    }

    getCellFromReal(x, y) {
        // NEEDS ZOOM HANDLING
        return {
            x: Math.floor((x - this.mapOffsetX)/startCellSize),
            y: Math.floor((y - this.mapOffsetY)/startCellSize),
        };
    }
}