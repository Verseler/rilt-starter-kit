<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query()->role('customer');

        if ($search = $request->get('search')) {
            $query->where('name', 'ILIKE', "%$search%");
        }

        $customers = $query->paginate(10)->withQueryString();

        return Inertia::render('admin/CustomerListPage', [
            'customers' => $customers
        ]);
    }
}
