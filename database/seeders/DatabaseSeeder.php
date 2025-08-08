<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolePermissionSeeder::class,
            // CategorySeeder::class,
            // ProductSeeder::class
        ]);

        //admin account
        $user = User::factory()->create([
            'name' => 'verseler',
            'email' => 'v@gmail.com',
            'password' => '1010101010'
        ]);
        $user->assignRole('admin');


        $this->call([
            OrderSeeder::class,
            // CategorySeeder::class,
            // ProductSeeder::class
        ]);
    }
}
