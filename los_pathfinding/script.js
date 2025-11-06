const canvas = document.getElementById('canvas');

const squareSize = 20;
const width = 500;
const height = 500;

const start = [1,1];
const end = [20,20];

const walls = [
    [5, 0, 7, 20],
];

let possiblePoints = [];

setInterval(() => {
    update();
}, 100);

function update() {
    possiblePoints = [];
    possiblePoints.push([...end]);

    for (const wall of walls) {
        const [x1, y1, x2, y2] = wall;
        
        possiblePoints.push([x1, y1]);
        possiblePoints.push([x1, y2]);
        possiblePoints.push([x2, y1]);
        possiblePoints.push([x2, y2]);
    }

    draw();
}

function draw() {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    walls.forEach(([x1, y1, x2, y2]) => {
        ctx.strokeStyle = 'black';
        ctx.strokeRect(x1 * squareSize, y1 * squareSize, (x2-x1) * squareSize, (y2-y1) * squareSize);
    });

    ctx.fillStyle = 'red';
    ctx.fillRect(start[0] * squareSize, start[1] * squareSize, squareSize, squareSize);

    ctx.fillStyle ='blue';
    ctx.fillRect(end[0] * squareSize, end[1] * squareSize, squareSize, squareSize);

    for (const point of possiblePoints) {
        ctx.fillStyle = 'green';
        //console.log(point);
        ctx.fillRect(point[0] * squareSize, point[1] * squareSize, squareSize, squareSize);

        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(start[0] * squareSize, start[1] * squareSize);
        ctx.lineTo(point[0] * squareSize, point[1] * squareSize);
        ctx.stroke();
    }

    ctx.strokeStyle = 'black';
    ctx.strokeRect(0, 0, width, height);
}

