import React from "react";
import Link from "next/link";
import { FaGasPump, FaCogs, FaArrowRight, FaRoad } from "react-icons/fa";
import { MdVerified, MdSpeed } from "react-icons/md";
import { getAllCars } from "@/services/carsService";
import CarCard from "../shared/CarCard";

const FeaturedCars = async () => {
  const data = await getAllCars();
  const cars = data?.cars?.slice(0, 4) || [];

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-sm">
              <span className="w-10 h-[2px] bg-accent"></span>
              Our Collection
            </div>
            <h2 className="text-3xl md:text-4xl font-black">
              Featured <span className="text-primary italic">Vehicles</span>
            </h2>
          </div>
          <Link
            href="/inventory"
            className="group flex items-center gap-2 text-primary font-bold hover:opacity-80 transition-all"
          >
            View All Inventory
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
