const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
ctx.fillStyle = "green"

let x = 0
let y = 0
let direction = "right"

document.addEventListener("keydown", (event) => {
    if (event.key === "w" || event.key === "W" || event.key === "ArrowUp"){
        direction = "up"
    } else if (event.key === "d" || event.key === "D" || event.key === "ArrowRight"){
        direction = "right"
    } else if (event.key === "s" || event.key === "S" || event.key === "ArrowDown"){
        direction = "down"
    } else if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft"){
        direction = "left"
    }
})

function movement() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(x, y, 30, 30)
    if (direction === "up") {
        y-=1
    } else if (direction === "right") {
        x+=1
    } else if (direction === "down") {
        y+=1
    } else if (direction === "left") {
        x-=1
    }

    requestAnimationFrame(movement)
}

movement()