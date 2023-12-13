const controls = Array.from(document.querySelectorAll('.book__control'));
const menu = document.querySelector(".book__controls")
const content = document.getElementById('book')

const fontOptions = (e) => {
    controls.forEach(options => Array.from(options.children).forEach(option => 
        {option.classList.remove('font-size_active');
        if (option == e.target){e.preventDefault();
            option.classList.add('font-size_active');
            content.classList.remove("font-size_small"); 
            content.classList.remove("font-size_big"); 
            if (option.dataset.size){
                let fontSize = `font-size_${option.dataset.size}`
                content.classList.add(fontSize)
            }

        }}
    ))
}

const ColorOptions = (e) => {
    controls.forEach(options => Array.from(options.children).forEach(option => 
        {option.classList.remove('color_active');
        if (option == e.target){e.preventDefault();
            option.classList.add('color_active');
            if (e.target.parentNode.classList.contains('book__control_color'))
                {content.style.color = option.dataset.textColor}
            else if (e.target.parentNode.classList.contains('book__control_background'))
                {content.style.backgroundColor = option.dataset.bgColor};
    

        }}
    ))

}

const optionsNavigator = (e) => {
    console.log(e.target.parentNode.classList)
    if (e.target.parentNode.classList.contains('book__control_font-size')){
        fontOptions(e)
    }
    else if (e.target.parentNode.classList.contains('book__control_color') || e.target.parentNode.classList.contains('book__control_background')){
        ColorOptions(e)
    }

}

    
 menu.addEventListener('click', optionsNavigator)

