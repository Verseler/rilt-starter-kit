<?php

namespace App\Http\Requests;

use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return request()->user()->can(
            'update',
            Product::class
        );
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:3'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'stock_quantity' => ['required', 'numeric', 'min:1'],
            'category_id' => ['required', 'exists:categories,id'],
            'new_images' => ['nullable', 'array', 'max:4'],
            'new_images.*' => ['image', 'mimes:jpeg,png,jpg', 'max:5120'],
            'existing_images' => ['nullable', 'array'],
            'existing_images.*' => ['string'],
            'deleted_images' => ['nullable', 'array'],
            'deleted_images.*' => ['string'],
        ];
    }
}
