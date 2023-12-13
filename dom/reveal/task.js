disclamer = document.querySelectorAll('.reveal')

function showMessage (e) {
    e.forEach(msg => {

    const {top, bottom} = msg.getBoundingClientRect();
    (bottom < 0 || top > window.innerHeight) ? 
     msg.classList.remove("reveal_active") : msg.classList.add("reveal_active")
    });
} 

// setInterval(() => {showMessage (disclamer)}, 1000)
document.addEventListener('scroll', () => showMessage(disclamer))