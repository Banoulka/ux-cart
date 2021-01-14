import UX from '/src/index.js';

const badgeNum = $('#badge-num');
const cartNum = $('#cart-num');

let cart = [];
const cartElement = $('#cart-el');
const productBody = $('#product-body');
let products = [];

async function load() {

    // Load previous cart
    loadCart();

    // Load products onto checkout page
    showProducts();

    // Total
    let total = cart.reduce((acc, product) => (acc += product.price), 0).toFixed(2);

    $('#total-price').text(total);

    $('#clear').click(() => {
        cart = [];
        productBody[0].innerHTML = '';
        localStorage.removeItem('cart');
        $('#total-price').text(0);
        badgeNum.text(0);
        cartNum.text(0);
    });

    // Initialize the UX class
    UX.init({
        cart,
        total,
        storageType: UX.options.api,
        endpoint: '/storeResult.php',
        payCardId: 'pay-card',
        payAppleId: 'pay-apple',
        payPaypalId: 'pay-paypal',
        parentId: 'page-container'
    });
}

function getProduct(id) {
    return products.find(product => product.id == id);
}

function loadCart() {
    const newCart = localStorage.getItem('cart');

    if (newCart) {
        cart = JSON.parse(newCart);
        badgeNum[0].textContent = cart.length;
        cartNum[0].textContent = cart.length;
    }
}

function showProducts() {
    cart.forEach(product => {
        productBody.append(
        `
            <div class="product">
                <div class="product-item">
                    <h6>${product.title}</h6>
                    <img src="${product.image}" alt="Product Image" class="product-image">
                </div>
                <div class="price">
                    <p>£${product.price}</p>
                </div>
                <div class="quantity">
                    <p>1</p>
                </div>
            </div>
        `);
    })
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

load();