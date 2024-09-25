<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use function Laravel\Prompts\table;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('brand')->insert([
            [
                'b_name' => 'Audi',
                'b_img' => 'https://cdn.freebiesupply.com/logos/large/2x/audi-14-logo-black-and-white.png',
                'b_location' => 'Europe',
                'founded_year' => '1909-07-15'
            ],
            [
                'b_name' => 'BMW',
                'b_img' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/768px-BMW.svg.png',
                'b_location' => 'Europe',
                'founded_year' => '1916-03-07'
            ],
            [
                'b_name' => 'Mercedes-Benz',
                'b_img' => 'https://s3-alpha.figma.com/hub/file/1549348164/a235fd4b-8505-4bfd-a4f6-5ecde9174bda-cover.png',
                'b_location' => 'Europe',
                'founded_year' => '1926-06-28'
            ],
            [
                'b_name' => 'Porsche',
                'b_img' => 'https://imagenes.elpais.com/resizer/v2/JLYOR4AIRNFTVOJMWI7G6BLZTU.jpg?auth=29657c259ddf29903d02b1211376c3143d39a9759f162384d20f124776a3ed53&width=980&height=980&smart=true',
                'b_location' => 'Europe',
                'founded_year' => '1951-01-30'
            ],
            [
                'b_name' => 'Volkswagen',
                'b_img' => 'https://uploads.vw-mms.de/system/production/images/vwn/030/145/images/7a0d84d3b718c9a621100e43e581278433114c82/DB2019AL01950_web_1600.jpg?1649155356',
                'b_location' => 'Europe',
                'founded_year' => '1937-05-28'
            ],
            [
                'b_name' => 'Alfa Romeo',
                'b_img' => 'https://www.shutterstock.com/image-vector/alfa-romeo-car-logo-vector-600nw-2388799003.jpg',
                'b_location' => 'Europe',
                'founded_year' => '1910-06-24'
            ],
            [
                'b_name' => 'Ferrari',
                'b_img' => 'https://static.vecteezy.com/system/resources/previews/020/500/228/non_2x/ferrari-brand-logo-car-symbol-black-design-italian-automobile-illustration-free-vector.jpg',
                'b_location' => 'Europe',
                'founded_year' => '1898-02-18'
            ],
            [
                'b_name' => 'Fiat',
                'b_img' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Fiat_Automobiles_logo.svg/1024px-Fiat_Automobiles_logo.svg.png',
                'b_location' => 'Europe',
                'founded_year' => '1899-07-11'
            ],
            [
                'b_name' => 'Lamborghini',
                'b_img' => 'https://www.brandcrowd.com/blog/wp-content/uploads/2023/05/Lamborghini-logo-1-1024x819.jpg',
                'b_location' => 'Europe',
                'founded_year' => '1916-04-28'
            ],
            [
                'b_name' => 'Maserati',
                'b_img' => 'https://i.pinimg.com/originals/5e/5f/0f/5e5f0f05f9703fa3db0cc93b5d2c8578.png',
                'b_location' => 'Europe',
                'founded_year' => '1914-12-1'
            ],
            [
                'b_name' => 'Aston Martin',
                'b_img' => 'https://www.logodesignlove.com/images/evolution/aston-martin-logo-1921.jpg',
                'b_location' => 'Europe',
                'founded_year' => '1913-01-15'
            ],
            [
                'b_name' => 'Bentley',
                'b_img' => 'https://cdn.icon-icons.com/icons2/3911/PNG/512/bentley_logo_icon_247481.png',
                'b_location' => 'Europe',
                'founded_year' => '1919-01-18'
            ],
            [
                'b_name' => 'Jaguar',
                'b_img' => 'https://i.ebayimg.com/images/g/r0kAAOSwo5xehfnj/s-l1200.jpg',
                'b_location' => 'Europe',
                'founded_year' => '2008-01-18'
            ],
            [
                'b_name' => 'Lotus',
                'b_img' => 'https://upload.wikimedia.org/wikipedia/en/2/2f/Lotus_Cars_logo.svg',
                'b_location' => 'Europe',
                'founded_year' => '1948-01-01'
            ],
            [
                'b_name' => 'Mclaren',
                'b_img' => 'https://cdn.icon-icons.com/icons2/2402/PNG/512/mclaren_logo_icon_145800.png',
                'b_location' => 'Europe',
                'founded_year' => '1985-12-02'
            ],
            [
                'b_name' => 'Chevrolet',
                'b_img' => 'https://static.vecteezy.com/system/resources/previews/020/498/757/non_2x/chevrolet-brand-logo-car-symbol-with-name-white-design-usa-automobile-illustration-with-black-background-free-vector.jpg',
                'b_location' => 'USA',
                'founded_year' => '1911-11-03'
            ],
            [
                'b_name' => 'Ford',
                'b_img' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd6xh4Yl5_Ruxo4eCbMTSSn_df1wG1qkJjmg&s',
                'b_location' => 'USA',
                'founded_year' => '1903-06-16'
            ],
            [
                'b_name' => 'Jeep',
                'b_img' => 'https://img.lazcdn.com/g/p/e60432830e76e143e744fcfe73623285.jpg_960x960q80.jpg_.webp',
                'b_location' => 'USA',
                'founded_year' => '1987-01-01'
            ],
            [
                'b_name' => 'Tesla',
                'b_img' => 'https://i0.wp.com/www.vibeprintco.com/wp-content/uploads/2022/02/Tesla-chrome-copy-2.jpg?fit=1800%2C1350&ssl=1',
                'b_location' => 'USA',
                'founded_year' => '2003-07-01'
            ],
            [
                'b_name' => 'Cadillac',
                'b_img' => 'https://hips.hearstapps.com/hmg-prod/amv-prod-cad-assets/wp-content/uploads/2013/07/Cadillac_Logo1-626x491.jpg?resize=980:*',
                'b_location' => 'USA',
                'founded_year' => '1902-08-22'
            ],
            [
                'b_name' => 'Dodge',
                'b_img' => 'https://www.carlogos.org/car-logos/dodge-logo-1994-download.png',
                'b_location' => 'USA',
                'founded_year' => '1900-12-14'
            ],
            [
                'b_name' => 'Toyota',
                'b_img' => 'https://www.carlogos.org/car-logos/toyota-logo-2005-download.png',
                'b_location' => 'Japan',
                'founded_year' => '1937-08-28'
            ],
            [
                'b_name' => 'Honda',
                'b_img' => 'https://d2hucwwplm5rxi.cloudfront.net/wp-content/uploads/2023/08/24072843/Make-Matters-Honda-Logo-History-_-Body-2-24-8-23-1024x640.jpg',
                'b_location' => 'Japan',
                'founded_year' => '1959-01-01'
            ],
            [
                'b_name' => 'Nissan',
                'b_img' => 'https://i.pinimg.com/originals/ce/98/86/ce9886f292d50489aebcd6da73c1cd58.jpg',
                'b_location' => 'Japan',
                'founded_year' => '1933-12-26'
            ],
            [
                'b_name' => 'Mazda',
                'b_img' => 'https://car-logos.net/wp-content/uploads/2023/04/mazda-logo-2015-2018-scaled.webp',
                'b_location' => 'Japan',
                'founded_year' => '1920-01-30'
            ],
            [
                'b_name' => 'Suzuki',
                'b_img' => 'https://1000logos.net/wp-content/uploads/2021/04/Suzuki-logo.png',
                'b_location' => 'Japan',
                'founded_year' => '1909-10-01'
            ],
            [
                'b_name' => 'Isuzu',
                'b_img' => 'https://www.arcticthailand.com/main/wp-content/uploads/2021/02/isuzu-01-01-822x750.png',
                'b_location' => 'Japan',
                'founded_year' => '1934-03-30'
            ],
            [
                'b_name' => 'Mitsubishi',
                'b_img' => 'https://static.vecteezy.com/system/resources/previews/020/499/833/non_2x/mitsubishi-logo-brand-symbol-with-name-black-design-japan-car-automobile-illustration-free-vector.jpg',
                'b_location' => 'Japan',
                'founded_year' => '1870-01-01'
            ],
            [
                'b_name' => 'Subaru',
                'b_img' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7ay9PDIeHg7E_fzjsvQLp6f9D0C0H9G7jSQ&s',
                'b_location' => 'Japan',
                'founded_year' => '1953-07-15'
            ],
        ]);

    }
}
