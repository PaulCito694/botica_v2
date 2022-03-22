<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class product extends Model
{
  use HasFactory;
  use SoftDeletes;

  /**
   * @var mixed|string
   */

  public function brand()
  {
    return $this->belongsTo(Brand::class);
  }
  public function category()
  {
    return $this->belongsTo(laboratory::class);
  }
  public function laboratory()
  {
    return $this->belongsTo(category::class);
  }

  public function setCodeAttribute($value)
  {
    $this->attributes['code'] = strtoupper($value);
  }

  protected $fillable = [
    'name',
    'components',
    'location',
    'description',
    'wholesale_price',
    'retail_price',
    'category_id',
    'laboratory_id',
    'brand_id',
  ];
}
