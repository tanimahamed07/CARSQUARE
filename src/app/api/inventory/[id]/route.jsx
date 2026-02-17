import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    // 1. Validation
    if (!id || id.length !== 24) {
      return Response.json({ message: "Invalid car ID" }, { status: 400 });
    }

    // 2. Await the collection properly
    const carsCollection = await dbConnect("cars");
    const car = await carsCollection.findOne({ _id: new ObjectId(id) });

    if (!car) {
      return Response.json({ message: "Car not found" }, { status: 404 });
    }

    return Response.json({
      car,
      message: "Single car retrieved successfully!",
    });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}