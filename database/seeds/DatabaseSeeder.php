<?php

use Illuminate\Database\Seeder;
use database\seeds\DepartmentsTableSeeder;
use database\seeds\RolesTableSeeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         $this->call(DepartmentsTableSeeder::class);
         $this->call(RolesTableSeeder::class);
    }
}
