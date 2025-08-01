<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customerPermissions = [
            'create order',
            'view own order',
            'view own orders'
        ];

        $adminPermissions = [
            'create product',
            'update product',
            'delete product',
            'view products',
            'create category',
            'update category',
            'delete category',
            'view categories',
            'update order',
            'view orders'
        ];

        //* Create Permissions
        foreach (array_merge($customerPermissions, $adminPermissions) as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        //* Create roles
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $customer = Role::firstOrCreate(['name' => 'customer']);

        //* Assign permissions to roles
        $admin->givePermissionTo($adminPermissions);
        $customer->givePermissionTo($customerPermissions);
    }
}
