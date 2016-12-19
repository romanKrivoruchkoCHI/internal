<?php
namespace database\seeds;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class DepartmentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('departments')->insert([
            ['name' => '.NET'],
            ['name' => 'Android'],
            ['name' => 'Business Analyst'],
            ['name' => 'C++'],
            ['name' => 'Data Bases'],
            ['name' => 'Design'],
            ['name' => 'HR'],
            ['name' => 'iOS'],
            ['name' => 'IT'],
            ['name' => 'Java'],
            ['name' => 'JavaScript'],
            ['name' => 'Managers'],
            ['name' => 'Marketing Manager'],
            ['name' => 'Markup'],
            ['name' => 'NodeJS'],
            ['name' => 'Operations'],
            ['name' => 'PHP'],
            ['name' => 'Python'],
            ['name' => 'QA'],
            ['name' => 'Ruby'],
            ['name' => 'Sales'],
            ['name' => 'Remote work']
        ]);
    }
}
