<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        Service::query()->delete();

        Service::insert([
            [
                'title' => 'متاجر إلكترونية متكاملة',
                'description' => 'نصمم متجرك مع لوحة تحكم واضحة وتجربة شراء سريعة تدعم نمو المبيعات.',
                'icon' => 'cart-basket',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'مواقع شركة احترافية',
                'description' => 'واجهة عصرية تُبرز خدماتك وقصتك وتحوّل الزوار إلى عملاء محتملين.',
                'icon' => 'info-site',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'لوحات تحكم مخصصة',
                'description' => 'نطوّر لوحات إدارة متقدمة تربط الموقع مع Laravel وتبسط عملياتك اليومية.',
                'icon' => 'next-laravel',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'تحسين مواقع WordPress',
                'description' => 'نرفع الأداء ونحسن تجربة المستخدم ونضيف مزايا تناسب نمو عملك.',
                'icon' => 'wordpress',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
