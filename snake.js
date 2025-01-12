const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const scoreDiv = document.getElementById("score")
const button = document.getElementById("button")
const overlay = document.getElementById("overlay")
const highscores = document.getElementById("highscores")

window.onload = () => {
    loadScores()
    updateHighScoresUI()
};

let snake = [
    { x: 120, y: 120 },
    { x: 80, y: 120 },
    { x: 40, y: 120 },
]

let fruit = { x: 360, y: 360 }

let direction = "right"
let nextDirection = []
let isGameRunning = false
let ateFruit = false
let score = 0
let scores = []

button.addEventListener("click", () => {
    isGameRunning = true
    button.style.display = "none"
    overlay.style.display = "none"
    scoreDiv.innerText = `score: ${score}`
})

document.addEventListener("keydown", (event) => {
    if (event.key === "w" || event.key === "W" || event.key === "ArrowUp") {
        if (direction !== "down" && direction !== "up" && nextDirection[0] !== "up") {
            if (nextDirection.length === 0) {
                nextDirection[0] = "up"
            } else if (nextDirection.length === 1) {
                nextDirection[1] = "up"
            }
        }
    } else if (event.key === "d" || event.key === "D" || event.key === "ArrowRight") {
        if (direction !== "left" && direction !== "right" && nextDirection[0] !== "right") {
            if (nextDirection.length === 0) {
                nextDirection[0] = "right"
            } else if (nextDirection.length === 1) {
                nextDirection[1] = "right"
            }
        }
    } else if (event.key === "s" || event.key === "S" || event.key === "ArrowDown") {
        if (direction !== "up" && direction !== "down" && nextDirection[0] !== "down") {
            if (nextDirection.length === 0) {
                nextDirection[0] = "down"
            } else if (nextDirection.length === 1) {
                nextDirection[1] = "down"
            }
        }
    } else if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft") {
        if (direction !== "right" && direction !== "left" && nextDirection[0] !== "left") {
            if (nextDirection.length === 0) {
                nextDirection[0] = "left"
            } else if (nextDirection.length === 1) {
                nextDirection[1] = "left"
            }
        }
    }
})

function spawnFruit() {
    let validPosition = false
    let x, y

    while (!validPosition) {
        x = Math.floor(Math.random() * (canvas.width / 40)) * 40
        y = Math.floor(Math.random() * (canvas.height / 40)) * 40
        validPosition = true
        for (let i = 0; i < snake.length; i++) {
            if (x === snake[i].x && y === snake[i].y) {
                validPosition = false
                break
            }
        }
    }
    fruit.x = x
    fruit.y = y
}

function saveScores() {
    localStorage.setItem("scores", JSON.stringify(scores))
}

function loadScores() {
    const savedScores = localStorage.getItem("scores")
    if (savedScores) {
        scores = JSON.parse(savedScores)
    } else {
        scores = []
    }
}

function updateHighScoresUI() {
    highscores.innerHTML = ''
    for (let i in scores) {
        const li = document.createElement('li')
        li.textContent = `Score: ${scores[i]}`
        highscores.appendChild(li)
    }
}

function endGame() {
    isGameRunning = false
    button.style.display = "block"
    overlay.style.display = "block"
    button.innerText = "Retry"
    spawnFruit()
    snake = [
        { x: 120, y: 120 },
        { x: 80, y: 120 },
        { x: 40, y: 120 },
    ]

    direction = "right"
    nextDirection = []
    scores.push(score)
    scores.sort((a, b) => b - a)

    if (scores.length > 10) {
        scores.pop()
    }

    saveScores()
    updateHighScoresUI()

    score = 0
}

function checkCollision() {
    for (i in snake) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y && i != 0) {
            endGame()
        }
    }
}

function eatFruit() {
    if (snake[0].y === fruit.y && snake[0].x === fruit.x) {
        spawnFruit()
        ateFruit = true
        score++
        scoreDiv.innerText = `score: ${score}`
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (i in snake) {
        if (i < 26) {
            ctx.fillStyle = `rgb(${0 + i * 5}, ${132 - i * 5}, ${255 - i * 10})`
        } else if (i < 51) {
            ctx.fillStyle = `rgb(${125 - (i - 25) * 5}, ${0 + (i - 25) * 5}, ${0 + (i - 25) * 10})`
        } else if (i < 76) {
            ctx.fillStyle = `rgb(${0 + (i - 50) * 5}, ${132 - (i - 50) * 5}, ${255 - (i - 50) * 10})`
        } else if (i < 101) {
            ctx.fillStyle = `rgb(${125 - (i - 75) * 5}, ${0 + (i - 75) * 5}, ${0 + (i - 75) * 10})`
        } else if (i < 126) {
            ctx.fillStyle = `rgb(${0 + (i - 100) * 5}, ${132 - (i - 100) * 5}, ${255 - (i - 100) * 10})`
        } else if (i < 151) {
            ctx.fillStyle = `rgb(${125 - (i - 125) * 5}, ${0 + (i - 125) * 5}, ${0 + (i - 125) * 10})`
        }
        ctx.fillRect(snake[i].x, snake[i].y, 40, 40)
    }

    ctx.fillStyle = "red"
    ctx.fillRect(fruit.x + 5, fruit.y + 5, 30, 30)
}

function movement() {
    if (nextDirection.length === 0) {
        direction = direction
    } else if (nextDirection.length > 0) {
        direction = nextDirection[0]
        nextDirection.shift()
    }

    let lastSnakePosition = { x: snake[snake.length - 1].x, y: snake[snake.length - 1].y }
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
        endGame()
    }
    if (ateFruit) {
        snake.push(lastSnakePosition)
        ateFruit = false
        console.log(snake)
    }
}

function checkWin() {
    if (snake.length === 144) {
        endGame()
        alert("YOU WIN!!!")
    }
}

setInterval(function () {
    if (isGameRunning) {
        draw()
        movement()
        checkCollision()
        eatFruit()
        checkWin()
    }
}, 150);