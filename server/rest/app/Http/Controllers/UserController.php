<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Ramsey\Uuid\Uuid;

class UserController extends Controller
{
    // todo: shift to service class logic
    public function registerAdmin(Request $request){
        $validation = Validator::make($request->all(),[
            "email" => "required|email|unique:users", // todo: add regex
            "name" => "required|string",
            "password" =>"required|confirmed|string"
        ]);
        if($validation->fails()){
            return response()->json($validation->errors()->all(),400);
        }
        $validated = $validation->validated();
        $user = User::create([
            "email" => $validated["email"],
            "name" => $validated["name"],
            "password" => Hash::make($validated["password"]),
            "user_uuid" => Uuid::uuid4(),
            "role" => Role::ADMIN->value
        ]);
        $user->id = null;
        return response()->json(["user"=>$user],201);
    }
    public function registerContributer(Request $request){
        $validation = Validator::make($request->all(),[
            "email" => "required|email|unique:users", // todo: add regex
            "name" => "required|string",
            "password" =>"required|confirmed|string"
        ]);
        if($validation->fails()){
            return response()->json($validation->errors()->all(),400);
        }
        $validated = $validation->validated();
        $user = User::create([
            "email" => $validated["email"],
            "name" => $validated["name"],
            "password" => Hash::make($validated["password"]),
            "user_uuid" => Uuid::uuid4(),
            "role" => Role::CONTRIBUTOR->value
        ]);
        return response()->json(["user"=>$user],201);
    }
    public function registerCrosschecker(Request $request){
        $validation = Validator::make($request->all(),[
            "email" => "required|email|unique:users", // todo: add regex
            "name" => "required|string",
            "password" =>"required|confirmed|string"
        ]);
        if($validation->fails()){
            return response()->json($validation->errors()->all(),400);
        }
        $validated = $validation->validated();
        $user = User::create([
            "email" => $validated["email"],
            "name" => $validated["name"],
            "password" => Hash::make($validated["password"]),
            "user_uuid" => Uuid::uuid4(),
            "role" => Role::CROSSCHECKER->value
        ]);
        return response()->json(["user"=>$user],201);
    }
    public function login(Request $request){
        $validation = Validator::make($request->all(),[
            "email" => "required|email",
            "password" => "required|string"
        ]);
        if($validation->fails()){
            return response()->json($validation->errors()->all(),400);
        }
        $validated = $validation->validated();
        $user = User::where("email",$validated["email"])->first();
        if(!$user){
            return response()->json(["error"=>"User not Found, Please Register"],401);
        }
        if(!Hash::check($validated["password"],$user->password)){
            return response()->json(["error"=>"Incorrect Password"],401);
        }
            $userToken = $user->createToken("myusertoken")->plainTextToken;
            $user->id = null;
            return response()->json(["user"=>$user,"user_token"=>$userToken],200)->withCookie(cookie()->forever('at',$userToken));
    }

    public function logout(Request $request){

        $request->user()->tokens()->delete();
        $response =  [
            'message' => 'logged out'
        ];
        return response($response,200);
    }

    public function userData(Request $request){
        if(!$request->hasCookie("at")){
            return response()->json([
                'error' => "Unauthenticated"
            ],401);
        }
        if($token = \Laravel\Sanctum\PersonalAccessToken::findToken($request->cookie("at"))){
            $user = $token->tokenable;
        }
        else{
            return response()->json([
                'error' => "unauthenticated"
            ],401);
        }
        if(is_null($user)){
            return response()->json([
                'error' => "Unauthenticated"
            ]);
        }
        return response() -> json([
            'email' => $user->email,
            'name' => $user->name,
            'uuid' => $user->user_uuid,
            'role' => $user->role,
            'access_token' => $request -> cookie('at'),
        ],200);
    }
}
