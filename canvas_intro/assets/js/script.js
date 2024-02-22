const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const tag = document.createElement("img");
tag.src = "http://placekitten.com/200/300";

let y2 = 400;
let period = 25;

function draw() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    ctx.clearRect(0, 0, 500, 500);

    ctx.fillStyle = "purple";
    ctx.fillRect(100, 100, 300, 300);

    ctx.save();
    ctx.fillStyle = "green";
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(30, 30);
    ctx.lineTo(300, 400);
    ctx.lineTo(10, 40);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.beginPath();
    ctx.moveTo(300, 300);
    ctx.lineTo(300, y2);
    ctx.closePath();
    ctx.stroke();

    ctx.drawImage(tag, 0, 0, 100, 100);
}

setInterval(() => {
    y2 += period;
    if (y2 > 500 || y2 < 200) {
        period *= -1;
    }
    draw();
}, 100);