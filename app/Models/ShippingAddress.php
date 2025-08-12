<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShippingAddress extends Model
{
    protected $fillable = [
        'phone_number',
        'address_line',
        'barangay',
        'city',
        'province',
        'postal_code',
        'user_id'
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
