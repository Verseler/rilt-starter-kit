<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('HomePage', [
            'categories' => Inertia::lazy(fn() => Category::withCount('products')->limit(5)->get()),
            'products' => Inertia::lazy(fn() => Product::with(['category'])->limit(10)->get()),
        ]);
    }
}
