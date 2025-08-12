<?php

namespace App\Services;

use App\Models\Order;

class OrderService
{
    public function computeTotalAmount(Order $order)
    {
        $order->load(['orderItems.product']);

        $newTotalAmount = 0;

        foreach ($order->orderItems as $item) {
            $itemCost = $item->quantity * $item->product->price;

            $newTotalAmount += $itemCost;
        }

        return $newTotalAmount;
    }
}
