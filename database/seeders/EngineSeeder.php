<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EngineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('engine')->insert([
            [
                'e_type' => 'l4',
                'e_detail' => '',
                'e_hp' => '416 hp',
                'e_img' => ''
            ],
            [
                'e_type' => 'l6',
                'e_detail' => '',
                'e_hp' => '526 hp',
                'e_img' => ''
            ],
            [
                'e_type' => '3rotor',
                'e_detail' => '',
                'e_hp' => '300 hp',
                'e_img' => ''
            ],
            [
                'e_type' => '4rotor',
                'e_detail' => '',
                'e_hp' => '425 hp',
                'e_img' => ''
            ],
            [
                'e_type' => '6rotor',
                'e_detail' => '',
                'e_hp' => '820 hp',
                'e_img' => ''
            ],
            [
                'e_type' => 'v4',
                'e_detail' => '',
                'e_hp' => '240 hp',
                'e_img' => ''
            ],
            [
                'e_type' => 'v6',
                'e_detail' => '',
                'e_hp' => '400 hp',
                'e_img' => ''
            ],
            [
                'e_type' => 'v8',
                'e_detail' => '',
                'e_hp' => '495 hp',
                'e_img' => ''
            ],
            [
                'e_type' => 'v10',
                'e_detail' => '',
                'e_hp' => '500 hp',
                'e_img' => ''
            ],
            [
                'e_type' => 'v12',
                'e_detail' => '',
                'e_hp' => '563 hp',
                'e_img' => ''
            ],
            [
                'e_type' => 'v16',
                'e_detail' => '',
                'e_hp' => '1000+ hp',
                'e_img' => ''
            ],
            [
                'e_type' => 'v16',
                'e_detail' => '',
                'e_hp' => '1000+ hp',
                'e_img' => ''
            ],
            [
                'e_type' => 'electric motor',
                'e_detail' => '',
                'e_hp' => '500+ hp',
                'e_img' => ''
            ],
        ]);
    }
}
