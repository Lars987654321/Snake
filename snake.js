const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let snake = [
    { x: 120, y: 120 },
    { x: 80, y: 120 },
    { x: 40, y: 120 },
];

let fruit = { x: 360, y: 360}

let direction = "right"
let nextDirection = "right"
let isGameRunning = true

document.addEventListener("keydown", (event) => {
        if (event.key === "w" || event.key === "W" || event.key === "ArrowUp") {
            if (direction !== "down") {
                nextDirection = "up"
            }
        } else if (event.key === "d" || event.key === "D" || event.key === "ArrowRight") {
            if (direction !== "left") {
                nextDirection = "right"
            }
        } else if (event.key === "s" || event.key === "S" || event.key === "ArrowDown") {
            if (direction !== "up") {
                nextDirection = "down"
            }
        } else if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft") {
            if (direction !== "right") {
                nextDirection = "left"
            }
        }
})

function spawnFruit() {
    fruit.x = Math.floor(Math.random() * canvas.width/40) * 40;
    fruit.y = Math.floor(Math.random() * canvas.height/40) * 40;
}

function checkCollision() {

}

function eatFruit() {
    if (snake[0].y === fruit.y && snake[0].x === fruit.x){
        spawnFruit()
    }
}

function movement() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "green"
    for (i in snake) {
        ctx.fillRect(snake[i].x, snake[i].y, 40, 40)
    }
    ctx.fillStyle = "red"
    ctx.fillRect(fruit.x + 5, fruit.y + 5, 30, 30)
    direction = nextDirection
    if (direction === "up" && snake[0].y > 0) {
        for (i in snake) {
            if (i != 0) {
                snake[snake.length - i].x = snake[snake.length - i - 1].x
                snake[snake.length - i].y = snake[snake.length - i - 1].y
            }
        }
        snake[0].y -= 40
    } else if (direction === "right" && snake[0].x < canvas.width - 40) {
        for (i in snake) {
            if (i != 0) {
                snake[snake.length - i].x = snake[snake.length - i - 1].x
                snake[snake.length - i].y = snake[snake.length - i - 1].y
            }
        }
        snake[0].x += 40
    } else if (direction === "down" && snake[0].y < canvas.height - 40) {
        for (i in snake) {
            if (i != 0) {
                snake[snake.length - i].x = snake[snake.length - i - 1].x
                snake[snake.length - i].y = snake[snake.length - i - 1].y
            }
        }
        snake[0].y += 40
    } else if (direction === "left" && snake[0].x > 0) {
        for (i in snake) {
            if (i != 0) {
                snake[snake.length - i].x = snake[snake.length - i - 1].x
                snake[snake.length - i].y = snake[snake.length - i - 1].y
            }
        }
        snake[0].x -= 40
    } else {
        isGameRunning = false
    }
}

setInterval(function () {
    if (isGameRunning) {
        movement()
        checkCollision()
        eatFruit()
    }
}, 150);