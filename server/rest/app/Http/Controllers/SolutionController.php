<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SolutionController extends Controller
{
    public function addSolution(Request $request){
        $validation = Validator::make($request->all(),[
            "content" => "file|mimetypes:application/pdf,text/plain,image/jpeg,image/jpg,image/png|nullable",
            "assignment_uuid" => "uuid|required",
            "description" => "string|nullable"
        ]);
            if($validation->fails()){
                return response()->json($validation->errors()->all(),400);
            }
    }
}
