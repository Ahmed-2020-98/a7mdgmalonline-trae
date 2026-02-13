<?php

namespace Database\Seeders;

use App\Models\Hero;
use Illuminate\Database\Seeder;

class HeroSeeder extends Seeder
{
    public function run(): void
    {
        Hero::query()->delete();

        Hero::create([
            'title' => 'تصميم مواقع يرفع مبيعاتك',
            'description' => 'نبني تجربة رقمية متكاملة تجمع بين التصميم الاحترافي والتطوير السريع والربط السلس مع Laravel.',
            'cta_label' => 'ابدأ مشروعك',
            'cta_href' => '#projects',
            'secondary_cta_label' => 'تعرف على خدماتنا',
            'secondary_cta_href' => '#services',
            'image_src' => 'hero-webp',
            'image_alt' => 'عرض موقع احترافي على شاشات متعددة',
        ]);
    }
}
