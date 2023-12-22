
const URL = 'https://students.netoservices.ru/nestjs-backend/upload';
const BYTES_IN_MB = 1048576
const form = document.forms.form;
const fileInput = document.getElementById('file');
const sizeText = document.getElementById('upload_size');
const statusText = document.getElementById('upload_status');
const progressBar = document.getElementById('progress');
const sendBTN = document.getElementById('send');

document.getElementById("file").onchange = function() {
    const fileDesc = document.querySelector(".input__wrapper-desc");
    let fileName = this.value.split("\\");
    fileName = fileName[fileName.length - 1];
    fileDesc.textContent = fileName;
};




fileInput.addEventListener('change', function () {
    if (this.files.length > 0) {
        const file = this.files[0];
        
        if (file.size > 50 * BYTES_IN_MB) {
          statusText.textContent = "Файл слишком большой!";
          sendBTN.disabled = true;
          sendBTN.style.backgroundColor = 'gray';
          this.value = null
        }
        else {
          statusText.textContent = "Готов к отправке файла"
          sendBTN.removeAttribute("disabled");
          sendBTN.style.backgroundColor = '#06f';
        }
    }
});

form.addEventListener('submit', function (event) {
    sizeText.style.visibility = 'visible';
    event.preventDefault();
    if (sendBTN.dataset.status == '1') {
        console.log('here')
        sendBTN.dataset.status = '0';
        sendBTN.textContent = "Отправить";
        form.reset();
        document.querySelector('.input__wrapper-button').style.removeProperty('visibility');
        document.querySelector('.input__wrapper-button').textContent = 'Выберите файл';
        document.querySelector('.input__wrapper-desc').style.removeProperty('visibility');
        document.querySelector('.input__wrapper-desc').textContent = 'Имя файла...';
        statusText.textContent = 'Ожидаю файл';
        sizeText.textContent = "";
        sizeText.style.visibility = 'hidden';

  }
  else {
      const fileToUpload = fileInput.files[0];
      console.log(fileInput.files, sendBTN.dataset.status)
      const formSent = new FormData()
      const xhr = new XMLHttpRequest()

      if (fileInput.files.length > 0) {
        formSent.append('file', fileToUpload)

        // собираем запрос и подписываемся на событие progress
        xhr.upload.addEventListener('progress', progressHandler, false)
        xhr.addEventListener('load', loadHandler, false)
        xhr.open('POST', URL)
        xhr.send(formSent)
      } else {
        if (sendBTN.dataset.status != '1') {
          if(form.hasAttribute('novalidate')){
            alert('Сначала выберите файл!')
          }
        }
        
      }
      return false
  }
});

function progressHandler(event) {
    const loadedMb = (event.loaded/BYTES_IN_MB).toFixed(1)
    const totalSizeMb = (event.total/BYTES_IN_MB).toFixed(1)
    const percentLoaded = Math.round((event.loaded / event.total) * 100)
    sizeText.style.removeProperty('hidden')
    progressBar.value = percentLoaded;
    sizeText.textContent = `${loadedMb} из ${totalSizeMb} МБ`;
    statusText.textContent = `Загружено ${percentLoaded}% | `;
}

function loadHandler(event) {
    let answer = JSON.parse(event.target.response)
    console.log(answer.success)
    sizeText.style.visibility = 'hidden';
    if (answer.success) {
        statusText.textContent = "Загрузка завершена";
        document.querySelector('.input__wrapper-button').style.visibility = 'hidden';
        document.querySelector('.input__wrapper-desc').style.visibility = 'hidden';
        sendBTN.textContent = 'Отправить следующий файл';
        sendBTN.dataset.status = '1';
  }
  else {
      statusText.textContent = "Ошибка загрузки"
  }

    progressBar.value = '100';
}