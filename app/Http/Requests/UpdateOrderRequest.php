<?php

namespace App\Http\Requests;

use App\Models\Order;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return request()->user()->can(
            'update',
            Order::class
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
            'status' => ['required', Rule::in(['new', 'processing', 'shipped', 'delivered', 'canceled'])],
            'address_line' => ['required', 'string'],
            'barangay' => ['required', 'string'],
            'city' => ['required', 'string'],
            'province' => ['required', 'string'],
            'postal_code' => ['required', 'numeric'],
            'order_items' => ['required', 'array'],
            'order_items.*.id' => ['required'],
            'order_items.*.product_id' => ['required'],
            'order_items.*.order_id' => ['required'],
            'order_items.*.quantity' => ['required', 'numeric']
        ];
    }
}
