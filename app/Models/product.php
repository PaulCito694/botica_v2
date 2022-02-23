<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class product extends Model
{
  use HasFactory;
  use SoftDeletes;
  protected $fillable = [
    'name',
    'components',
    'location',
    'description',
    'price_out',
    'price_in',
    'category_id',
    'laboratory_id',
    'brand_id',
  ];
}
