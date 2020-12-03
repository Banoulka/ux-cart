# ux-cart

![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)
![npm (scoped)](https://img.shields.io/npm/v/@banoulka/ux-cart?color=blue)
![GitHub repo size](https://img.shields.io/github/repo-size/banoulka/ux-cart?color=orange&label=install%20size)

UX-Cart is a cart tracking application that is for a research project answering the question:

> \<Insert Question Here>

## Contents

- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)

## Installation

Using npm:

```bash
$ npm install @banoulka/ux-cart
```

<!-- Using personal CDN:
```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
``` -->

Once package is installed a link should be placed in the `<head>`tag of the html page. Copy and paste the link below:

```html
<script src="<SOURCE>" defer />
```

Bootstrap is optional but increases styles and viewing across all pages, follow
bootstrap for their setup.

```html
<link
	rel="stylesheet"
	href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
	integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
	crossorigin="anonymous"
/>
```

## Usage

To use the application it should be initialized by the following code.

In javascript a new object can be created and initialised with

```javascript
const ux = UX.init();
```

### Options

Options can be added by passing an object with the different keys setup. A list of options
and their default values can be seen below

```javascript
UX.init({
	productElement, // The empty element to display data
	productList, // The list of products as data json
	display: true, // Should the UX system display products as well?
});
```
