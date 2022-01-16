<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;
use Fico7489\Laravel\RevisionableUpgrade\Traits\RevisionableUpgradeTrait;

abstract class ModelBase extends Model
{
  use RevisionableUpgradeTrait;
  use RevisionableTrait;

  protected $revisionCreationsEnabled = true;
}
