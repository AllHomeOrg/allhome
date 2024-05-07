<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use App\Models\Cart;
use App\Http\Requests\StoreCartItemRequest;
use App\Http\Requests\UpdateCartItemRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CartItemController extends Controller
{
    public function addItemToCart(Request $request, $cartId, $productId)
    {
        # if somehow the quantity is lower than 1
        $rules = [
            'quantity' => 'required|integer|min:1'
        ];

        $validator = Validator::make($request->all(), $rules);

        if($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ]);
        }

        $cart = Cart::find($cartId);

        if (!$cart) {
            return response()->json([
                'status' => 404,
                'message' => 'Cart not found'
            ]);
        }

        $product = Product::find($productId);

        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found'
            ]);
        }

        // Check if the cart item already exists
        $cartItem = CartItem::where('cart_id', $cart->cart_id)
                    ->where('product_id', $product->product_id)
                    ->first();

        if ($cartItem) {
            // If the cart item exists, increase the quantity
            $cartItem->quantity += $request->quantity;
            $cartItem->total_price = $product->product_price * $cartItem->quantity;
        } else {
            // If the cart item doesn't exist, create a new one
            $cartItem = new CartItem();
            $cartItem->cart_id = $cart->cart_id;
            $cartItem->product_id = $product->product_id;
            $cartItem->quantity = $request->quantity;
            $cartItem->total_price = $product->product_price * $request->quantity;
        }

        $cartItem->save();

        return response()->json([
            'status' => 201,
            'message' => 'Product added to cart successfully'
        ]);
    }

    public function removeItemFromCart($cartItemId)
    {
        $cartItem = CartItem::find($cartItemId);

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
    public function store(StoreCartItemRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(CartItem $cartItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CartItem $cartItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCartItemRequest $request, CartItem $cartItem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CartItem $cartItem)
    {
        //
    }
}
