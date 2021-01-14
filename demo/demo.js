const badgeNum = $('#badge-num');
let cart = [];
const cartElement = $('#cart-el');

let products = [];

async function load() {

    // Get the data
    const res = await fetch('/demo/products.php');
    products = await res.json();

    // Setup listeners
    eventListeners();

    // Load previous cart
    loadCart();
}

function eventListeners() {
    const buttons = $('.cart-button');

    $.each(buttons, (index, button) => {
        const id = button.id.substr(12);
        const product = getProduct(id);

        button.addEventListener('click', () => addToCart(product, button));
    })
}

function getProduct(id) {
    return products.find(product => product.id == id);
}

function addToCart(product, el) {
    // Animation for button
    el.classList.add("cart-button-anim");

    // Timeout
    window.setTimeout(() => {
        // Remove button animation
        el.classList.remove("cart-button-anim");

        // Add cart animation
        cartElement.addClass("cart-cart-anim");
        // Update number after animation timeout
        badgeNum[0].textContent = cart.length;

        window.setTimeout(() => {
            cartElement.removeClass("cart-cart-anim");
        }, 800);
    }, 800);

    // Add product to cart
    cart.push(product);

    // Local storage add
    localStorage.setItem('cart' , JSON.stringify(cart));
}

function loadCart() {
    const newCart = localStorage.getItem('cart');

    if (newCart) {
        cart = JSON.parse(newCart);
        badgeNum[0].textContent = cart.length;
    }
}

load();