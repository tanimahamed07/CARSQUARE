import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server"; 

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const userCollection = await dbConnect("users"); // Call inside handler
    
    const isUserExist = await userCollection.findOne({ email: reqBody.email });
    if (isUserExist) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(reqBody.password, 10);
    const newUser = await userCollection.insertOne({
      name: reqBody.name,
      email: reqBody.email,
      password: passwordHash,
      role: reqBody.role || "user",
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const allUsers = await users.find().toArray();
    return Response.json(allUsers);
  } catch (error) {
    return Response.json(error);
  }
}

export async function PATCH(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const body = await request.json();

    if (!id || !body.role) {
      return Response.json({ message: "Invalid request" }, { status: 400 });
    }

    const result = await users.updateOne(
      { _id: new ObjectId(id) },
      { $set: { role: body.role } },
    );

    return Response.json({
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}
