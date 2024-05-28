<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\ShippingDetailController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// APIs

// User
Route::get('/user_list', [UserController::class, 'userList'])->name('user.list');
Route::get('/user/{username}', [UserController::class, 'showUser'])->name('user.getUser');
Route::post('/user/add', [UserController::class, 'addUser'])->name('user.add');
Route::put('/user/{userId}/edit', [UserController::class, 'editUser'])->name('user.edit');
Route::delete('/user/{userId}/remove', [UserController::class, 'removeUser'])->name('user.remove');

// Product
Route::get('/product_list', [ProductController::class, 'productList'])->name('product.list');
Route::post('/product/add', [ProductController::class, 'addProduct'])->name('product.add');
Route::put('/product/{productId}/edit', [ProductController::class, 'editProduct'])->name('product.edit');
Route::delete('/product/{productId}/remove', [ProductController::class, 'removeProduct'])->name('product.remove');

// Cart
Route::get('/cart/{cartId}/view', [CartController::class, 'viewCart'])->name('cart.viewCart');
Route::post('/cart/add', [CartController::class, 'addToCart'])->name('cart.add');

// Cart Item
Route::post('/cart/{cartId}/product/{productId}/add', 
        [CartItemController::class, 'addItemToCart'])->name('add.item.to.cart');
Route::delete('/cart/item/{cartItemId}/remove', [CartItemController::class, 'removeItemFromCart'])->name('cart.removeItem');

// Shipping Detail
Route::post('/shipping_detail/{cart_id}/add', 
        [ShippingDetailController::class, 'addShppingDetails'])->name('shipping_detail.add');