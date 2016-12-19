<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['middleware' => ['cors']], function () {
    Route::post('authenticate', 'AuthenticationController@authenticate');
    Route::post('/register', 'AuthenticationController@registration');
    Route::post('/login', 'AuthenticationController@login');
    Route::post('/logout', 'AuthenticationController@logout');
    Route::post('/change-password', 'AuthenticationController@changePassword');

    Route::group(['middleware' => ['jwt.auth']], function () {
        Route::get('/roles', 'RoleController@getRoles');
        Route::post('/role/{role?}', 'RoleController@createUpdateRole');
        Route::post('/role/{role}/add-permission', 'RoleController@addPermissionsToRole');
        Route::get('/permissions', 'RoleController@getPermissions');
        Route::get('/departments', 'DepartmentController@getDepartments');
        Route::post('/add-user-department', 'DepartmentController@addUserToDepartment');
        Route::get('/users', 'UserController@getUsers');
        Route::get('/user/{user}', 'UserController@getUser');
	    Route::get('/profile/{user}', 'ProfileController@getUserProfile');
        Route::get('/technologies', 'TechnologiesController@getTechnologies');
        Route::get('/technology/{technology}', 'TechnologiesController@getTechnology');
        Route::post('/add-technology', 'TechnologiesController@addTechnology');
        Route::get('/projects', 'ProjectController@getProjects');
        Route::get('/project/{id}', 'ProjectController@getProject');
        Route::post('/project/edit', 'ProjectController@editProject');

        Route::group(['middleware' => ['permissions']], function () {
	        Route::post('/profile/save', 'ProfileController@saveUser');

        });
    });
});

