const textBox = document.getElementById("editor");
const clearButton = document.getElementById("clear-button")

function getData () {
    let text = textBox.value;
    localStorage.setItem('data', text)
};

function setTextValue () {
    if (localStorage.data)  {
        textBox.removeAttribute('placeholder')
        textBox.value = localStorage.data
    }
    else {
        textBox.placeholder = 'Введите текст'
    }
    
};

function clearContent () {
    textBox.value = "";
    localStorage.removeItem('data')
    textBox.placeholder = 'Введите текст';
}

document.addEventListener('DOMContentLoaded', setTextValue);
textBox.oninput = getData;
clearButton.onclick = clearContent;
