"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSearch, FaFilter, FaUndo } from "react-icons/fa";
import { useState, useEffect } from "react";

const InventoryFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Initial state from URL
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    brand: searchParams.get("brand") || "",
    maxPrice: searchParams.get("maxPrice") || "500000",
    transmission: searchParams.get("transmission") || "",
    fuelType: searchParams.get("fuelType") || "",
  });

  // URL Update Logic
  const updateURL = (newFilters) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (newFilters[key] && newFilters[key] !== "") {
        params.set(key, newFilters[key]);
      }
    });
    router.push(`/inventory?${params.toString()}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...filters, [name]: value };
    setFilters(updated);
    
    // Search বাদে অন্য সব ফিল্টার চেঞ্জ হওয়ার সাথে সাথে URL আপডেট হবে
    if (name !== "search") {
      updateURL(updated);
    }
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    updateURL(filters);
  };

  const resetFilters = () => {
    const resetValues = {
      search: "",
      brand: "",
      maxPrice: "500000",
      transmission: "",
      fuelType: "",
    };
    setFilters(resetValues);
    router.push('/inventory');
  };

  return (
    <aside className="w-full lg:w-1/4 space-y-6">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <input 
          type="text"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Search model (e.g. Taycan)..." 
          className="input input-bordered w-full pl-12 rounded-2xl bg-base-100 shadow-sm focus:border-primary"
        />
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/40 cursor-pointer" onClick={handleSearchSubmit} />
      </form>

      <div className="bg-base-100 p-6 rounded-3xl border border-base-300 sticky top-24 shadow-sm">
        <h3 className="font-bold text-lg flex items-center gap-2 mb-6">
          <FaFilter className="text-primary text-sm" /> Refine Search
        </h3>

        {/* Brand Select */}
        <div className="form-control w-full mb-6">
          <label className="label py-1">
            <span className="text-xs font-black uppercase opacity-60">Brand</span>
          </label>
          <select 
            name="brand" 
            value={filters.brand} 
            onChange={handleChange} 
            className="select select-bordered select-sm w-full rounded-xl focus:outline-none focus:border-primary"
          >
            <option value="">All Brands</option>
            <option value="Porsche">Porsche</option>
            <option value="BMW">BMW</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
            <option value="Audi">Audi</option>
            <option value="Lexus">Lexus</option>
            <option value="Range Rover">Range Rover</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="space-y-3 mb-8">
          <div className="flex justify-between items-center">
            <label className="text-xs font-black uppercase opacity-60">Max Price</label>
            <span className="badge badge-primary badge-outline font-bold">${Number(filters.maxPrice).toLocaleString()}</span>
          </div>
          <input 
            type="range" name="maxPrice" min="50000" max="500000" step="5000"
            value={filters.maxPrice} onChange={handleChange}
            className="range range-primary range-xs" 
          />
        </div>

        {/* Transmission Toggle */}
        <div className="space-y-3 mb-8">
          <label className="text-xs font-black uppercase opacity-60">Transmission</label>
          <div className="flex gap-2">
            {["Automatic", "Manual"].map((t) => (
              <button 
                key={t}
                type="button"
                onClick={() => {
                   const updated = {...filters, transmission: filters.transmission === t ? "" : t};
                   setFilters(updated);
                   updateURL(updated);
                }}
                className={`btn btn-xs flex-1 rounded-lg transition-all ${filters.transmission === t ? 'btn-primary' : 'btn-outline border-base-300'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Fuel Type */}
        <div className="form-control w-full mb-6">
          <label className="label py-1">
            <span className="text-xs font-black uppercase opacity-60">Fuel Type</span>
          </label>
          <select 
            name="fuelType" 
            value={filters.fuelType} 
            onChange={handleChange} 
            className="select select-bordered select-sm w-full rounded-xl focus:outline-none focus:border-primary"
          >
            <option value="">Any Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <button 
          onClick={resetFilters}
          className="btn btn-ghost btn-block btn-sm text-error mt-4 gap-2 hover:bg-error/10"
        >
          <FaUndo className="text-xs" /> Reset All
        </button>
      </div>
    </aside>
  );
};

export default InventoryFilters;