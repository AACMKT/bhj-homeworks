const textBox = document.getElementById("editor");
const clearButton = document.getElementById("clear-button")

function toStorage () {
    let text = textBox.value;
    localStorage.setItem('data', text)
};

function clearContent () {
    textBox.value = "";
    localStorage.removeItem('data')
};

document.addEventListener('DOMContentLoaded', () => {textBox.value = localStorage.getItem('data')});
textBox.oninput = toStorage;
clearButton.onclick = clearContent;
