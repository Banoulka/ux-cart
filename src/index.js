import UXClass from "./UXClass.js";

function init(productEl, productList, settings = {}) {
	// Initialize class with options setup
	const uxClass = new UXClass({
		productElement: productEl,
		productList,
	});

	uxClass.displayProducts();
}

export default {
	init,
};
