
'use strict';
const ads = Array.from(document.querySelectorAll('.rotator'))

const switcher = function(value, i=0) {
    Array.from(value.children).forEach((el) => {el.classList.remove('rotator__case_active')});
    if (i == value.children.length)  
        {i = 0};
    value.children[i].classList.add('rotator__case_active');
    value.children[i].style.color = value.children[i].dataset.color;
    i++
    setTimeout( switcher, value.children[i - 1].dataset.speed, value, i)

}

addEventListener('DOMContentLoaded', 
    ads.forEach(v => {
        switcher(v)})
    )
