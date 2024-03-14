// const dog={
//     name: "sobaka",
//     age: "5",
//     breed: "корги",
//     angry: true,
//     make_noise: function(){
//         alert("гаф гаф")
//     }
// }
// setTimeout (dog.make_noise, 5000)

const karta = document.querySelector('#game')
const canvas = karta.getContext('2d')
canvas.fillStyle = "rgb(255, 140, 0)"

const sobaka = 15
const paddleHeight = sobaka * 5
const maxPaddleY = karta.height - sobaka - paddleHeight

let ballSpeed = 5
let paddleSpeed = 7

const leftPaddle = {
    x: sobaka * 2,
    y: karta.height / 2 - paddleHeight / 2,
    height: paddleHeight,
    width: sobaka,
    dy: 0
}
const rightPaddle = {
    x: karta.width - 3 * sobaka,
    y: karta.height / 2 - paddleHeight / 2,
    height: paddleHeight,
    width: sobaka,
    dy: 0
}
const ball = {
    x: karta.width / 2,
    y: karta.height / 2,
    height: sobaka,
    width: sobaka,
    dy: -ballSpeed,
    dx: -ballSpeed,
    resetting: false,
    isResetted: false
}
function render_map() {
    canvas.fillRect(0, 0, karta.width, sobaka)
    canvas.fillRect(0, karta.height - sobaka, karta.width, sobaka)

    for(let i = sobaka; i<karta.height - sobaka; i+=sobaka*2){
        canvas.fillRect(karta.width / 2, i, sobaka, sobaka)
    }
}
function clear_map() {
    canvas.clearRect(0, 0, karta.width, karta.height)
}
function left_paddle() {
    canvas.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height)
}
function right_paddle() {
    canvas.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height)
}
function move_paddles() {
    leftPaddle.y += leftPaddle.dy
    rightPaddle.y += rightPaddle.dy
}
function render_ball () {
    canvas.fillRect(ball.x, ball.y, ball.width, ball.height)
}
function move_ball () {
    ball.x += ball.dx
    ball.y += ball.dy
}
function colide_paddle (paddle) {
    if (paddle.y < sobaka) {
        paddle.y = sobaka
    }
    else if (paddle.y > maxPaddleY) {
        paddle.y = maxPaddleY
    }
}
function colide_ball () {
    if (ball.y < sobaka) {
        ball.y = sobaka
        ball.dy = -ball.dy
    }
    else if (ball.y > karta.height - sobaka) {
        ball.y = karta.height - sobaka
        ball.dy = -ball.dy
    }
}
function reset_game () {
    if ((ball.x > karta.width || ball.x < 0) && !ball.isResetted) {
        ball.isResetted = true
        setTimeout(function () {
            ball.isResetted = false
            ball.x = karta.width / 2
            ball.y = karta.height / 2
        }, 2000)
        if (ball.x < 0){
            leftCounter.textContent = 0
            else if (ball.x > karta.widht)
            rightCounter.textContent = 0
        }
    }
}
function collision (object1, object2) {
    const width1 = object1.x + object1.width
    const width2 = object2.x + object2.width
    const height1 = object1.y + object1.height
    const height2 = object2.y + object2.height

    return object1.x < width2
        && object2.x < width1
        && object1.y < height2
        && object2.y < height1
}
function colide_ball_end_paddle () {
    if (collision(ball, leftPaddle)) {
        ball.dx = -ball.dx
        ball.x = leftPaddle.x + leftPaddle.width
        left_paddle.textContent = parseInt(left_paddle.textContent) + 1
    }
    else if (collision(ball, rightPaddle)) {
        ball.dx = -ball.dx
        ball.x = rightPaddle.x - ball.width
        right_paddle.textContent = parseInt(right_paddle.textContent) + 1
    }
}
function ai () {
    let direction = 0
    if (ball.y < rightPaddle.y){
        direction = -1
    }
    else if (ball.y > rightPaddle.y + rightPaddle.height){
        direction = 1
    }
    rightPaddle.y += paddleSpeed * direction
}
function loop() {
    clear_map()

    left_paddle()
    right_paddle()
    colide_paddle(leftPaddle)
    colide_paddle(rightPaddle)

    move_paddles()
    ai()
    
    render_ball()
    move_ball()
    colide_ball()
    colide_ball_end_paddle()

    reset_game()

    render_map()
    requestAnimationFrame(loop)
}
document.addEventListener('keydown', function(event) {
    if (event.key === 'w' || event.key === 'ц') {
        leftPaddle.dy = -paddleSpeed
    }
    else if (event.key === 's' || event.key === 'ы') {
        leftPaddle.dy = paddleSpeed
    }
})
document.addEventListener('keyup', function(event) {
    if (event.key === 'w' || event.key === 'ц') {
        leftPaddle.dy = 0
    }
    else if (event.key === 's' || event.key === 'ы') {
        leftPaddle.dy = 0
    }
})
requestAnimationFrame(loop)
