<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCartRequest;
use App\Http\Requests\UpdateCartRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{

    public function addToCart(Request $request)
    {
        $cart = new Cart();
        $cart->cart_date = $request->cart_date;
        $cart->save();

        return response()->json([
            'status' => 201,
            'message' => 'Cart added successfully'
        ]);
    }

    public function viewCart($cartId)
    {
        $cart = Cart::with('items')->find($cartId);

        if (!$cart) {
            return response()->json([
                'status' => 404,
                'message' => 'Cart not found'
            ]);
        }

        return response()->json([
            'status' => 200,
            'carts' => $cart
        ]);
    }

    public function removeCart($cartId)
    {
        $cartItem = Cart::find($cartId);

        if (!$cartItem) {
            return response()->json([
                'status' => 404,
                'message' => 'Cart item not found'
            ]);
        }

        $cartItem->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Product removed from cart successfully'
        ]);
    }
    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCartRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Cart $cart)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cart $cart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCartRequest $request, Cart $cart)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        //
    }
}
