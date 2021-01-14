# ux-cart

![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)
![npm (scoped)](https://img.shields.io/npm/v/@banoulka/ux-cart?color=blue)
![GitHub repo size](https://img.shields.io/github/repo-size/banoulka/ux-cart?color=orange&label=install%20size)

UX-Cart is a cart tracking application that is for a research project answering the question:

> \<Insert Question Here>
>
><br />

## Contents

- [Installation](#installation)
- [Requirements](#requirements)
- [Usage](#usage)
- [Options](#options)
- [Examples](#examples)
- [Demo](#demo)

<br />

## Installation

Using npm:

```shell script
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

<br />

## Requirements

To use this product cart application tracker, you need to have
a full cart system to provide with. Provide your own buttons out of a possibility
of 3.

* Paypal checkout
* Apple pay checkout
* Credit / Debit card system

To set, see [options](#example).

<br />

## Usage

To use the application it should be initialized by the following code.

In javascript a new object can be created and initialised with

```javascript
const ux = UX.init();
```

<br />

## Options

Options can be added by passing an object with the different keys setup. A list of options
can be seen below.

Options with * can be optional.

To see `storageType` modes, check [modes](#modes).

```javascript
UX.init({
    total, // The total amount for the cart
    cart, // The list of products as an array
    parentId: '', // The page container to render different pages
        storageType, // * The storage type for the results.

        // Required if using 'api'
        endpoint, // * The endpoint for the 'api' storage option. 
       
        payCardId: '', // * The paypal button id to use
        payAppleId: '', // * The apple pay button id to find
        payPaypalId: '', // * The paypal button id to find
});
```

<br />

## Modes

UX Cart comes with a couple of different options for storage results.
See [endpoint](#endpoint) for what data is sent.

##### API:
`storageType: UX.storeOptions.api`

Your own endpoint can be provided that will handle and store the
results.
> Your api must be able to recieve requests and store them

##### Local Storage:
`storageType: UX.storeOptions.local`

The ux cart application can store the results as a `json`
results object in local storage.

##### File Download:
The results can be downloaded as a text file

`storageType: UX.storeOptions.textFile`

or an Excel spreadsheet

`storageType: UX.storeOptions.excelFile`

##### Console Log:
The results can be logged to the console for future use

`storageType: UX.storeOptions.console`

##### No option:
No option can be selected or the option can be optional

`storageType: UX.storeOptions.none`

##### Other:
If you want any other results a function can be called to
collect the data as object

```javascript
const results = UX.collect();

// Collecting the different types of results, JS Destruct
const { error, timeSeconds, modeSelected } = results;
```

<br />

## Endpoint:

The UX Cart application can process the results in different modes,
for each of those a list of what data is sent to the endpoint, localstorage,
and as a txt / excel file.

- `timeSeconds` - The amount of time the process took
- `modeSelected` - The selected payment mode
- `errors` - The amount of times the user went back

## Examples

A couple of different example options for the config setup can be
seen below.

The first is using the paypal and credit buttons with an api endpoint
```javascript
UX.init({
    total, // The total amount for the cart
    cart, // The list of products as an array
    storageType: 'api',
    parentId: 'page-container',
    payCardId: 'card-btn', 
    payPaypalId: 'paypal-btn',
});
```


The second is using text download and all 3 buttons
```javascript
UX.init({
    total, // The total amount for the cart
    cart, // The list of products as an array
    storageType: 'api',
    parentId: 'checkout-page',
    payCardId: 'buy-debit', 
    payPaypalId: 'buy-paypal',
    payAppleId: 'buy-apple',
});
```

## Demo

This cart comes with a demo php server to test the functionality.
To start the website navigate to the downloaded folder and run
```shell script
$ npm run demo
```
to start the webserver and navigate to

```http request
localhost:8000/demo
```

To edit the demo configuration navigate to the __demo/checkout.js__
and edit the UX configuration on __line 33__

```javascript
// Initialize the UX class
UX.init({
    cart,
    total,
    storageType: UX.options.console,
    endpoint: '/storeResult.php',
    payCardId: 'pay-card',
    payAppleId: 'pay-apple',
    payPaypalId: 'pay-paypal',
    parentId: 'page-container'
});
```