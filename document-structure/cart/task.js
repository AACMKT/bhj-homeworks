const cart = document.querySelector('.cart__products');
const buttons = Array.from(document.querySelectorAll('.product__add'));
const qty = Array.from(document.querySelectorAll('.product__quantity-control'));
const clearCart = document.querySelector(".cart__clear");

document.addEventListener('DOMContentLoaded', ()=> {
    if (localStorage.length > 0) {
        const toObjDTS = JSON.parse(localStorage.getItem("data"));
        for (let i = 0; i < toObjDTS.length; i++){
            let {product, productImg, productCount} = buildTagsSetup();
            product.dataset.id = toObjDTS[i].id;
            productImg.src = toObjDTS[i].src;
            productCount.dataset.amount = toObjDTS[i].amount;
            productCount.textContent = productCount.dataset.amount;

            product.appendChild(productImg);
            product.appendChild(productCount);
            cart.appendChild(product);
        }
    }
});

function buildTagsSetup() {
    let product = document.createElement('div');
    product.classList.add('cart__product');

    let productImg = document.createElement('img');
    productImg.classList.add('cart__product-image');

    let productCount = document.createElement('div');
    productCount.classList.add('cart__product-count');

    return {'product': product, 'productImg':  productImg, 'productCount': productCount}
}

function addToChart(e) {
    let id = e.target.parentElement.parentElement.parentElement.dataset.id

    if (!cart.querySelector(`[data-id='${id}']`)) {
       
        let {product, productImg, productCount} = buildTagsSetup();

        product.dataset.id = id;
        productImg.src = e.target.parentElement.parentElement.parentElement.querySelector('img').src
        productCount.dataset.amount = e.target.parentElement.querySelector('.product__quantity-value').textContent
        productCount.textContent = productCount.dataset.amount;
        
        product.appendChild(productImg);
        product.appendChild(productCount);
        product.style.visibility = 'hidden';
        cart.appendChild(product);
        toCartAnimation (e, id);
    }

    else {
        let velocity = 50
        let iteration = 12

        let productCount = Number(cart.querySelector(`[data-id='${id}']`).querySelector('.cart__product-count').textContent);
        let amountToAdd = Number(e.target.parentElement.querySelector('.product__quantity-value').textContent);
        cart.querySelector(`[data-id='${id}']`).querySelector('.cart__product-count').dataset.amount = productCount + amountToAdd
        setTimeout( () => {
            let target = cart.querySelector(`[data-id='${id}']`).querySelector('.cart__product-count');
            target.textContent = target.dataset.amount},
            Number(velocity*iteration))
        
        toCartAnimation (e, id, velocity, iteration)
    }
}

function toCartAnimation (e, id, velocity = 50, iteration = 12) {
    const initialOpacity = 0.2;
    const opacityStep = (1 - initialOpacity)/(velocity);

    let cloneImg = document.createElement('img');
    cloneImg.src = e.target.parentElement.parentElement.parentElement.querySelector('img').src
    cloneImg.classList.add('product__image');
    cloneImg.style.position = 'absolute';
    cloneImg.style.zIndex = 1;

    cloneImg.style.opacity = initialOpacity;
    const left = cart.querySelector(`[data-id='${id}']`).getBoundingClientRect().left;
    let top = cart.querySelector(`[data-id='${id}']`).getBoundingClientRect().top
    cloneImg.style.left = e.target.closest(`[data-id='${id}']`).querySelector('.product__image').getBoundingClientRect().left + window.scrollX + "px";
    cloneImg.style.top = e.target.closest(`[data-id='${id}']`).querySelector('.product__image').getBoundingClientRect().top + window.scrollY + "px";
    stepLeft = (e.target.parentElement.parentElement.parentElement.querySelector('img').getBoundingClientRect().left - left)/velocity;
    stepTop = (e.target.parentElement.parentElement.parentElement.querySelector('img').getBoundingClientRect().top - top)/velocity;
    document.querySelector(".cart").appendChild(cloneImg)
        const interval = setInterval(() => {if (left <= cloneImg.getBoundingClientRect().left) {cloneImg.remove(); cart.querySelector(`[data-id='${id}']`).style.removeProperty('visibility'); clearInterval(interval)};
            if (parseFloat(cloneImg.style.left) >= left - 20) {
                cloneImg.classList.add('cart__product-image');
                cloneImg.classList.remove('product__image');
            };
            cloneImg.style.left = (parseFloat(cloneImg.style.left) - stepLeft) + "px";
            cloneImg.style.top = (parseFloat(cloneImg.style.top) - stepTop) + "px";
            if (Number(cloneImg.style.opacity) <= (1 - opacityStep)) {
                cloneImg.style.opacity = Number(cloneImg.style.opacity) + opacityStep;
           }
        }, iteration);
}

function qtyChooser (e) {
    if (e.target.classList.contains('product__quantity-control_dec')){
        let value = Number(e.target.nextElementSibling.textContent);
        if (value > 1) {
            e.target.nextElementSibling.textContent = Number(e.target.nextElementSibling.textContent) - 1;
        }
    }

    else if (e.target.classList.contains('product__quantity-control_inc')){
        let value = Number(e.target.previousElementSibling.textContent);
        if (value < 100) {
            e.target.previousElementSibling.textContent = Number(e.target.previousElementSibling.textContent) + 1;
        }
    }
};


function sendToStorage () {
    localStorage.clear();
    let dataToSend = []
  Array.from(document.querySelectorAll(".cart__product")).forEach(el => {
    let id = el.dataset.id;
    let amount = Number(cart.querySelector(`[data-id='${id}']`).querySelector('.cart__product-count').dataset.amount);
    let jsData = {
            'id': id,
            'src': el.children[0].src,
            'amount': amount
        };
        dataToSend.push(jsData);
        
    }   
    )
    let serializedDTS = JSON.stringify(dataToSend);
    localStorage.setItem('data', serializedDTS);
};

buttons.forEach(btn => btn.addEventListener('click', (e) => {addToChart(e); sendToStorage()}));

qty.forEach(qbtn => qbtn.addEventListener('click', qtyChooser));

clearCart.addEventListener('click', () => {Array.from(cart.childNodes).forEach(purchace => purchace.remove()); localStorage.clear()})
