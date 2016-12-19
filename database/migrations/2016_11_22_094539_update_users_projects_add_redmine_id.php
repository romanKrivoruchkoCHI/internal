<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateUsersProjectsAddRedmineId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function ($table) {
            $table->smallInteger('redmine_id');
        });

        Schema::table('projects', function ($table) {
            $table->smallInteger('redmine_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('projects', function ($table) {
            $table->dropColumn('redmine_id');
        });
        Schema::table('users', function ($table) {
            $table->dropColumn('redmine_id');
        });
        
    }
}
