
const resetCondition = () => document.querySelectorAll('.dropdown__list').forEach(el => el.classList.remove('dropdown__list_active'))
let emmit = function (e) {e.preventDefault(); e.currentTarget.parentElement.childNodes[1].textContent = e.target.textContent};

const buttonTracker = (e) =>{
    if (e.target.parentElement){
        let element = e.target
        if (element.parentElement.classList == 'dropdown'){
            const list = element.parentElement.querySelector('.dropdown__list');
            list.addEventListener('click', (e) => {emmit(e)});
            list.classList.toggle('dropdown__list_active');
        }
        else {
            resetCondition()
        }
    }
    else {
        resetCondition()
    }
}

document.addEventListener('click', buttonTracker)
