<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Order::query()->with(['customer']);

        //Search OR # or Customer Name
        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('or_number', 'LIKE', "%{$search}%")
                    ->orWhereHas('customer', function ($q2) use ($search) {
                        $q2->where('name', 'LIKE', "%{$search}%");
                    });
            });
        }

        //active tab status
        $activeTab = $request->get('activeTab', 'all');

        if ($activeTab !== 'all') {
            $query->where('status', 'LIKE', "%{$activeTab}%");
        }

        $orders = $query->paginate(10)->withQueryString();

        $counts = Order::selectRaw("
            COUNT(*) as total,
            SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as new_count,
            SUM(CASE WHEN status = 'processing' THEN 1 ELSE 0 END) as processing_count,
            SUM(CASE WHEN status = 'shipped' THEN 1 ELSE 0 END) as shipped_count
        ")->first();

        return Inertia::render('admin/order/OrderListPage', [
            'orders' => $orders,
            'ordersCount' => $counts->total,
            'newOrdersCount' => $counts->new_count,
            'processingOrdersCount' => $counts->processing_count,
            'shippedOrdersCount' => $counts->shipped_count,
            'search' => $search,
            'activeTab' => $activeTab
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        $order->load('customer', 'ShippingAddress', 'orderItems.product');

        return Inertia::render('admin/order/EditOrderPage', [
            'order' => $order,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order, OrderService $service)
    {
        $validated = $request->validated();

        try {
            DB::transaction(function () use ($validated, $order, $service) {
                //update order status
                $order->update([
                    'status' => $validated['status']
                ]);

                //update shipping address
                $order->shippingAddress()->update([
                    'address_line' => $validated['address_line'],
                    'barangay' => $validated['barangay'],
                    'city' => $validated['city'],
                    'province' => $validated['province'],
                    'postal_code' => $validated['postal_code'],
                ]);

                $order->orderItems()->upsert(
                    $validated['order_items'],
                    ['id'],
                    ['quantity']
                );

                //update order total_amount based on updated order quantity
                $order->update([
                    'total_amount' => $service->computeTotalAmount($order)
                ]);
            });
            return to_route('orders.index')->with('success', 'Successfully updated');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
