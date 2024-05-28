<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function userList()
    {
        $users = User::all();

        return response()->json([
            'status' => 200,
            'data' => $users
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function addUser(Request $request)
    {
        // Define validation rules
        $rules = [
            'username' => 'required|unique:users|max:255',
            'password' => 'required|min:8'
        ];

        // Validate the request data
        $validator = Validator::make($request->all(), $rules);

        // If validation fails, return a response with errors
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ]);
        }

        $user = new User();
        $user->username = $request->username;
        $user->password = $request->password;
        $user->save();

        return response()->json([
            'status' => 200,
            'message' => 'User added successfully'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showUser($username)
    {
        $user = User::where('username', $username)->first();

        if (!$user) {
            return response()->json([
                'status' => 404,
                'message' => 'User not found'
            ]);
        }

        return response()->json([
            'status' => 200,
            'user' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function editUser(Request $request, $userId)
    {
        $user = User::find($userId);

        if (!$user) {
            return response()->json([
                'status' => 404,
                'message' => 'User not found'
            ]);
        }

        // Define validation rules
        $rules = [
            'username' => 'required|unique:users|max:255',
            'password' => 'required|min:8'
        ];

        // Validate the request data
        $validator = Validator::make($request->all(), $rules);

        // If validation fails, return a response with errors
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ]);
        }

        $user->username = $request->username;
        $user->password = $request->password;
        $user->save();

        return response()->json([
            'status' => 201,
            'message' => 'User updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function removeUser($userId)
    {
        $user = User::find($userId);

        if (!$user) {
            return response()->json([
                'status' => 404,
                'message' => 'User not found'
            ]);
        }

        $user->delete();

        return response()->json([
            'status' => 200,
            'message' => 'User removed successfully'
        ]);
    }
}
