const URL = 'https://students.netoservices.ru/nestjs-backend/poll';

const poll = document.querySelector(".poll");
let btnBox = document.querySelector('#poll__answers');
let form = document.forms.alert;
let messageID = 0;
let voteID = 0;

async function req () {
    let response = await fetch(URL);
    let json = await response.json();
    return json
};

req().then(json => contentMaker(json.id, json.data.title, json.data.answers))

function contentMaker (id, question, options) {
    messageID = id;
    document.querySelector("#poll__title").textContent = question;
    options.forEach((option, index) => {let btn = document.createElement('button');
        btn.classList.add("poll__answer");
        btn.textContent = option;
        btn.dataset.id = index;
        btn.style.marginRight = "5px"
        btnBox.appendChild(btn);
    });
};

function showAlert (e) {
    voteID = e.target.dataset.id
    let style = getComputedStyle(form)
    form.style.top = Math.round(Number(window.innerHeight/3)) + 'px';
    form.style.left = Math.round(Number(window.innerWidth/2 - parseFloat(style.width)/2)) + 'px';
    form.style.display = "flex";
    form.style.flexDirection = "column";
    Array.from(btnBox.children).forEach(btn => {btn.disabled = true; btn.style.backgroundColor = 'gray';});
}

async function getStatistics () {
    const options = {
        method: "POST",
        body: `vote=${messageID}&answer=${voteID}`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    }            
    let votes = await fetch(URL, options);
    let json = await votes.json();
    console.log(`message id: ${messageID}; answer №: ${voteID}`)
    return json
}

function showstatistics (json) {
    let totalVotes = 0
    json.stat.forEach(answ => {totalVotes += Number(answ.votes)});
    btnBox.style.borderTop = 'solid 2px gray';
    btnBox.style.paddingTop = '10px';
    Array.from(btnBox.children).forEach(btn => {btn.style.display ='none'});
    json.stat.forEach(answ => {
        let line = document.createElement('p');
        line.style.padding = '0';
        line.style.marginTop = '2px';
        line.style.marginBottom = '1px';
        line.innerHTML = `${answ.answer}: <b>${Math.round((answ.votes/totalVotes)*100)}%<b>`;
        btnBox.appendChild(line);
    })
  };

btnBox.addEventListener('click', showAlert);

form.querySelector('.form_button').addEventListener('click', (e) => {e.preventDefault();
    form.style.display = 'none';
    getStatistics().then(json => {showstatistics(json)})
});




// Возможность перемещать форму (https://learn.javascript.ru/drag-and-drop)

form.onmousedown = function(e) {

    let coords = getCoords(form);
    let shiftX = e.pageX - coords.left;
    let shiftY = e.pageY - coords.top;
  
    moveAt(e);
  
    function moveAt(e) {
      form.style.left = e.pageX - shiftX + 'px';
      form.style.top = e.pageY - shiftY + 'px';
    }
  
    document.onmousemove = function(e) {
      moveAt(e);
    };
  
    form.onmouseup = function() {
      document.onmousemove = null;
      form.onmouseup = null;
    };
  
  }
  
  form.ondragstart = function() {
    return false;
  };
  
  function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + scrollY,
      left: box.left + scrollX
    };
  }

