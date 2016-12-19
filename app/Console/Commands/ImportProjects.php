<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Project;

class ImportProjects extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'projects:import';

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
        $lastImportDate = DB::table('projects')->max('created_at');
        $queryString = config('redmine.login') . ':' . config('redmine.password') . '@' . config('redmine.url') . '/projects.json';

        $insertArray = [];

        $result = $this->sendRedmineRequest($queryString, 100, 0);
        $projectsArray = $result['projects'];
        $totalCount = $result['total_count'];

        for ($i = 1; $i < ceil($totalCount / 100); $i++) {
            $result = $this->sendRedmineRequest($queryString, ($i + 1) * 100, $i * 100);
            $projectsArray = array_merge($projectsArray, $result['projects']);
        }

        if ($lastImportDate) {
            $lastImportDate = new Carbon($lastImportDate);
            foreach ($projectsArray as $item) {
                $createdDate = new Carbon($item['created_on']);
                if ($createdDate->gte($lastImportDate)) {
                    $insertArray[] = $item;
                }
            }
        } else {
            $insertArray = $projectsArray;
        }

        foreach ($insertArray as $project) {
            Project::create([
                'name' => $project['name'],
                'description' => $project['description'],
                'type' => Project::TYPE_INNER,
                'status' => Project::STATUS_OPEN,
                'redmine_id' => $project['id'],
                'start_date' => $project['created_on']
            ]);
        }

        if (Project::get()->count() !== $totalCount) {
            $existsProjects = Project::all();

            foreach ($existsProjects as $existsProject) {
                $diff = false;
                foreach ($projectsArray as $project) {
                    if($existsProject->redmine_id == $project['id']) {
                        $diff = false;
                        break;
                    } else {
                        $diff = true;
                    }
                }

                if ($diff) {
                    $existsProject->delete();
                }
            }
        }
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
    private function sendRedmineRequest($url, $limit, $offset) {
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
