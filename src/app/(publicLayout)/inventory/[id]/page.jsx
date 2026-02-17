import { getCarById } from "@/services/carsService";
import React from "react";
import Link from "next/link";
import {
  FaGasPump,
  FaCogs,
  FaRoad,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import {
  MdSpeed,
  MdVerified,
  MdColorLens,
  MdAirlineSeatReclineExtra,
  MdLocalOffer,
  MdInfoOutline,
} from "react-icons/md";
import { HiArrowLeft } from "react-icons/hi";

const CarDetails = async ({ params }) => {
  const { id } = await params;
  const car = await getCarById(id);

  if (!car)
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-error">
        <MdInfoOutline className="text-6xl" />
        <h2 className="text-2xl font-bold">Car not found</h2>
        <Link href="/cars" className="btn btn-primary btn-outline">
          Back to Inventory
        </Link>
      </div>
    );

  // Helper to format currency
  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="container mx-auto px-4 md:px-8 z-10">
      {/* Top Navigation */}
      <div className="max-w-7xl mx-auto mb-6">
        <Link
          href="/cars"
          className="btn btn-ghost gap-2 text-neutral hover:bg-base-300 hover:text-primary transition-all"
        >
          <HiArrowLeft className="text-lg" />
          Back to Listings
        </Link>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Image & Quick Visuals (Span 7) */}
        {/* Container: Mobile এ ওপর-নিচে (flex-col), ল্যাপটপ/ম্যাকবুক এ পাশাপাশি (lg:flex-row) */}
        <div className="lg:col-span-7 flex flex-col lg:flex-row gap-6 items-start">
          {/* Main Image Card - ল্যাপটপে অর্ধেক জায়গা নেবে */}
          <div className="card bg-base-100 shadow-xl overflow-hidden border border-base-300 relative group w-full lg:w-1/2">
            <figure className="relative h-[300px] md:h-[400px] lg:h-[450px] w-full">
              <img
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base-100/80 via-transparent to-transparent opacity-60"></div>

              <div className="absolute top-4 left-4 flex gap-2">
                {car.condition === "New" && (
                  <div className="badge badge-accent font-semibold shadow-lg">
                    New Arrival
                  </div>
                )}
                {car.isFeatured && (
                  <div className="badge badge-primary text-primary-content gap-1 shadow-lg">
                    <MdVerified /> Featured
                  </div>
                )}
              </div>
            </figure>
          </div>

          {/* Description Card - ল্যাপটপে বাকি অর্ধেক জায়গা নেবে */}
          <div className="card bg-base-100 shadow-lg border border-base-300 p-6 w-full lg:w-1/2 self-stretch">
            <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
              Vehicle Overview
            </h3>
            <p className="text-neutral/80 leading-relaxed text-base">
              {car.description}
            </p>

            <div className="divider my-4"></div>

            {/* Features List */}
            <h4 className="font-semibold text-neutral mb-4">
              Premium Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {car.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-neutral/90 text-sm"
                >
                  <FaCheckCircle className="text-success text-md flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Specs & Purchase Info (Span 5) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Info Card */}
          <div className="card bg-base-100 shadow-lg border border-base-300 p-6 sm:p-8">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-secondary font-medium tracking-wide text-sm uppercase">
                  {car.year} • {car.bodyType}
                </p>
                <h1 className="text-4xl font-extrabold text-primary mt-1">
                  {car.brand} <span className="text-neutral">{car.model}</span>
                </h1>
              </div>
            </div>

            <div className="mt-4 mb-6">
              <span className="text-3xl sm:text-4xl font-bold text-primary">
                {formatCurrency(car.price)}
              </span>
              <span className="text-sm text-neutral/60 ml-2">MSRP</span>
            </div>

            {/* Stock Status */}
            <div
              className={`alert ${car.stockStatus === "Available" ? "alert-success" : "alert-warning"} bg-opacity-10 py-2 rounded-lg mb-6`}
            >
              <MdVerified
                className={
                  car.stockStatus === "Available"
                    ? "text-success"
                    : "text-warning"
                }
              />
              <span className="font-medium text-sm text-neutral">
                {car.stockStatus === "Available"
                  ? "In Stock & Ready for Delivery"
                  : car.stockStatus}
              </span>
            </div>
          </div>

          {/* Technical Specs Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Spec Item Component */}
            <SpecBox
              icon={<MdSpeed className="text-2xl text-secondary" />}
              label="Engine"
              value={car.engineSize}
              subValue={`${car.horsepower} HP`}
            />
            <SpecBox
              icon={<FaCogs className="text-2xl text-secondary" />}
              label="Transmission"
              value={car.transmission}
              subValue={car.driveType}
            />
            <SpecBox
              icon={<FaRoad className="text-2xl text-secondary" />}
              label="Mileage"
              value={`${car.mileage} miles`}
              subValue={car.fuelEfficiency}
            />
            <SpecBox
              icon={<FaGasPump className="text-2xl text-secondary" />}
              label="Fuel Type"
              value={car.fuelType}
            />
            <SpecBox
              icon={<MdColorLens className="text-2xl text-secondary" />}
              label="Color"
              value={car.exteriorColor}
              subValue={`Int: ${car.interiorColor}`}
            />
            <SpecBox
              icon={
                <MdAirlineSeatReclineExtra className="text-2xl text-secondary" />
              }
              label="Capacity"
              value={`${car.seatingCapacity} Seats`}
            />
          </div>

          {/* VIN Info */}
          <div className="text-center text-xs text-neutral/40 pt-4">
            VIN: {car.vin} • Listed on{" "}
            {new Date(car.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Small Component for Specs to keep code clean
const SpecBox = ({ icon, label, value, subValue }) => (
  <div className="bg-base-100 p-4 rounded-xl border border-base-300 shadow-sm flex items-start gap-3 hover:shadow-md transition-shadow">
    <div className="p-2 bg-base-200 rounded-lg text-primary">{icon}</div>
    <div>
      <p className="text-xs text-neutral/60 font-medium uppercase tracking-wider">
        {label}
      </p>
      <p className="font-bold text-neutral text-sm sm:text-base">{value}</p>
      {subValue && <p className="text-xs text-secondary mt-0.5">{subValue}</p>}
    </div>
  </div>
);

export default CarDetails;
