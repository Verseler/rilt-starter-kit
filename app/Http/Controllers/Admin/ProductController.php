<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the product.
     */
    public function index(Request $request)
    {
        $query = Product::query()->with(['category']);

        if ($search = $request->get('search')) {
            $query->where('name', 'ILIKE', "%{$search}%");
        }

        $products = $query->paginate(10)->withQueryString();

        return Inertia::render('admin/product/ProductListPage', [
            'products' => $products,
            'search' => $search,
        ]);
    }

    /**
     * Show the form for creating a new product.
     */
    public function create()
    {
        return Inertia::render('admin/product/CreateProductPage', [
            'categories' => Category::withCount('products')->limit(5)->get()
        ]);
    }

    /**
     * Store a newly created product in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $validated = $request->validated();

        try {
            DB::transaction(function () use ($validated) {
                $product = Product::create([
                    'name' => $validated['name'],
                    'description' => $validated['description'],
                    'price' => $validated['price'],
                    'average_rating' => 0,
                    'rating_count' => 0,
                    'reviews_count' => 0,
                    'stock_quantity' => $validated['stock_quantity'],
                    'category_id' => $validated['category_id']
                ]);

                //store product images
                foreach ($validated['images'] as $image) {
                    $path = $image->store('products', 'public');

                    ProductImage::create([
                        'path' => "/storage/{$path}",
                        'product_id' => $product->id,
                    ]);
                }
            });
            return to_route('product.index')->with('success', 'Successfully created');
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }

    }

    /**
     * Display the specified product.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified product.
     */
    public function edit(string $id)
    {
        return Inertia::render('admin/product/EditProductPage');
    }

    /**
     * Update the specified product in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->back()->with('success', "Successfully deleted {$product->name}");
    }
}
