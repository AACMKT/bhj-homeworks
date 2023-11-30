window.onload = () => document.getElementById("timer").hidden = true;
let timer = document.getElementById("timer").textContent;
let hours = (timer) => { let h = Math.floor(timer / 3600); return (h >= 23) ? 23 : (h >= 10) ? h : `0${h}` };
let minutes = (timer) => {let m = Math.floor((timer % 3600) / 60); return (m >= 10) ? m : `0${m}`};
let seconds = (timer) => {let s = (timer % 3600) % 60; return (s >= 10) ? s : `0${s}`};

//let date = new Date(0, 0 ,0, hours, minutes, seconds);

setTimeout(() => document.getElementById("timer").hidden = false, 1000)


let countdown = setInterval(() => {if (timer >= 0){document.getElementById("timer").textContent = `${hours(timer)}:${minutes(timer)}:${seconds(timer)}`; timer -= 1}
else {alert("Вы победили в конкурсе!"); clearInterval(countdown); setTimeout(picture(), 500) }}, 1000)



const picture =  function() {

        const el = document.getElementById("card");
        let image = document.createElement("img");
        let wrapper = document.createElement("div");
        let text = document.getElementById("status");
        text.hidden = true;
        image.src = "./img/Ok.png";
        wrapper.className = "picture"
        image.width = 204;
        image.height = 208;
        el.appendChild(wrapper);
        wrapper.append(image)
        let counter = 0;
        setInterval(() => {if (image.width >= 204) {image.width = 102; image.height = 104} 
        else if (image.width <= 102){image.width = 204; image.height = 208}}, 1000)
};


