document.addEventListener("DOMContentLoaded", init);

let canvas;
let ctx;
let points = [];
let pointCount;
let maxDistance;
let linesToDraw = [];
let mousePoint = {};
let stars;

const speed = 0.7;
const initDelay = 10;
const maxPoints = 160;
const pointRatio = 0.05;
const maxAlpha = 1;

class Point {
  constructor(x, y, isMousePoint) {
    this.x = x;
    this.y = y;
    if (isMousePoint) {
      this.speed = { x: 0, y: 0 };
      this.isMousePoint = true;
    } else {
      this.speed = {
        x: speed * -0.5 + Math.random() * speed,
        y: speed * -0.5 + Math.random() * speed,
      };
      this.isMousePoint = false;
    }
  }

  pointsAreClose(point_2) {
    const distance = this.getDistance(point_2);
    return distance < maxDistance && distance > 0;
  }

  getDistance(point_2) {
    return Math.sqrt(
      Math.pow(this.x - point_2.x, 2) + Math.pow(this.y - point_2.y, 2)
    );
  }
}

class Line {
  constructor(point_1, point_2, isMouseLine) {
    this.x1 = point_1.x;
    this.y1 = point_1.y;
    this.x2 = point_2.x;
    this.y2 = point_2.y;
    this.length = point_1.getDistance(point_2);
    this.isMouseLine = isMouseLine;
  }
}

function init() {
  initCanvas();
  createPoints(pointCount);
  createLines();
  draw();
}

function initCanvas() {
  canvas = document.getElementById("canvas");
  const canvasContainer = document.getElementById("canvas-container");
  canvas.width = canvasContainer.clientWidth;
  canvas.height = canvasContainer.clientHeight;
  ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pointCount = Math.min(Math.floor(canvas.width * pointRatio), maxPoints);

  maxDistance = Math.min(canvas.width * 0.15, 240);
}

function createPoints(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const point = new Point(getX(), getY(), false);
      if (points.length < count) {
        points.push(point);
      }
    }, i * initDelay);
  }
}

function getX() {
  return Math.random() * (canvas.width - 40) + 20;
}

function getY() {
  return Math.random() * (canvas.height - 40) + 20;
}

function createLines() {
  linesToDraw = [];
  getMouseLines();
  points.forEach((p, i) => getLines(p, i, false));
}

function getMouseLines() {
  if (mousePoint.isMousePoint) {
    getLines(mousePoint, -1, true);
  }
}

function getLines(point, index, isMouseLine) {
  for (let i = 0; i < points.length; i++) {
    if (point.pointsAreClose(points[i]) && i > index) {
      const line = new Line(point, points[i], isMouseLine);
      linesToDraw.push(line);
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPoints();
  drawLines();
  animate();
  //requestAnimationFrame(() => draw());
  stars = window.requestAnimationFrame(draw);
}

function drawPoints() {
  points.forEach((p) => {
    ctx.fillStyle = "hsla(227, 100%, 51%, 30%)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI);
    ctx.fill();
  });
  if (mousePoint.isMousePoint) {
    drawMousePoint(mousePoint);
  }
}

function drawMousePoint(mP) {
  ctx.fillStyle = "hsla(344, 100%, 37%, 50%)";
  ctx.beginPath();
  ctx.arc(mP.x, mP.y, 4, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = "hsla(344, 100%, 37%, 20%)";
  ctx.beginPath();
  ctx.arc(mP.x, mP.y, 12, 0, 2 * Math.PI);
  ctx.fill();
}

function drawLines() {
  linesToDraw.forEach((l, i) => {
    ctx.strokeStyle = l.isMouseLine ? getLineGradient(l) : getLineColor(l);
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.moveTo(l.x1, l.y1);
    ctx.lineTo(l.x2, l.y2);
    ctx.stroke();
  });
}

function getLineColor(l) {
  const alpha = getStrokeAlpha(l);
  return `hsla(227, 100%, 51%, ${alpha})`;
}

function getLineGradient(l) {
  const alpha = getStrokeAlpha(l);
  let gradient = ctx.createLinearGradient(l.x1, l.y1, l.x2, l.y2);
  gradient.addColorStop(0, `hsla(344, 100%, 47%, ${alpha}`);
  gradient.addColorStop(1, `hsla(227, 100%, 51%, ${alpha}`);
  return gradient;
}

function getStrokeAlpha(l) {
  let alpha;
  const threshold = 0.4 * maxDistance;
  if (l.length <= threshold) {
    return 1 * maxAlpha;
  } else {
    let ratio = 1 - (l.length - threshold) / (maxDistance - threshold);
    alpha = ratio;
    return alpha * maxAlpha;
  }
}

function animate() {
  movePoints();
  createLines();
}

function movePoints() {
  points.forEach((p, i) => {
    p.x = p.x + p.speed.x;
    p.y = p.y + p.speed.y;
    //checkPointPosition(p, i);
    closeXY(p);
    if (i % 3 !== 0) {
      closeMid(p);
      changeSite(p);
    }
  });
}

function closeMid(p) {
  if (
    p.x > 0.5 * canvas.width - 0.1 * canvas.width &&
    p.x < canvas.width * 0.5 + 0.1 * canvas.width
  ) {
    p.speed.x = p.speed.x * -1;
  }
}

function changeSite(p) {
  if (
    p.x > 0.5 * canvas.width - 0.099 * canvas.width &&
    p.x < canvas.width * 0.5 + 0.099 * canvas.width
  ) {
    if (Math.floor(Math.random() * 2) == 0)
      p.x = 0.5 * canvas.width - 0.1 * canvas.width;
    else p.x = canvas.width * 0.5 + 0.1 * canvas.width;
  }
}

function checkPointPosition(point, index) {
  if (outOfView(point)) {
    points.splice(index, 1);
    setTimeout(() => {
      createPoints(1);
      createLines();
    }, 500);
  }
}
function outOfView(p) {
  return (
    p.x < -0.1 * canvas.width ||
    p.x > canvas.width + 0.1 * canvas.width ||
    p.y < -0.1 * canvas.width ||
    p.y > canvas.hight + 0.1 * canvas.width
  );
}

function closeXY(p) {
  if (p.x < 0.001 * canvas.width || p.x > canvas.width - 0.001 * canvas.width) {
    p.speed.x = p.speed.x * -1;
  }
  if (
    p.y < 0.001 * canvas.height ||
    p.y > canvas.height - 0.001 * canvas.height
  ) {
    p.speed.y = p.speed.y * -1;
  }
}

//window.addEventListener('resize', initCanvas());

window.addEventListener("resize", (e) => {
  initCanvas();
  points = [];
  createPoints(pointCount);
});

/* -----------  MOUSE ANIMATION  ------------- */

document.documentElement.addEventListener("mousemove", moveMousePoint);
document.documentElement.addEventListener("mouseleave", removeMousePoint);

function createMousePoint(event) {
  mousePoint = new Point(event.x, event.y, true);
  createLines();
}

function moveMousePoint(event) {
  if (!mousePoint.isMousePoint) {
    createMousePoint(event);
  }
  mousePoint.x = event.x - 1;
  mousePoint.y = event.y - 4;
  createLines();
}

function removeMousePoint() {
  mousePoint.isMousePoint = false;
}
