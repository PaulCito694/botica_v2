<?php

namespace App\Http\Controllers;

use App\Models\product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $products = product::with(['brand:id,name', 'category:id,name', 'laboratory:id,name'])->get();
      return response($products->toJson());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      try {
        $product =  product::create([
          'name' => $request->name,
          'components' => $request->components,
          'location' => $request->location,
          'description' => $request->description,
          'wholesale_price' => $request->wholesale_price,
          'retail_price' => $request->retail_price,
          'category_id' => $request->category_id,
          'laboratory_id' => $request->laboratory_id,
          'brand_id' => $request->brand_id,
        ]);
        var_dump($product);
        return response('Creado correctamente', 200);
      }
      catch (\Exception $e) {
        return response($e->getMessage(), 500);
      }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, product $product)
    {
        product::where('id',$request->id)->update([
          'name' => $request->name,
          'components' => $request->components,
          'location' => $request->location,
          'description' => $request->description,
          'wholesale_price' => $request->wholesale_price,
          'retail_price' => $request->retail_price,
          'category_id' => $request->category_id,
          'laboratory_id' => $request->laboratory_id,
          'brand_id' => $request->brand_id,
      ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(product $product)
    {
      $product->delete();
    }
}
