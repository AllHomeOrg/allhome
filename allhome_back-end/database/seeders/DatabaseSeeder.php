<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Product::factory()->create([
            'product_id' => 1,
            'product_name' => 'Luxe Lounge Sofa',
            'product_description' => 'Plush velvet comfort meets modern style.',
            'product_price' => 1020.00
        ]);

        Product::factory()->create([
            'product_id' => 2,
            'product_name' => 'Rustic Farmhouse Coffee Table',
            'product_description' => 'Reclaimed wood construction exudes rustic charm',
            'product_price' => 2050.00
        ]);

        Product::factory()->create([
            'product_id' => 3,
            'product_name' => 'Industrial Pendant Light',
            'product_description' => 'Metal cage design with an Edison bulb for industrial chic',
            'product_price' => 3080.00
        ]);

        Product::factory()->create([
            'product_id' => 4,
            'product_name' => 'Bohemian Macramé Pendant',
            'product_description' => 'Handcrafted with natural fibers for boho charm',
            'product_price' => 4000.00
        ]);

        Product::factory()->create([
            'product_id' => 5,
            'product_name' => 'Live Edge Wood Coffee Table',
            'product_description' => 'Solid wood construction with natural live edge details',
            'product_price' => 5680.00
        ]);

        Product::factory()->create([
            'product_id' => 6,
            'product_name' => 'Nordic Floor Lamp',
            'product_description' => 'Plush velvet comfort meets modern style.',
            'product_price' => 1630.00
        ]);

        Product::factory()->create([
            'product_id' => 7,
            'product_name' => 'Wingback Accent Chair',
            'product_description' => 'Luxurious fabric upholstery with elegant wingback design',
            'product_price' => 2870.00
        ]);

        Product::factory()->create([
            'product_id' => 8,
            'product_name' => 'Mid-Century Arc Pendant Light',
            'product_description' => 'Brushed metal finish for a retro-modern look',
            'product_price' => 1950.00
        ]);

        Product::factory()->create([
            'product_id' => 9,
            'product_name' => 'Luna Bedside Table',
            'product_description' => 'Sleek design crafted from quality materials',
            'product_price' => 6820.00
        ]);

        Product::factory()->create([
            'product_id' => 10,
            'product_name' => 'Luve Rattan Sofa',
            'product_description' => 'Handcrafted from natural rattan for coastal vibes',
            'product_price' => 5100.00
        ]);
    }
}
