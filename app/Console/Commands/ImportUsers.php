<?php

namespace App\Console\Commands;

use App\SentinelUser;
use App\User;
use Illuminate\Console\Command;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Sentinel;
use App\UserAccessDepartment;

class ImportUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:import';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $lastImportId = DB::table('users')->max('redmine_id');
        $departmentsList = DB::table('departments')->get();
        $queryString = config('redmine.login') . ':' . config('redmine.password') . '@' . config('redmine.url') . '/contacts.json';

        $insertArray = [];

        $result = $this->sendRedmineRequest($queryString, 100, 0);
        $usersArray = $result['contacts'];
        $totalCount = $result['total_count'];

        for ($i = 1; $i < ceil($totalCount / 100); $i++) {
            $result = $this->sendRedmineRequest($queryString, ($i + 1) * 100, $i * 100);
            $usersArray = array_merge($usersArray, $result['contacts']);
        }

        if ($lastImportId) {
            foreach ($usersArray as $item) {
                if($item['id'] > $lastImportId) {
                    $insertArray[] = $item;
                }
            }
        } else {
            $insertArray = $usersArray;
        }

        foreach ($insertArray as $user) {
            $depId = $this->checkDepartment($departmentsList, $user['tag_list']);
            $newUser = new User();
            $newUser->email = $user['emails'][0]['address'];
            $newUser->password = bcrypt($user['emails'][0]['address']);
            $newUser->first_name = trim($user['first_name']);
            $newUser->last_name = trim($user['last_name']);
            $newUser->department_id = $depId == 0 ? NULL : $depId;
            $newUser->redmine_id = $user['id'];
            $newUser->save();

//            $this->addRole($user['tag_list'], $newUser);
            $this->addAccess($user['tag_list'], $departmentsList, $newUser);
        }

        if (User::count() !== $totalCount) {
            $existUsers = User::get();

            foreach ($existUsers as $existUser) {
                $diff = false;
                foreach ($usersArray as $user) {
                    if($existUser->redmine_id == $user['id']) {
                        $diff = false;
                        break;
                    } else {
                        $diff = true;
                    }
                }

                $tempUser = User::find($existUser->id);
                if ($diff && !$tempUser->inRole('admin')) {
                    $existUser->delete();
                }
            }
        }
    }

    /**
     * Get department from tag list
     *
     * @param $depList
     * @param $tags
     *
     * @return mixed
     */
    private function checkDepartment($depList, $tags)
    {
        if(in_array('Managers', $tags)) {
            foreach ($depList as $dept) {
                if ($dept->name == 'Managers') {
                    return $dept->id;
                }
            }
        } else {
            foreach ($tags as $tag) {
                foreach ($depList as $dep) {
                    if($tag == $dep->name) {
                        return $dep->id;
                    }
                }
            }
        }

        return 0;
    }

    /**
     * Add access to user's department
     *
     * @param $tags
     * @param $depList
     * @param $user
     */
    private function addAccess($tags, $depList, $user)
    {
        if(in_array('Managers', $tags)) {
            foreach ($tags as $tag) {
                foreach ($depList as $dept) {
                    if ($tag == $dept->name && $tag != 'Managers') {
                        UserAccessDepartment::create(['user_id' => $user->id, 'department_id' => $dept->id]);
                    }
                }
            }
        } elseif(!is_null($user->department_id)) {
            UserAccessDepartment::create(['user_id' => $user->id, 'department_id' => $user->department_id]);
        }
    }

    /**
     * Add user to role
     *
     * @param $tags
     * @param $user
     */
    private function addRole($tags, $user)
    {
        $role = Sentinel::findRoleBySlug('dev');

        foreach ($tags as $tag) {
            switch ($tag) {
                case $tag == 'Managers':
                    $role = Sentinel::findRoleBySlug('PM');
                    break;

                case $tag == 'Sales':
                    $role = Sentinel::findRoleBySlug('sales');
                    break;

                case $tag == 'lead':
                    $role = Sentinel::findRoleBySlug('lead');
                    break;

                case $tag == 'hr':
                    $role = Sentinel::findRoleBySlug('hr');
                    break;
            }
        }

        $role->users()->attach($user);
    }


    /**
     * Send request to Redmine
     *
     * @param $url
     * @param $limit
     * @param $offset
     *
     * @return mixed
     */
    private function sendRedmineRequest($url, $limit, $offset)
    {
        $ch = curl_init($url . '?' . http_build_query(['limit' => $limit, 'offset' => $offset]));
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
        $output = curl_exec($ch);
        curl_close($ch);
        $result = json_decode($output, true);

        return $result;
    }
}
