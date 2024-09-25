<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    //
    public function register(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed',
            ],
            [
                'name.required' => 'กรุณาใส่ชื่อ',
                'email.required' => 'กรุณาใส่อีเมล',
                'email.email' => 'รูปแบบอีเมลไม่ถูกต้อง',
                'email.max' => 'ความยาวของอีเมลต้องไม่เกิน :max ตัวอักษร',
                'email.unique' => 'อีเมลนี้ถูกใช้ไปแล้ว',
                'password.required' => 'กรุณาใส่รหัสผ่าน',
                'password.min' => 'รหัสผ่านต้องมีอย่างน้อย :min ตัวอักษร',
                'password.confirmed' => 'ยืนยันรหัสผ่านไม่ตรงกับรหัสผ่านที่ยืนยัน',
            ]
            );
            if($validator->fails()){
                return response()->json(['errors' => $validator->errors()], 422);
            } else {
                try {
                    $user = User::create([
                        'name' => $request->name,
                        'email' => $request->email,
                        'password' => Hash::make($request->password),
                    ]);

                    $token = $user->createToken($user->email . '_Token', [''])->plainTextToken;
                    return response()->json([
                        'token'=>$token,// ส่งค่า token กลับไปหาผู้ใช้งาน
                        'user'=>$user,// ส่งข้อมูลผู้ใช้กลับไปยังผู้ใช้งาน
                        'message'=> 'สมัครสมาชิกสำเร็จ'
                    ], 200);
                } catch (\Exception $e) {
                        return response()->json(['message' => 'มีบางอย่างผิดพลาดจริงๆนะ!'], 500);
                }
            }
    }
    public function login(Request $request) {
        $validator = Validator::make(
            $request->all(),
            [
                'email' => 'required|string|email',
                'password' => 'required|string',
            ],
            [
                'email.required' => 'กรุณาใส่อีเมล',
                'email.email' => 'รูปแบบอีเมลไม่ถูกต้อง',
                'password.required' => 'กรุณาใส่รหัสผ่าน',
            ]
        );
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        // Check email
        $user = User::where('email', $request['email'])->first();

        // Check password
        if(!$user || !Hash::check($request['password'], $user->password)) {
            return response([
                'message' => 'รหัสผ่านไม่ถูกต้อง'
            ], 400);
        }

        if ($user->user_type === 'admin') {
            $token = $user->createToken($user->email . '_AdminToken', ['server:admin'])->plainTextToken;
        } else {
            $token = $user->createToken($user->email . '_Token', [''])->plainTextToken;
        }
        return response()->json([
            'token' => $token, // ส่งค่า token กลับไปยังผู้ใช้
            'user' => $user,   // ส่งข้อมูลผู้ใช้กลับไปยังผู้ใช้
            'message' => 'เข้าสู่ระบบ' // ข้อความแจ้งเตือนว่าสมัครสมาชิกสำเร็จ
        ], 200);

    }

    public function user(Request $request)
    {
        try{
            $user = auth('sanctum')->user();
            if($user){
                return response()->json(['user' => $user],200);
            }else{
                return response()->json(['message' => 'คุณไม่มีสิทธิ์เข้าใช้งาน']);
            }
        }catch (\Exception $e) {
            return response()->json(['message' => 'มีบางอย่างผิดพลาดจริงๆ!'], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $user = auth()->user()->tokens()->delete();
            if ($user) {
                return response()->json(['message' => 'ออกจากระบบสำเร็จ'], 200);
            } else {
                return response()->json(['message' => 'ออกจากระบบไม่สำเร็จ'], 400);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'มีบางอย่างผิดพลาดจริงๆ!'], 500);
        }
    }

}
