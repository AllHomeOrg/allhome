<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// APIs
Route::get('/product_list', [ProductController::class, 'productList'])->name('product_list.list');
Route::get('/cart/{cartId}/view', [CartController::class, 'viewCart'])->name('cart.viewCart');
Route::post('/cart/add', [CartController::class, 'addToCart'])->name('cart.add');