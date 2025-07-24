<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the product.
     */
    public function index()
    {
        $products = Product::with(['category', 'images'])->paginate(10);

        return Inertia::render('ProductsPage', [
            'products' => Inertia::merge(fn() => [
                'items' => $products->items(),
                'currentPage' => $products->currentPage(),
                'lastPage' => $products->lastPage(),
            ]),
        ]);
    }

    /**
     * Display the specified product.
     */
    public function show(Product $product)
    {
        $product->category;
        $product->images;

        return Inertia::render('ProductPage', [
            'product' => $product
        ]);
    }
}
