<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\ShippingDetailController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// APIs
Route::get('/product_list', [ProductController::class, 'productList'])->name('product_list.list');
Route::get('/cart/{cartId}/view', [CartController::class, 'viewCart'])->name('cart.viewCart');
Route::post('/cart/add', [CartController::class, 'addToCart'])->name('cart.add');
Route::post('/cart/{cartId}/product/{productId}/add', 
        [CartItemController::class, 'addItemToCart'])->name('add.item.to.cart');
        
Route::delete('/cart/item/{cartItemId}/remove', [CartItemController::class, 'removeItemFromCart'])->name('cart.removeItem');
Route::post('/shipping_detail/{cart_id}/add', 
        [ShippingDetailController::class, 'addShppingDetails'])->name('shipping_detail.add');