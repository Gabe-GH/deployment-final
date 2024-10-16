// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { RegisterUser } from "@/app/db/controllers";

export async function POST(request: NextRequest) {
  const formData = await request.json();

  try {
    const user = await RegisterUser(formData);

    // Set the session cookie on success
    cookies().set({
      name: "session",
      value: "logged_in",
      httpOnly: true, // Secure the cookie, prevents JS from accessing it
      secure: true, // Only send cookie over HTTPS
      sameSite: "strict", // CSRF protection
      path: "/",
    });

    cookies().set({
      name: "user",
      value: user,
      httpOnly: true, // Secure the cookie, prevents JS from accessing it
      secure: true, // Only send cookie over HTTPS
      sameSite: "strict", // CSRF protection
      path: "/",
    });

    return NextResponse.json({ message: "register successful", user });
  } catch (e) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }
}
