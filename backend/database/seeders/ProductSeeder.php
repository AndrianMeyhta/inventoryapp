<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Laptop Gaming ASUS ROG',
                'description' => 'Laptop gaming dengan spesifikasi tinggi, processor Intel Core i7, RAM 16GB, SSD 512GB, VGA RTX 3060',
                'price' => 18500000,
                'stock' => 15,
            ],
            [
                'name' => 'Mouse Logitech G502',
                'description' => 'Mouse gaming dengan sensor optik presisi tinggi, 11 tombol programmable',
                'price' => 850000,
                'stock' => 50,
            ],
            [
                'name' => 'Keyboard Mechanical Keychron K2',
                'description' => 'Keyboard mechanical wireless dengan switch Gateron Brown, RGB backlight',
                'price' => 1200000,
                'stock' => 30,
            ],
            [
                'name' => 'Monitor LG UltraWide 34"',
                'description' => 'Monitor ultrawide 34 inch, resolusi 3440x1440, refresh rate 144Hz, HDR support',
                'price' => 7500000,
                'stock' => 10,
            ],
            [
                'name' => 'Headset HyperX Cloud II',
                'description' => 'Gaming headset dengan virtual 7.1 surround sound, microphone noise-cancelling',
                'price' => 1100000,
                'stock' => 25,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
