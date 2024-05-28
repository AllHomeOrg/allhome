<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function productList() {
        $products = Product::all();

        return response()->json([
            'status' => 200,
            'data' => $products
        ]);
    }
    
    public function addProduct(Request $request) {
        // Define validation rules
        $rules = [
            'product_name' => 'required|string|max:255',
            'product_description' => 'required|string|max:1000',
            'product_price' => 'required|numeric|min:1'
        ];

        // Validate the request data
        $validator = Validator::make($request->all(), $rules);

        // If validation fails, return a response with errors
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ]);
        }

        $product = new Product();
        $product->product_name = $request->product_name;
        $product->product_description = $request->product_description;
        $product->product_price = $request->product_price;
        $product->save();

        return response()->json([
            'status' => 201,
            'message' => 'Product added successfully'
        ]);
    }

    public function editProduct(Request $request, $productId) {
        $product = Product::find($productId);

        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found'
            ]);
        }

        // Define validation rules
        $rules = [
            'product_name' => 'required|string|max:255',
            'product_description' => 'required|string|max:1000',
            'product_price' => 'required|numeric|min:1'
        ];

        // Validate the request data
        $validator = Validator::make($request->all(), $rules);

        // If validation fails, return a response with errors
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ]);
        }

        $product->product_name = $request->product_name;
        $product->product_description = $request->product_description;
        $product->product_price = $request->product_price;
        $product->save();

        return response()->json([
            'status' => 200,
            'message' => 'Product updated successfully'
        ]);
    }

    public function removeProduct($productId) {
        $product = Product::find($productId);

        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found'
            ]);
        }

        $product->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Product removed successfully'
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
