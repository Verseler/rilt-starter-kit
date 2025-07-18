<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'description' => fake()->text(),
            'price' => fake()->randomNumber(),
            'average_rating' => fake()->numberBetween(0, 5),
            'reviews_count' => 0,
            'stock_quantity' => 0,
            'category_id' => Category::inRandomOrder()->first()?->id,
        ];
    }
}
