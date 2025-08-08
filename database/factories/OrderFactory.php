<?php

namespace Database\Factories;

use App\Models\ShippingAddress;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::inRandomOrder()->first() ?? User::factory()->create();

        $shippingAddress = ShippingAddress::create([
            'phone_number' => fake()->phoneNumber(),
            'address_line' => fake()->streetAddress(),
            'barangay' => fake()->word(),
            'city' => fake()->city(),
            'province' => fake()->state(),
            'postal_code' => fake()->postcode(),
            'user_id' => $user->id,
        ]);

        return [
            'or_number' => "OR" . fake()->randomNumber(6),
            'total_amount' => fake()->randomNumber(4),
            'status' => fake()->randomElement(['new', 'processing', 'shipped', 'delivered', 'canceled']),
            'customer_id' => $user->id,
            'shipping_address_id' => $shippingAddress->id,
        ];
    }
}
