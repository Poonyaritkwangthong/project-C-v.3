<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('car')->insert([
            [
                'c_name' => 'porsche 911 turbo s 1990',
                'c_img' => '',
                'c_detail' => '511212121',
                'c_engine_id' => '7',
                'c_brand_id' => '4',
            ],
        ]);
    }
}
