<?php

use App\Http\Controllers\SubjectController;
use App\Http\Controllers\UserController;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Ramsey\Uuid\Uuid;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::prefix("v1")->group(function(){
    
    Route::post("register-admin",[UserController::class,"registerAdmin"]);
    Route::post("register-contributor",[UserController::class,"registerContributor"]);
    Route::post("register-crosschecker",[UserController::class,"registerCrosschecker"]);
    Route::post("login",[UserController::class,"login"]);
    Route::get("user-data",[UserController::class,"userData"]); // No regular users
    Route::get("get-subjects",[SubjectController::class,"getSubjects"]);

    Route::middleware(["auth:sanctum"])->group(function(){
        Route::post("logout",[UserController::class,"logout"]);
    });

    Route::middleware(["auth:sanctum","checkAdmin"])->group(function(){
        Route::post("add-subject",[SubjectController::class,"addSubject"]);
        Route::get("/_dbinit",function(){
            $relativePath = __DIR__ . "/init/subjects.json";
            $subjects = file_get_contents($relativePath);
            $subjects = json_decode($subjects);
            $subjects = $subjects->subjects;
            foreach($subjects as $subject){
                $subject = Subject::create([
                    "subject" => $subject->subject,
                    "subject_uuid" => Uuid::uuid4()
                ]);
            }
            return response()->json("initialized subjects db",201);
        });
    });
    
});