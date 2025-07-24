<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Admin\ProductController as ProductAdminController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;


Route::get('/', HomeController::class)->name('home');
Route::get('carts', CartController::class)->name('cart');
Route::get('product', [ProductController::class, 'index'])->name('customer.product.index');
Route::get('product/{product}', [ProductController::class, 'show'])->name('customer.product.show');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('admin')->middleware(['auth', 'isAdmin'])->group(function () {
    Route::resource('product', ProductAdminController::class);
});

require __DIR__ . '/auth.php';
