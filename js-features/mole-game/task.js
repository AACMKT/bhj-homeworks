let score = document.getElementById("dead");
let miss =  document.getElementById("lost");

document.addEventListener('click', (e) => {if (e.target.classList.contains( 'hole' )) 
    {e.target.classList.contains( 'hole_has-mole' ) ? highScore() : gameLost();}});


function highScore() {
    score.textContent = Number(score.textContent) + 1
    if (score.textContent == 10) {
        alert("Победа");
        score.textContent = 0;
        miss.textContent = 0;
    }
};

function gameLost() {
    miss.textContent = Number(miss.textContent) + 1
    if (miss.textContent == 5) {
        alert("Кроты оказались шустрее : )")
        score.textContent = 0;
        miss.textContent = 0;
    }
};