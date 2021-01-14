import UXClass from "./UXClass.js";

let uxClass;

const storageOptions = Object.freeze({
	'api': 0,
	'local': 1,
	'excelFile': 2,
	'textFile': 3,
	'console': 4,
	'none': 5,
});

function init(config) {
	// Initialize class with options setup
	uxClass = new UXClass(config, storageOptions);
}

export default {
	init,
	collect: () => uxClass.collect(),
	options: storageOptions
};
