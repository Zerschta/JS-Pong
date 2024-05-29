<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pong Game</title>
    <style>
        canvas {
            display: block;
            margin: auto;
            background: #000;
        }
    </style>
</head>
<body>
    <canvas id="pongCanvas" width="800" height="400"></canvas>
    <script>
        const canvas = document.getElementById('pongCanvas');
        const context = canvas.getContext('2d');

        const paddleWidth = 10, paddleHeight = 100, ballRadius = 10;
        let upPressed = false, downPressed = false;

        const paddle1 = { x: 0, y: (canvas.height - paddleHeight) / 2, width: paddleWidth, height: paddleHeight };
        const paddle2 = { x: canvas.width - paddleWidth, y: (canvas.height - paddleHeight) / 2, width: paddleWidth, height: paddleHeight };
        const ball = { x: canvas.width / 2, y: canvas.height / 2, radius: ballRadius, dx: 2, dy: -2 };

        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);

        function keyDownHandler(e) {
            if (e.key === 'ArrowUp') {
                upPressed = true;
            } else if (e.key === 'ArrowDown') {
                downPressed = true;
            }
        }

        function keyUpHandler(e) {
            if (e.key === 'ArrowUp') {
                upPressed = false;
            } else if (e.key === 'ArrowDown') {
                downPressed = false;
            }
        }

        function drawPaddle(paddle) {
            context.fillStyle = '#FFF';
            context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
        }

        function drawBall() {
            context.beginPath();
            context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            context.fillStyle = '#FFF';
            context.fill();
            context.closePath();
        }

        function movePaddle(paddle, dy) {
            paddle.y += dy;
            if (paddle.y < 0) {
                paddle.y = 0;
            } else if (paddle.y + paddle.height > canvas.height) {
                paddle.y = canvas.height - paddle.height;
            }
        }

        function moveBall() {
            ball.x += ball.dx;
            ball.y += ball.dy;

            if (ball.y + ball.dy < ball.radius || ball.y + ball.dy > canvas.height - ball.radius) {
                ball.dy = -ball.dy;
            }

            if (ball.x + ball.dx < ball.radius) {
                if (ball.y > paddle1.y && ball.y < paddle1.y + paddle1.height) {
                    ball.dx = -ball.dx;
                } else {
                    resetBall();
                }
            } else if (ball.x + ball.dx > canvas.width - ball.radius) {
                if (ball.y > paddle2.y && ball.y < paddle2.y + paddle2.height) {
                    ball.dx = -ball.dx;
                } else {
                    resetBall();
                }
            }
        }

        function resetBall() {
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            ball.dx = -ball.dx;
            ball.dy = 2 * (Math.random() > 0.5 ? 1 : -1);
        }

        function draw() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawPaddle(paddle1);
            drawPaddle(paddle2);
            drawBall();

            moveBall();

            if (upPressed) {
                movePaddle(paddle2, -5);
            } else if (downPressed) {
                movePaddle(paddle2, 5);
            }

            requestAnimationFrame(draw);
        }

        draw();
    </script>
</body>
</html>
