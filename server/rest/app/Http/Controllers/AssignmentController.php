<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AssignmentController extends Controller
{
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
            // * link a storage for content, conditional 


        
    }
}
