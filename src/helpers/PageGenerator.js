export default class PageGenerator {

    constructor(parentNode, uxCart) {
        this.uxCart = uxCart;
        this.parent = parentNode;
        this.oldHTML = this.parent.innerHTML;
    }

    renderOldPage() {
        // Add an error to the ux cart
        this.uxCart.addError();

        // Add the old HTML back
        this.parent.innerHTML = this.oldHTML;

        // Find buttons and setup event listeners
        this.uxCart.findAndSetupButtons();
    }

    renderCardPay() {
        console.log('render card');
        this.parent.innerHTML =
        `
            <h1> Pay By Card </h1>
            <div class="mb-3">
              <label for="card-name" class="form-label">Full Name on Card:</label>
              <input type="text" class="form-control" id="card-name" placeholder="Enter name">
            </div>
            <div class="mb-3">
              <label for="card-number" class="form-label">Card Number</label>
              <input type="text" class="form-control" id="card-number" placeholder="Enter card number...">
            </div>
            <div class="mb-3 row">
                <div class="col col-4">
                    <label for="expire" class="form-label">Expiry Date</label>
                    <input type="text" class="form-control" id="expire" placeholder="Enter expiry">
                </div>
                <div class="col col-4">
                    <label for="s-code" class="form-label">Security Code</label>
                    <input type="number" class="form-control" id="s-code" placeholder="Enter security code">
                </div>
            </div>
        `;
        this.renderBuyButton();
    }

    renderPaypal() {
        console.log('render paypal');
        this.parent.innerHTML =
            `
            <h1> Pay By Paypal </h1>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" placeholder="Enter email">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" id="password" placeholder="Enter password">
            </div>
        `;
        this.renderBuyButton();
    }

    renderApplePay() {
        console.log('render apple');
        this.parent.innerHTML =
            `
            <div id="gif-container">
                <h2>Scanning face...</h2>
                <img src="https://i.pinimg.com/originals/ba/9a/b4/ba9ab42593e487b4e349973e1d43b11d.gif" id="face-gif" alt="Scanning face GIF"/>
            </div>
        `;

        window.setTimeout(() => {
            const gifContainer = document.getElementById('gif-container');

            gifContainer.innerHTML = `<h2>Scanned</h2>`;
            this.renderBuyButton();
        }, 6000);
    }

    renderFinishPage() {
        // finish ux cart
        this.uxCart.finishResult();

        this.parent.innerHTML =
            `
            <div id="gif-container">
                <h1>=== Checkout Success ===</h1>
                <p>Total Price: £${this.uxCart.total}</p>
                <p>Your chosen payment type: ${this.uxCart.paymentType}</p>
                <p>Your checkout took ${this.uxCart.seconds} seconds</p>    
                <p>Number of errors: ${this.uxCart.errors}</p>    
            </div>
        `;
    }

    renderBuyButton() {
        let container = document.createElement('div');
        container.id = 'gif-container';
        container.classList.add('checkout-btns');

        let buyButton = document.createElement('button');
        buyButton.classList.add('btn', 'btn-primary');
        buyButton.textContent = 'Buy Now';
        buyButton.addEventListener('click', () => this.renderFinishPage());

        let backButton = document.createElement('button');
        backButton.textContent = '< Back';
        backButton.classList.add('btn', 'btn-danger');
        backButton.addEventListener('click', () => this.renderOldPage());

        container.appendChild(buyButton);
        container.appendChild(backButton);
        this.parent.appendChild(container);
    }
}