const modal = document.getElementById('subscribe-modal');
const modalCloseBtn = document.querySelector('.modal__close_times');
const resetBtn = document.getElementById('reset-button');


function setCookie (key, value) {
    document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value)
};

function getCookieValue (key) {
    let cookie = document.cookie.split("; ").find(record => record.startsWith(key + "="));

    return cookie.substring(key.length + 1)
};

function deleteCookie(name) {
  setCookie(name, "", {
    expires: -1
  })
};

function getStatus () {
    if (!getCookieValue ('shown') || getCookieValue ('shown') != 'true') {
        modal.classList.add('modal_active');
    }
    else {
        modal.classList.remove('modal_active');
    }
};

//deleteCookie('shown');

document.addEventListener('DOMContentLoaded', getStatus);
modalCloseBtn.onclick = () => {setCookie ('shown', 'true'); modal.classList.remove('modal_active')}
resetBtn.onclick = () => {setCookie ('shown', 'false'); modal.classList.add('modal_active')}
