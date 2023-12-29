const URL = 'https://students.netoservices.ru/nestjs-backend/auth';
const form = document.getElementById('signin__form');
const logInBtn = document.getElementById('signin__btn');
const logOffBtn = document.getElementById('logoff__btn');
const formMsg = document.querySelector(".signin-msg");
const msg = document.getElementById('welcome');
const loginField = form.querySelector('input[name="login"]');
const pswField = form.querySelector('input[name="password"]');
const logoutField = document.querySelector('.reset');


async function auth(e) {
    e.preventDefault();
    let formData = new FormData(form);
    const options = {
        method: "POST",
        body: formData,
    };
    try {
        const response = await fetch(URL, options)
        if (response.ok) {
            console.log('Promise resolved and HTTP status is successful');
            let json = await response.json()
            return json
        } else {
            console.error('Promise resolved but HTTP status failed');
            return {'success': `failed_${response.status}`}
        }
      } catch {
            console.error('Promise rejected');
            return {'success': `failed_internal error`}
      }
};

async function authControl (e) {
    const failState = 'failed_';
    loginField.disabled = false;
    pswField.disabled = false;
    if (loginField.value.length > 0 && pswField.value.length) {
    let response = await auth(e);
    let status = response.success;
    if (logInBtn.dataset.status == 'signin') {
        if (!status) {
            formMsg.innerHTML = "Неправильное имя пользователя или пароль!";
            formMsg.style.display = 'block';
            logInBtn.textContent = "ОК";
            loginField.disabled = true;
            pswField.disabled = true;
            logInBtn.dataset.status = 'return';
        }
        else if (String(status).includes(String(failState)))  {
            text = 'ERROR ' + status.substring(failState.length)
            msg.innerHTML = `<p style="font-size: 26px; font-weight: bold;">${text}</p><p>Что-то пошло не так!</p>`;
            document.querySelector('.signin').classList.remove('signin_active');
            logoutField.classList.remove('reset_active');
            msg.classList.add('welcome_active');
            
        }
        else if (status) {
            let user = response.user_id
            localStorage.setItem('user', user);
            loggedIn (user);
        }
    }
    

    else {
        resetForm()
    }
    }
};

function loggedIn (user) {
    msg.innerHTML = `Добро пожаловать, пользователь ${user}!`;
    document.querySelector('.signin').classList.remove('signin_active');
    msg.classList.add('welcome_active');
    logoutField.classList.add('reset_active')
};

function checkAuthStatus () {
    if (localStorage.getItem('user')) {
        let user = localStorage.getItem('user');
        loggedIn (user)
    }
    else {
        document.querySelector('.signin').classList.add('signin_active');
    }
};

function resetForm () {
    logInBtn.textContent = "Войти";
    logInBtn.dataset.status = 'signin';
    formMsg.innerHTML = '';
    formMsg.style.display = 'none';
    form.reset();
    logoutField.classList.remove('reset_active');
};

function logout () {
    resetForm();
    msg.classList.remove('welcome_active');
    msg.innerHTML = '';
    document.querySelector('.signin').classList.add('signin_active');
    localStorage.removeItem('user');
};

document.addEventListener('DOMContentLoaded', checkAuthStatus)
form.addEventListener('submit', (e) => authControl(e));
logOffBtn.addEventListener('click', logout)
