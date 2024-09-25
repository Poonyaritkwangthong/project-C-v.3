<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('car', function (Blueprint $table) {
            $table->id();
            $table->string('c_name');
            $table->string('c_img');
            $table->string('c_detail');
            $table->unsignedBigInteger('c_engine_id');
            $table->unsignedBigInteger('c_brand_id');
            $table->timestamps();

            $table->foreign('c_engine_id')->references('id')->on('engine');
            $table->foreign('c_brand_id')->references('id')->on('brand');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car');
    }
};
