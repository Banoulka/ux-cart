<?php
//const res = await fetch("https://fakestoreapi.com/products");
$res = file_get_contents('https://fakestoreapi.com/products');

$products = json_decode($res);

shuffle($products);

require_once "./views/index.phtml";