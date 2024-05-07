<?php

namespace App\Http\Controllers;

use App\Models\ShippingDetail;
use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\StoreShippingDetailRequest;
use App\Http\Requests\UpdateShippingDetailRequest;

class ShippingDetailController extends Controller
{
    public function addShppingDetails(Request $request, $cartId)
    {
        # rules of the validation
        $rules = [
            'first_name' => 'required|string|max:191',
            'last_name' => 'required|string|max:191',
            'address' => 'required|string',
        ];        

        $validator = Validator::make($request->all(), $rules);

        // if something goes wrong in validation
        if($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ]);
        }


        $cart = Cart::find($cartId);

        // if the cart is not found
        if (!$cart) {
            return response()->json([
                'status' => 404,
                'message' => 'Cart not found'
            ]);
        }

        $shipDetail = new ShippingDetail();
        $shipDetail->first_name = $request->first_name;
        $shipDetail->last_name = $request->last_name;
        $shipDetail->address = $request->address;
        $shipDetail->cart_id = $cart->cart_id;
        $shipDetail->save();

        return response()->json([
            'status' => 201,
            'message' => 'Shipping Details added successfully'
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
    public function store(StoreShippingDetailRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ShippingDetail $shippingDetail)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ShippingDetail $shippingDetail)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateShippingDetailRequest $request, ShippingDetail $shippingDetail)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ShippingDetail $shippingDetail)
    {
        //
    }
}
