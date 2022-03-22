<?php

namespace App\Observers;

use Amamarul\Hashids\Support\Hashids\Hashids;
use App\Models\product;


class ProductObserver
{
    /**
     * Handle the product "created" event.
     *
     * @param  \App\Models\product  $product
     * @return void
     */

  public $afterCommit = true;

    public function created(product $product)
    {
      $hashId = (new Hashids)->encode($product->id);
      $product->code = "QF-{$hashId}";
      $product->save();
    }

    /**
     * Handle the product "updated" event.
     *
     * @param  \App\Models\product  $product
     * @return void
     */
    public function updated(product $product)
    {
        //
    }

    /**
     * Handle the product "deleted" event.
     *
     * @param  \App\Models\product  $product
     * @return void
     */
    public function deleted(product $product)
    {
        //
    }

    /**
     * Handle the product "restored" event.
     *
     * @param  \App\Models\product  $product
     * @return void
     */
    public function restored(product $product)
    {
        //
    }

    /**
     * Handle the product "force deleted" event.
     *
     * @param  \App\Models\product  $product
     * @return void
     */
    public function forceDeleted(product $product)
    {
        //
    }
}
