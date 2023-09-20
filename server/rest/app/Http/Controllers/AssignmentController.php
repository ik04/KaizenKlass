<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\Subject;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Ramsey\Uuid\Uuid;

class AssignmentController extends Controller
{
    public function getSubjectId($subjectUuid){
        $actualCategoryId = Subject::select("id")->where("category_uuid", $subjectUuid)->first("id")->id;
        return $actualCategoryId;

    }
    public function addAssignment(Request $request){
        //  * 7 fields
        $validation = Validator::make($request->all(),[
            "title" => "required|string",
            "subject_uuid" => "required|uuid",
            "description" => "required|string",
            "link"=>"string|nullable",
            "content"=>"string|nullable"
        ]);
        if($validation->fails()){
            return response()->json($validation->errors()->all(),400);
        }

        $validated = $validation->validated();
        //de-alias subject_uuid
        $subjectId = $this->getSubjectId($validated["subject_uuid"]);

        if($request->has('content')){
            try{
                $content = $request->file('content');
                $content_name = time().'.'.$content->getClientOriginalExtension();
                Storage::disk('public')->put("/assignment_content/".$content_name,file_get_contents($content));
                $url = Storage::url("items/".$content_name);
            }catch(Exception $e){ 
               return $e->getMessage();
            }
        }

        $assignment = Assignment::create([
            "title" => $validated["title"],
            "description" => $validated["description"],
            "subject_id" => $subjectId,
            "assignment_uuid" => Uuid::uuid4(),
            "content" => $url,
            "link" => $validated["link"]
        ]);
        return response()->json(["assignment" => $assignment],201);
    }
}
