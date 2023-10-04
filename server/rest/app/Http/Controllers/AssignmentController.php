<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\Subject;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Ramsey\Uuid\Uuid;


// todo: exception handling
// ! breaking change: adding content table in the future
class AssignmentController extends Controller
{
    public function getSubjectId($subjectUuid){
        $actualSubjectId = Subject::select("id")->where("subject_uuid", $subjectUuid)->first("id")->id;
        return $actualSubjectId;
    }

    public function getAssignmentId($assignmentUuid){
        $actualAssignmentId = Assignment::where("assignment_uuid", $assignmentUuid)->first()->id;
        return $actualAssignmentId;
    }

    public function getAssignments(Request $request){
        // * only for dev
        $assignments = Assignment::all();
        return response()->json(["assignments" => $assignments],200);
    }

    public function addAssignment(Request $request){
        //  * 7 fields
        $validation = Validator::make($request->all(),[
            "title" => "required|string",
            "subject_uuid" => "required|uuid",
            "description" => "string|nullable",
            "link"=>"string|nullable",
            "content" => "file|mimetypes:application/pdf,text/plain,image/jpeg,image/jpg,image/png|nullable",]);
        if($validation->fails()){
            return response()->json($validation->errors()->all(),400);
        }

        $validated = $validation->validated();

        if (!Subject::where("subject_uuid", $validated["subject_uuid"])->exists()) {
            return response()->json(["message" => "Subject not found"], 404);
        }

        $subjectId = $this->getSubjectId($validated["subject_uuid"]);

        if($request->has('content')){
            try{
                $content = $request->file('content');
                $content_name = time().'.'.$content->getClientOriginalExtension();
                Storage::disk('public')->put("/assignment_content/".$content_name,file_get_contents($content));
                $url = Storage::url("assignment_content/".$content_name);
            }catch(Exception $e){ 
               return $e->getMessage();
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

        if($request->has("link")){
            $assignment = Assignment::create([
                "title" => $validated["title"],
                "description" => $validated["description"],
                "subject_id" => $subjectId,
                "assignment_uuid" => Uuid::uuid4(),
                "link" => $validated["link"]
            ]);
            return response()->json(["assignment" => $assignment],201);
        }
        $assignment = Assignment::create([
            "title" => $validated["title"],
            "description" => $validated["description"],
            "subject_id" => $subjectId,
            "assignment_uuid" => Uuid::uuid4(),
        ]);
        return response()->json(["assignment" => $assignment],201);

    }


    public function editAssignment(Request $request, $assignmentUuid)
{
    $validator = Validator::make(['uuid' => $assignmentUuid], [
        'uuid' => 'required|uuid',
    ]);

    if ($validator->fails()) {
        return response()->json(["message" => "Invalid UUID"], 400);
    }

    $validation = Validator::make($request->all(), [
        "title" => "string",
        "description" => "string|nullable",
        "link" => "string|nullable",
        "content" => "file|mimetypes:application/pdf|nullable",
    ]);

    if ($validation->fails()) { 
        return response()->json($validation->errors()->all(), 400);
    }

    if (!Assignment::where("assignment_uuid", $assignmentUuid)->exists()) {
        return response()->json(["message" => "Assignment not found"], 404);
    }

    $assignmentId = $this->getAssignmentId($assignmentUuid);

    $assignment = Assignment::find($assignmentId);

    if (!$assignment) {
        return response()->json(["error" => "Assignment not found"], 404);
    }

    $requestData = $validation->validated();

    if (isset($requestData['title'])) {
        $assignment->title = $requestData['title'];
    }

    if (isset($requestData['description'])) {
        $assignment->description = $requestData['description'];
    }

    if (isset($requestData['link'])) {
        $assignment->link = $requestData['link'];
    }

    if ($request->hasFile('content')) {
        try {
            $content = $request->file('content');
            $content_name = time() . '.' . $content->getClientOriginalExtension();
            Storage::disk('public')->put("/assignment_content/" . $content_name, file_get_contents($content));
            $url = Storage::url("assignment_content/" . $content_name);
            $assignment->content = $url;
        } catch (Exception $e) {
            return response()->json(["error" => $e->getMessage()], 500);
        }
    }

    $assignment->save();

    return response()->json(["assignment" => $assignment], 200);
}


public function deleteAssignment($assignmentUuid)
{
    $validator = Validator::make(['uuid' => $assignmentUuid], [
        'uuid' => 'required|uuid',
    ]);

    if ($validator->fails()) {
        return response()->json(["message" => "Invalid UUID"], 400);
    }
    // Get the assignment ID using the getAssignmentId function
    if (!Assignment::where("assignment_uuid", $assignmentUuid)->exists()) {
        return response()->json(["message" => "Assignment not found"], 404);
    }
    $assignmentId = $this->getAssignmentId($assignmentUuid);

    // Find the assignment by its ID
    $assignment = Assignment::find($assignmentId);

    if (!$assignment) {
        return response()->json(["error" => "Assignment not found"], 404);
    }

    // Delete the assignment content file if it exists
    if (!empty($assignment->content)) {
        $contentPath = public_path('assignment_content/' . basename($assignment->content));
        if (File::exists($contentPath)) {
            File::delete($contentPath);
        }
    }

    // Delete the assignment
    $assignment->delete();

    return response()->json(["message" => "Assignment deleted successfully"], 200);
}

// ! integrate into one query if needed, 
public function getAssignment($assignmentUuid){
    $validator = Validator::make(['uuid' => $assignmentUuid], [
        'uuid' => 'required|uuid',
    ]);

    if ($validator->fails()) {
        return response()->json(["message" => "Invalid UUID"], 400);
    }

    if (!Assignment::where("assignment_uuid", $assignmentUuid)->exists()) {
        return response()->json(["message" => "Assignment not found"], 404);
    }

    $assignmentId = $this->getAssignmentId($assignmentUuid);

    $assignmentDetails = Assignment::select("title","description","content","link","assignment_uuid")->where("id",$assignmentId)->first();
    return response()->json(["assignment" => $assignmentDetails],200);
}
public function getSolutionsByAssignment(Request $request, $assignmentUuid)
{
    $assignment = Assignment::with(["solutions"])
        ->where("assignment_uuid", $assignmentUuid)
        ->first();

    if (!$assignment) {
        return response()->json(["message" => "Assignment not found"], 404);
    }

    $content = null;
    if (!empty($assignment->content)) {
        $contentPath = public_path($assignment->content);

        if (File::exists($contentPath)) {
             // Read the content of the file
             $fileContent = file_get_contents($contentPath);

             // Encode the content as base64
             $content = base64_encode($fileContent);
        }
    }

    // Return the assignment details along with content as base64 encoded string
    return response()->json([
        "assignment" => [
            "title" => $assignment->title,
            "description" => $assignment->description,
            "content" => $content, // Content as base64 encoded string
            "link" => $assignment->link,
            "assignment_uuid" => $assignment->assignment_uuid
        ],
        "solutions" => $assignment->solutions
    ], 200);
}


public function getAssignmentsWithSubjects(Request $request){
$assignments = Assignment::join("subjects","subjects.id","=","assignments.subject_id")->select("assignments.title","assignments.assignment_uuid","subjects.subject")->get();
return response()->json(["assignments"=>$assignments],200);
}

    
}
