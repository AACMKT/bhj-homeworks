const URL = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';
const loader = document.getElementById('loader');

/*const xhr = new XMLHttpRequest();
xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.DONE) {
        console.log (xhr.statusText);
        console.log (xhr)
    }
})

xhr.open('GET', URL);
xhr.send();*/

document.addEventListener("DOMContentLoaded", ()=> {upgradeStatusBar (); getFromStorage(); getResponse()});

async function getResponse () {
    fetch(URL).then(response => toJson(response)).then(json => json.response.Valute).then(data => 
        {clearData ();  addToStorage (data); Object.values(data).forEach(val => createTagStr(val))})
    };

const toJson = (response) => {
    console.log(response.status);
    loader.classList.remove('loader_active');
    let json = response.json();
    return  json
};


function createTagStr (jsnfyd) {
    let code = jsnfyd.CharCode;
    let rate = jsnfyd.Value;

    let wrapper = document.createElement('div');
    wrapper.classList.add("item");

    let currCode = document.createElement('div');
    currCode.classList.add('item__code');
    currCode.textContent = code;

    let currRate = document.createElement('div');
    currRate.classList.add('item__value');
    currRate.textContent = rate;

    let currSuffix = document.createElement('div');
    currSuffix.classList.add('item__currency');
    currSuffix.textContent = 'руб.';

    wrapper.appendChild(currCode);
    wrapper.appendChild(currRate);
    wrapper.appendChild(currSuffix);

    document.getElementById('items').appendChild(wrapper)
};

function addToStorage (obj) {
    let arr = JSON.stringify(Object.values(obj));
    localStorage.clear();
    localStorage.setItem('data', arr);
};

function getFromStorage () {
    let obj = JSON.parse(localStorage.getItem('data'));
    if (obj && obj.length > 0) {
        obj.forEach(val => createTagStr (val))
    };
};

function clearData () {
    let list = document.getElementById('items');
    Array.from(list.childNodes).forEach(purchace => purchace.remove())
};

function upgradeStatusBar () {
    loader.style.position = 'absolute';
    loader.style.left = Number(window.innerWidth)/2 + 'px';
    loader.style.top = Number(window.innerHeight)/2 + 'px';
    loader.style.opacity = 0.5;
    loader.style.zIndex = 1;
}

