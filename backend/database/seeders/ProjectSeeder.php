<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        Project::query()->delete();

        $projects = [
            [
                'name' => 'منصة حجوزات طبية',
                'description' => 'تجربة حجز سريعة مع لوحة تحكم للأطباء وإدارة المواعيد والدفع الإلكتروني.',
                'category' => 'تطبيقات الويب',
                'url' => 'https://example.com/medical',
                'cta_label' => 'استعراض المشروع',
            ],
            [
                'name' => 'متجر منتجات رقمية',
                'description' => 'متجر متكامل مع صفحات منتج جذابة ومسار دفع مبسط.',
                'category' => 'تجارة إلكترونية',
                'url' => 'https://example.com/store',
                'cta_label' => 'عرض التفاصيل',
            ],
            [
                'name' => 'موقع شركة استشارية',
                'description' => 'موقع يعكس الهوية ويحول الزيارات إلى طلبات تواصل مؤهلة.',
                'category' => 'موقع تعريفي',
                'url' => 'https://example.com/consulting',
                'cta_label' => 'زيارة الموقع',
            ],
        ];

        foreach ($projects as $project) {
            Project::create([
                ...$project,
                'images' => ['/images/project-placeholder.svg'],
            ]);
        }
    }
}
