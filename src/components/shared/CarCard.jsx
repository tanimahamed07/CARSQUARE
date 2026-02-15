import React from "react";
import Link from "next/link"; // Eita 'daisyui' chilo, ekhon 'next/link' hobe
import { FaGasPump, FaCogs, FaRoad } from "react-icons/fa";
import { MdSpeed, MdVerified } from "react-icons/md";

const CarCard = ({ car }) => {
  return (
    <div
      className="group flex flex-col bg-base-200 rounded-3xl overflow-hidden border border-base-300 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 h-full"
    >
      {/* Image Wrapper */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={
            car.image ||
            "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop"
          }
          alt={car.model}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="badge badge-primary font-bold p-3 shadow-lg">
            Featured
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-base-100/80 backdrop-blur-md p-2 rounded-full shadow-md text-success">
          <MdVerified size={20} />
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-1">
              {car.brand} {car.model}
            </h3>
            <span className="text-xs font-bold bg-accent/20 text-accent px-2 py-1 rounded">
              {car.year}
            </span>
          </div>
          <p className="text-2xl font-black text-neutral">
            ${car.price?.toLocaleString()}
          </p>
        </div>

        {/* Features Icon Grid */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-2 py-4 border-y border-base-300 mb-6">
          <div className="flex items-center gap-2 text-sm font-medium opacity-80">
            <FaRoad className="text-primary shrink-0" />
            <span className="truncate">{car.mileage} miles</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium opacity-80">
            <FaGasPump className="text-primary shrink-0" />
            <span className="truncate">{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium opacity-80">
            <FaCogs className="text-primary shrink-0" />
            <span className="truncate">{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium opacity-80">
            <MdSpeed className="text-primary shrink-0" />
            <span className="truncate">{car.horsepower} HP</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          <Link
            href={`/cars/${car._id}`}
            className="btn btn-outline btn-primary btn-block rounded-xl group-hover:btn-active transition-all"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;