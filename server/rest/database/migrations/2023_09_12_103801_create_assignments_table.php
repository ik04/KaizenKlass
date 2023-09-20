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
        Schema::create('assignments', function (Blueprint $table) {
            $table->id();
            $table->string("title");
            $table->string("desription");
            $table->string("content")->nullable();
            $table->unsignedBigInteger("subject_id");
            $table->string("link")->nullable(); // how to auto detect links through regex or something else in the future
            $table->uuid("assignment_uuid")->unique();
            $table->foreign("subject_id")->references('id')->on('subjects')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assignments');
    }
};
