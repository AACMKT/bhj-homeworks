const hintsHolders = Array.from(document.querySelectorAll('.has-tooltip'));

const optionsBar = document.querySelector('.options-bar__control')

const options = document.querySelectorAll('.tips-position')


hintsHolders.forEach(e => {let hint = document.createElement('div');
    hint.classList.add('tooltip');
    hint.textContent = e.title;
    hint.dataset.position = 'bottom'
    e.appendChild(hint);
});

optionsBar.addEventListener('click', (e) => {options.forEach(option => {e.preventDefault(); option.classList.remove('bar-option_active')});
    e.target.classList.add('bar-option_active');
    hintsHolders.forEach(el => {
        el.lastChild.dataset.position = e.target.dataset.position})
        
    }

)

function getPosition(e) {
    const {left, right, top, bottom} = e.target.getBoundingClientRect();
    let position = e.target.lastChild.dataset.position;
    e.target.lastChild.style.visibility = 'hidden';
    e.target.lastChild.classList.add('tooltip_active')
    e.target.lastChild.style.left = 0;
    e.target.lastChild.style.top = String(Number(bottom) + 5) + "px";
    const preWidth = e.target.lastChild.getBoundingClientRect().width;
    const preHeight = e.target.lastChild.getBoundingClientRect().height;
    

    if (position == "left") {
        if (left - preWidth - 1 > 0) {
            e.target.lastChild.style.left = String(Number(left) - preWidth - 5) + "px";
            e.target.lastChild.style.top = String(Number(top) - 5) + "px";
        }

        else {
            e.target.lastChild.style.left = String(left) + "px";
        }
    }

    else if (position == "right") {

        if (right + preWidth + 5 > window.innerWidth) {
            if (left + preWidth > window.innerWidth) {
                e.target.lastChild.style.left = String(Number(right) - preWidth) + "px";
            }
            else {
                e.target.lastChild.style.left = String(left) + "px";
            }
        }

        else {
            e.target.lastChild.style.left = String(Number(right + 5)) + "px";
            e.target.lastChild.style.top = String(Number(top - 5)) + "px";
        }
    }

    else if (position == "top") {
        if (left + preWidth > window.innerWidth) {
            e.target.lastChild.style.left = String(Number(right) - preWidth) + "px";
        }
        else {
            e.target.lastChild.style.left = String(left) + "px";
        }
        e.target.lastChild.style.top = String(Number(top - preHeight - 5)) + "px";

    }

    else if (position == "bottom") {
        if (left + preWidth > window.innerWidth) {
            e.target.lastChild.style.left = String(Number(right) - preWidth) + "px";
        }
        else {
            e.target.lastChild.style.left = String(left) + "px";
        }
    }
}

let myEvents = 'click mouseenter mouseleave'.split(' ');

function eventsWorker (e) {
        e.preventDefault();
        console.log(`caught event is: ${e.type}`);
        let text = e.target.title;
       
        switch (e.type){
            case 'mouseenter':
                e.target.removeAttribute('title');
                getPosition(e)
                break;
            case 'mouseleave':
                e.target.setAttribute('title', text);
                e.target.lastChild.classList.remove('tooltip_active');
                break;
            case 'click':
                if (hintsHolders.includes(e.target)) {
                    e.target.lastChild.style.removeProperty('visibility')
                }
                break;
        }
    }


myEvents.forEach(event => hintsHolders.forEach(el => el.addEventListener(event, eventsWorker)));
