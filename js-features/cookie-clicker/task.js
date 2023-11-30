const cookie = document.getElementById("cookie");
const frequency = document.getElementById("frequency");
let counter = document.getElementById("clicker__counter");
let clicker = 0;

cookie.addEventListener("click", () => {counter.textContent = Number(counter.textContent) + 1})
cookie.addEventListener("mousedown", () => cookie.width += 10)
cookie.addEventListener("mouseup", () => cookie.width -= 10)

cookie.onclick = () => {frequency.textContent = (1/clicker).toFixed(2); clicker = 0}

setInterval(() => {clicker += 0.01}, 10)





