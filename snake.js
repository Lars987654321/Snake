const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
ctx.fillStyle = "green"

let x = 0
let y = 0
let direction = "right"

document.addEventListener("keydown", (event) => {
    if (event.key === "w" || event.key === "W" || event.key === "ArrowUp"){
        if (direction !== "down") {
            direction = "up" 
        }
    } else if (event.key === "d" || event.key === "D" || event.key === "ArrowRight"){
        if (direction !== "left") {
            direction = "right" 
        }
    } else if (event.key === "s" || event.key === "S" || event.key === "ArrowDown"){
        if (direction !== "up") {
            direction = "down" 
        }
    } else if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft"){
        if (direction !== "right") {
            direction = "left" 
        }
    }
})

function movement() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(x, y, 40, 40)
    if (direction === "up") {
        y-=40
    } else if (direction === "right") {
        x+=40
    } else if (direction === "down") {
        y+=40
    } else if (direction === "left") {
        x-=40
    }
}

setInterval(movement, 180)