<?php
//const res = await fetch("https://fakestoreapi.com/products");
$res = file_get_contents('https://fakestoreapi.com/products');


echo $res;