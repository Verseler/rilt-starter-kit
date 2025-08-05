<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
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
            'categories' => Category::withCount('products')->get()
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
                if (!empty($validated['images'])) {
                    foreach ($validated['images'] as $image) {
                        $path = $image->store('products', 'public');

                        ProductImage::create([
                            'path' => "/storage/{$path}",
                            'product_id' => $product->id,
                        ]);
                    }
                }
            });

            return to_route('products.index')->with(
                'success',
                'Successfully created'
            );

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
    public function edit(Product $product)
    {
        $product->load('images');

        return Inertia::render('admin/product/EditProductPage', [
            'categories' => Category::withCount('products')->get(),
            'product' => $product
        ]);
    }

    /**
     * Update the specified product in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $validated = $request->validated();

        try {
            DB::transaction(function () use ($validated, $product) {
                // Update product details
                $product->update([
                    'name' => $validated['name'],
                    'description' => $validated['description'],
                    'price' => $validated['price'],
                    'stock_quantity' => $validated['stock_quantity'],
                    'category_id' => $validated['category_id'],
                ]);

                // Handle deleted images
                if (!empty($validated['deleted_images'])) {
                    foreach ($validated['deleted_images'] as $imagePath) {
                        // Remove '/storage/' prefix if present
                        $storagePath = str_replace(
                            '/storage/',
                            '',
                            $imagePath
                        );

                        // Delete from storage
                        Storage::disk('public')->delete($storagePath);

                        // Delete from database
                        $product->images()
                            ->where('path', $imagePath)
                            ->delete();
                    }
                }

                // Handle add new images
                if (!empty($validated['new_images'])) {
                    foreach ($validated['new_images'] as $image) {
                        $path = $image->store('products', 'public');

                        ProductImage::create([
                            'path' => "/storage/{$path}",
                            'product_id' => $product->id,
                        ]);
                    }
                }
            });
            return to_route('products.index')->with('success', 'Successfully created');
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy(Product $product)
    {
        Gate::authorize('delete', $product);

        $product->delete();

        return redirect()->back()->with('success', "Successfully deleted {$product->name}");
    }
}
