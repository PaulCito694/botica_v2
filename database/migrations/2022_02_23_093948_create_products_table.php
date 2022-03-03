<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
          $table->id();
          $table->string('name');
          $table->string('components')->nullable();
          $table->string('location')->nullable();
          $table->string('description')->nullable();
          $table->float('price_out');
          $table->float('price_in');
          $table->unsignedBigInteger('category_id');
          $table->unsignedBigInteger('laboratory_id');
          $table->unsignedBigInteger('brand_id');
          $table->foreign('category_id')->references('id')->on('categories');
          $table->foreign('laboratory_id')->references('id')->on('laboratories');
          $table->foreign('brand_id')->references('id')->on('brands');
          $table->softDeletes();
          $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
