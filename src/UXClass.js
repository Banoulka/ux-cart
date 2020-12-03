import config from "./helpers/config.js";

export default class UXCart {
	constructor(optionsObj = {}) {
		this.productElement = optionsObj.productElement;
		this.badgeEl = null;
		this.cart = [];
		this.productList = optionsObj.productList;
		this.cartParent = null;

		// Optional arguments including
		// Work on different designs, parameter setup
		// Assume website already has checkout page etc.
		// Work around the website, products

		// Add the CSS that comes with the package
		let head = document.head;
		let link = document.createElement("link");

		link.type = "text/css";
		link.rel = "stylesheet";
		link.href = "./src/css/styles.css";
		head.appendChild(link);

		this.generateCart();
	}

	displayProducts() {
		this.productElement.innerHTML = "";

		this.productList.forEach((product) => {
			let parDiv = document.createElement("div");
			parDiv.classList.add("card", "border-secondary", "mb-3");
			parDiv.style.maxWidth = "20rem";

			let cardHeader = document.createElement("div");
			cardHeader.classList.add("card-header");
			cardHeader.textContent = product.category;

			let img = document.createElement("img");
			img.src = product.image;
			img.classList.add("card-img-top", "mt-2", "w-25", "mx-auto");
			img.alt = "product picture";

			let cardBody = document.createElement("div");
			cardBody.classList.add("card-body");

			let cardTitle = document.createElement("h5");
			cardTitle.classList.add("card-title");
			cardTitle.textContent = product.title;

			let cardDesc = document.createElement("p");
			cardDesc.classList.add("card-text");
			cardDesc.textContent = product.description.substring(0, 100) + "...";

			let price = document.createElement("p");
			price.textContent = `£${product.price}`;

			let addButton = document.createElement("button");
			addButton.id = `add-product-${product.id}`;
			addButton.classList.add("btn", "btn-primary", "cart-button");
			addButton.textContent = "Add to cart";

			// Button element on click
			addButton.addEventListener("click", () => this.addProductToCart(product, addButton));

			cardBody.appendChild(cardTitle);
			cardBody.appendChild(cardDesc);
			cardBody.appendChild(price);
			cardBody.appendChild(addButton);

			parDiv.appendChild(cardHeader);
			parDiv.appendChild(img);
			parDiv.appendChild(cardBody);

			this.productElement.appendChild(parDiv);
		});
	}

	addProductToCart(product, el) {
		// Animation for button
		el.classList.add("cart-button-anim");

		// Timeout
		window.setTimeout(() => {
			// Remove button animation
			el.classList.remove("cart-button-anim");

			// Add cart animation
			this.cartParent.classList.add("cart-cart-anim");
			// Update number after animation timeout
			this.setBadgeNum(this.cart.length);

			window.setTimeout(() => {
				this.cartParent.classList.remove("cart-cart-anim");
			}, 800);
		}, 800);

		// Add product to cart
		this.cart.push(product);
	}

	generateCart() {
		this.cartParent = document.createElement("div");
		this.cartParent.classList.add("cart");
		this.cartParent.setAttribute("type", "button");
		this.cartParent.setAttribute("data-toggle", "modal");
		this.cartParent.setAttribute("data-target", "#exampleModal");
		this.cartParent.addEventListener("click", () => this.setModalBodyToProducts());

		let cartEl = document.createElement("i");
		cartEl.classList.add("fas", "fa-shopping-cart");

		this.badgeEl = document.createElement("span");
		this.badgeEl.classList.add("badge");
		this.badgeEl.textContent = "0";

		cartEl.appendChild(this.badgeEl);
		this.cartParent.appendChild(cartEl);

		document.body.prepend(this.cartParent);

		// Setup event listener for cart button
		document.getElementById("btn-checkout").addEventListener("click", () => this.checkoutPage());
	}

	setBadgeNum(num) {
		this.badgeEl.textContent = `${num}`;
	}

	setModalBodyToProducts() {
		let modalBody = document.getElementById("modal-body");

		let html = `<ul>`;

		// Product List
		this.cart.forEach((product) => {
			html += `
				<li>${product.title}</li>
			`;
		});

		html += `</ul>`;

		modalBody.innerHTML = html;
	}

	checkoutPage() {
		const oldHTML = this.productElement.innerHTML;
		this.productElement.classList.add("checkout-page");
		this.productElement.innerHTML = "";

		const title = document.createElement("h1");
		title.textContent = "Checkout";
		this.productElement.appendChild(title);

		// Close modal
		$("#exampleModal").modal("hide");

		this.productElement.innerHTML += `<div class="cart-page">
						<div class="cart-header">
							<h1>Shopping Cart</h1>
							<p><span class='items'>3</span> items in your cart</p>
						</div>
						<div class="cart-product-head">
							<h5 class='heading'>Product</h5>
							<h5 class='heading'>Price</h5>
							<h5 class='heading'>Quantity</h5>
						</div>
						<div class="cart-product-body">
							<div class="product">
								<div class="product-item">
									<h4>Product Name</h4>
									<p>Product Desc</p>
								</div>
								<div class="price">
									<p>£34.99</p>
								</div>
								<div class="quantity">
									<p>3</p>
								</div>
							</div>
						</div>
					</div>`;

		// uxClass.cart.forEach((product) => {
		// 	const el = document.createElement("div");

		// 	el.innerHTML = `
		// 		<h4>${product.title}</h4>
		// 		<p>£${product.price}</p>
		// 	`;
		// 	this.productElement.appendChild(el);
		// });

		// Total price
		const newDiv = document.createElement("p");
		const total = this.cart.reduce((t, product) => t + product.price, 0);
		newDiv.textContent = `£${total}`;

		this.productElement.appendChild(newDiv);

		// Back button
		const backButton = document.createElement("button");
		backButton.classList.add("btn", "btn-danger");
		backButton.textContent = "Back";
		backButton.addEventListener("click", () => this.backToPage(oldHTML));
		this.productElement.appendChild(backButton);
	}

	backToPage(html) {
		this.productElement.innerHTML = html;
		this.productElement.classList.remove("checkout-page");

		// Event listeners For Cart Buttons
		this.productList.forEach((product) => {
			const button = document.getElementById(`add-product-${product.id}`);
			button.addEventListener("click", () => this.addProductToCart(product, button));
		});
	}
}
