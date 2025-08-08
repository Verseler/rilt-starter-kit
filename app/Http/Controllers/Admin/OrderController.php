<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
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
                $q->where('or_number', 'ILIKE', "%{$search}%")
                    ->orWhereHas('customer', function ($q2) use ($search) {
                        $q2->where('name', 'ILIKE', "%{$search}%");
                    });
            });
        }

        //active tab status
        $activeTab = $request->get('activeTab', 'all');

        if ($activeTab !== 'all') {
            $query->where('status', 'ILIKE', "%{$activeTab}%");
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
