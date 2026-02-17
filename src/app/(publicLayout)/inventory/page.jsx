import { getAllCars } from "@/services/carsService";
import React from "react";
import CarCard from "@/components/shared/CarCard";
import InventoryFilters from "@/components/inventory/InventoryFilters"; // Alada component

const InventoryPage = async ({ searchParams }) => {
  // Server-side fetching with params
  const data = await getAllCars(searchParams);
  const cars = data?.cars || [];

  return (
    <div className="min-h-screen bg-base-100">
      <div className="bg-base-200 border-b border-base-300 py-12">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            Vehicle <span className="text-primary italic">Inventory</span>
          </h1>
          <p className="text-neutral/60 mt-2">Found {cars.length} vehicles matching your search.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filter Sidebar (Client Component) */}
          <InventoryFilters />

          {/* Car Grid */}
          <main className="w-full lg:w-3/4">
            {cars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {cars.map((car) => (
                  <CarCard key={car._id} car={car} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-base-200 rounded-3xl border border-dashed border-base-300">
                <h3 className="text-xl font-bold opacity-40">No vehicles found. Try resetting filters.</h3>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;