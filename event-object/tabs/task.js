const navi = Array.from(document.querySelectorAll('.tab'));
const content = Array.from(document.querySelectorAll('.tab__content'));

const menu = document.getElementById("tabs1");

menu.addEventListener('click', (event) => {navi.forEach((link) => link.classList.remove('tab_active')); 
    navi.forEach((link, index) => { if (event.target == link) {
        event.target.classList.add('tab_active'); 
        content.forEach((cont, contIndex) => contIndex == index ? cont.classList.add('tab__content_active'):cont.classList.remove('tab__content_active'))
        }
    })
})
