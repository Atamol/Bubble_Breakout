let isPopped = new Array(10);
let ballVisible = true;
let startTime;
let gameStarted = false;

function setup() {
  createCanvas(400, 400);
  resetGame();
}

let x;
let y;
let dx = 0;
let dy = 0; // 最初は停止

function draw() {
  background(220);

  // バブル
  for (let i = 0; i < 10; i++) {
    if (isPopped[i] == true) {
      continue;
    }
    let bbl_y = i < 5 ? 20 : 80; // 二段目のバブルはキャンパスの上辺に接する
    let bbl_x = 80 + 60 * (i % 5);
    circle(bbl_x, bbl_y, 40);
  }

  // ラケットとボールの判定
  for (let i = 0; i < 10; i++) {
    if (isPopped[i] == true) {
      continue;
    }
    let bbl_y = i < 5 ? 20 : 80; // 二段目のバブルはキャンバスの上辺に接する
    let bbl_x = 80 + 60 * (i % 5);
    let d = dist(x, y, bbl_x, bbl_y);
    if (d <= 35) {
      dy = -dy;
      dx = random(-3, 3); // ボールがヒットしたとき，反射後のx方向の軌道をランダムに変える
      isPopped[i] = true;
    }
  }

  // ラケット
  let rx = mouseX;
  let ry = 350;
  if (mouseX <= 40) {
    rx = 40;
  } else if (mouseX >= 360) {
    rx = 360;
  }
  rect(rx - 40, ry, 80, 10);

  // ボール
  if (millis() - startTime > 2000 && !gameStarted) {
    dx = random(-6, 6);
    dy = 6;
    gameStarted = true;
  }

  if (ballVisible) {
    x = x + dx;
    y = y + dy;
    if (x <= 15 || x >= 385) {
      dx = -dx;
    }
    if (y <= 15) {
      dy = -dy;
    }

    // ボールとラケットの衝突
    if (x >= rx - 40 && x <= rx + 40 && y + 15 >= ry && y - 15 <= ry + 10) {
      dy = -dy;
      let hitPos = (x - (rx - 40)) / 80;
      dx = 6 * (hitPos - 0.5);
    }

    circle(x, y, 30);
  }

  // ボールがキャンパスから外れたとき，ゲームをリセットする
  if (y > height) {
    resetGame();
  }

  // すべてのバブルが消えたとき，ゲームをリセットする
  if (isPopped.every((popped) => popped)) {
    resetGame();
  }
}

// ゲームのリセット
function resetGame() {
  for (let i = 0; i < 10; i++) {
    isPopped[i] = false;
  }
  x = 200;
  y = 150;
  dx = 0;
  dy = 0;
  ballVisible = true;
  gameStarted = false;
  startTime = millis();
}
