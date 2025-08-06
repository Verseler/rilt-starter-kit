<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the product.
     */
    public function index(Request $request)
    {
        $query = Product::query()->with(['category', 'images']);

        // Apply category filter
        if ($categoryFilter = $request->get('categoryFilter')) {
            $query->whereHas('category', function ($q) use ($categoryFilter) {
                $q->where('name', $categoryFilter);
            });
        }

        // Apply sorting
        if ($sort = $request->get('sort')) {
            match ($sort) {
                'price_asc' => $query->orderBy('price', 'asc'),
                'price_desc' => $query->orderBy('price', 'desc'),
                'name_asc' => $query->orderBy('name', 'asc'),
                'name_desc' => $query->orderBy('name', 'desc'),
                'newest' => $query->orderBy('created_at', 'desc'),
                'oldest' => $query->orderBy('created_at', 'asc'),
                'rating_desc' => $query->orderBy('average_rating', 'desc'),
                'reviews_desc' => $query->orderBy('reviews_count', 'desc'),
                default => null,
            };
        }

        $products = $query->paginate(10)->withQueryString();

        return Inertia::render('ProductsPage', [
            'products' => Inertia::merge(fn() => [
                'items' => $products->items(),
                'currentPage' => $products->currentPage(),
                'lastPage' => $products->lastPage(),
            ]),
            'totalProducts' => $products->total(),
            'categories' => Inertia::lazy(fn() => Category::all()),
            // sort and filters
            'sort' => $request->get('sort'),
            'categoryFilter' => $request->get('categoryFilter'),
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
