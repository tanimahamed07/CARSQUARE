import { dbConnect } from "@/lib/dbConnect";

export async function GET(request) {
  const carRes = await dbConnect("cars");
  const cars = await carRes.find({}).toArray();
  return Response.json({
    cars,
    message: "Cars retrieved successfully!",
  });
}
