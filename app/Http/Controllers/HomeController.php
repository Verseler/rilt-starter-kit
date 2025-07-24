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
            'popularProducts' => Inertia::lazy(fn() => Product::with(['category', 'images'])->limit(10)->get()),
        ]);
    }
}
