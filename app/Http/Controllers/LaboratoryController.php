<?php

namespace App\Http\Controllers;

use App\Models\category;
use App\Models\laboratory;
use Illuminate\Http\Request;

class LaboratoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $laboratories = laboratory::all();
      return response($laboratories->toJson());
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
        laboratory::create([
          'name' => $request->name,
          'description' => $request->description
        ]);
        return response('Creado correctamente', 200);
      }
      catch (\Exception $e) {
        return response('Hubo un error creando el registro', 500);
      }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\laboratory  $laboratory
     * @return \Illuminate\Http\Response
     */
    public function show(laboratory $laboratory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\laboratory  $laboratory
     * @return \Illuminate\Http\Response
     */
    public function edit(laboratory $laboratory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\laboratory  $laboratory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, laboratory $laboratory)
    {
      laboratory::where('id',$request->id)->update([
        'name' => $request->name,
        'description' => $request->description
      ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\laboratory  $laboratory
     * @return \Illuminate\Http\Response
     */
    public function destroy(laboratory $laboratory)
    {
      $laboratory->delete();
    }
}
