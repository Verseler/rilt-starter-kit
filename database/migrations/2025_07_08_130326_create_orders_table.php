<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('or_number')->unique();
            $table->float('total_amount');
            $table->enum('status', ['new', 'processing', 'shipped', 'delivered', 'canceled']);
            $table->foreignId('customer_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('shipping_address_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
