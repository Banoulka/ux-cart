import config from "./helpers/config.js";
import PageGenerator from "./helpers/PageGenerator.js";
import ResultLogger from "./helpers/ResultLogger.js";

export default class UXCart {
	constructor(optionsObj = {}, storageOptions) {
		// Handle errors
		if (!optionsObj.cart || !Array.isArray(optionsObj.cart)) {
			console.error('"cart" option not set for config settings');
		}
		this.options = optionsObj;
		this.cart = optionsObj.cart;
		this.storeOptions = storageOptions;
		this.endpoint = optionsObj.endpoint;

		// Setup the result logger
		this.logger = new ResultLogger();

		// Selected options
		this.selectOption(optionsObj.storageType);

		this.seconds = 0;
		this.paymentType = null;
		this.total = optionsObj.total;
		this.errors = 0;

		this.findButtons();

		// Timer every second to count the time
		this.timer = window.setInterval(() => this.seconds++, 1000);

		this.setupListeners();

		// Optional arguments including
		// Work on different designs, parameter setup
		// Assume website already has checkout page etc.
		// Work around the website, products

		// Add the CSS that comes with the package
		let head = document.head;
		let link = document.createElement("link");

		link.type = "text/css";
		link.rel = "stylesheet";
		link.href = "/src/css/styles.css";
		head.appendChild(link);
	}

	selectOption(option) {
		// Loop through options data and figure out if an error should be set
		let valid = false;

		// storeOption.api = 0;
		for (let [storeOption] in Object.entries(this.storeOptions)) {
			if (option == storeOption) {
				valid = true;
				this.storageOption = storeOption;
				break;
			}
		}

		// Log error and return result
		if (!valid)
			console.error('Storage type not valid. Please see list of valid options');

		return valid;
	}

	findButtons() {
		this.payCardBtn = document.getElementById(this.options.payCardId);
		this.payPaypalBtn = document.getElementById(this.options.payPaypalId);
		this.payAppleBtn = document.getElementById(this.options.payAppleId);
		this.generator = new PageGenerator(document.getElementById(this.options.parentId), this);
	}

	finishResult() {
		// Stop the timer
		window.clearInterval(this.timer);

		// Execute the results
		this.executeStorage();
	}

	findAndSetupButtons() {
		this.findButtons();
		this.setupListeners();
	}

	addError() {
		this.errors++;
	}

	setupListeners() {
		// Setup event listeners pages
		this.payCardBtn.addEventListener('click', () => {
			this.paymentType = 'Credit/Debit Card';
			this.generator.renderCardPay();
		});

		this.payPaypalBtn.addEventListener('click', () => {
			this.paymentType = 'Paypal';
			this.generator.renderPaypal();
		});

		this.payAppleBtn.addEventListener('click', () => {
			this.paymentType = 'Apple Pay';
			this.generator.renderApplePay();
		});
	}

	collect() {
		// Collect results
		return {
			timeSeconds: this.seconds,
			errors: this.errors,
			modeSelected: this.paymentType
		};
	}

	executeStorage() {
		this.logger.setResults(this.collect());

		// Execute storage based on mode
		//			'api': 0,
		// 			'local': 1,
		// 			'excelFile': 2,
		// 			'textFile': 3,
		// 			'console': 4,
		// 			'none': 5,
		console.log(this.storageOption);
		switch(parseInt(this.storageOption)) {
			case 0:
				// log api
				break;
			case 1:
				// local storage
				this.logger.setLocalStorage();
				break;
			case 2:
				// excel file
				break;
			case 3:
				// text file
				break;
			case 4:
				this.logger.consoleLogResults();
				break;
			case 5:
			default:
				// no option
		}

	}
}
