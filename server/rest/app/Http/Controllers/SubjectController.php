<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Ramsey\Uuid\Uuid;

class SubjectController extends Controller
{
    // adding a year field to differ btw subjects and then a class field to differ btw assignments
    public function addSubject(Request $request){
        $validation = Validator::make($request->all(),[
            "subject" => "required|string"
        ]);
        if($validation->fails()){
            return response()->json($validation->errors()->all(),400);
        }
        $validated = $validation->validated();
        Subject::create([
            "subject" => $validated["subject"],
            "subject_uuid" => Uuid::uuid4()
        ]);
    }
    public function getSubjects(Request $request){
        $subjects = Subject::select("subject","subject_uuid")->get();
        return response()->json(["subjects"=>$subjects],200);
    }
}
