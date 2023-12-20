const taskList = document.getElementById("tasks__list");
const taskInput = document.getElementById("task__input");
const button = document.getElementById("tasks__add");
const form = document.getElementById("tasks__form");


let strgKey;


document.addEventListener('DOMContentLoaded', () => { if (localStorage.length > 0) {
    console.log(localStorage)
   for (let el = 0; el < localStorage.length; el++) {
    addTask(el) 
   }
    
}} );

function addTask(val= 'none') {
        let task = document.createElement('div');
        task.classList.add("task")
        let taskText = document.createElement('div');
        if (val != 'none') {
           taskText.textContent = localStorage.getItem(val);
        }
        else {
        taskText.textContent = taskInput.value;
        }
        taskText.classList.add("task__title");
        let removeTask = document.createElement('a');
        removeTask.href = "#";
        removeTask.classList.add("task__remove");
        removeTask.innerHTML = '&times';
        task.appendChild(taskText);
        task.appendChild(removeTask);
        taskList.appendChild(task)
}

button.addEventListener('click', (e) => {e.preventDefault(); if (taskInput.value.length > 0 && taskInput.value[0] != " ") {addTask();
    strgKey = localStorage.length; localStorage.setItem(strgKey, taskInput.value); taskInput.value =''  }});

taskList.addEventListener('click', (e)=> {if (e.target.classList.contains("task__remove")) {
    //taskList.forEach((el, i) => {if(e.target.parentElement == el) {storage.splice(i, 1)}})
    e.target.parentElement.remove(); localStorage.clear(); Array.from(document.querySelectorAll('.task__title')).forEach((el, inx) => {
        localStorage.setItem(inx, el.textContent)
    })
}})