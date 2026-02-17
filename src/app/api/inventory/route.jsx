import { dbConnect } from "@/lib/dbConnect";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  
  // Filtering logic
  const query = {};
  
  const search = searchParams.get("search");
  if (search) {
    query.$or = [
      { brand: { $regex: search, $options: "i" } },
      { model: { $regex: search, $options: "i" } }
    ];
  }

  const brand = searchParams.get("brand");
  if (brand) query.brand = brand;

  const transmission = searchParams.get("transmission");
  if (transmission && transmission !== "All Types") query.transmission = transmission;

  const fuelType = searchParams.get("fuelType");
  if (fuelType) query.fuelType = fuelType;

  const maxPrice = searchParams.get("maxPrice");
  if (maxPrice) query.price = { $lte: parseInt(maxPrice) };

  const carRes = await dbConnect("cars");
  const cars = await carRes.find(query).toArray();

  return Response.json({
    cars,
    message: "Cars retrieved successfully!",
  });
}