<?php

namespace Database\Seeders;

use App\Models\Client;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        Client::query()->delete();

        Client::insert([
            [
                'name' => 'شركة المدار',
                'logo_src' => 'client-logo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'مؤسسة الواحة',
                'logo_src' => 'client-logo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'مجموعة نبض',
                'logo_src' => 'client-logo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'منصة أفق',
                'logo_src' => 'client-logo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
