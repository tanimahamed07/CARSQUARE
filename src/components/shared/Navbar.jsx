"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  HiHome,
  HiCollection,
  HiCog,
  HiStar,
  HiUserCircle,
  HiSearch,
  HiSun,
  HiMoon,
  HiLogin,
  HiChevronDown
} from "react-icons/hi";

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  
  // ডেমো ইউজার লজিক (পরবর্তীতে API/NextAuth থেকে আসবে)
  const [user, setUser] = useState({ isLoggedIn: false, role: "user" }); 

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="sticky top-0 z-50 w-full border-b border-base-300 bg-base-100/80 backdrop-blur-md">
      <div className="navbar container mx-auto px-4 md:px-8 py-4">

        {/* --- Mobile Menu --- */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden p-0 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-base-300">
              <li><Link href="/"><HiHome /> Home</Link></li>
              <li><Link href="/inventory"><HiCollection /> Inventory</Link></li>
              <li><Link href="/services"><HiCog /> Services</Link></li>
              {user.role === "admin" && <li><Link href="/admin"><HiUserCircle /> Dashboard</Link></li>}
            </ul>
          </div>

          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">C</div>
            <span className="text-2xl font-black tracking-tighter text-primary italic">
              CAR<span className="text-accent">SQURE</span>
            </span>
          </Link>
        </div>

        {/* --- Desktop Menu --- */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4 font-medium">
            <li><Link href="/" className="hover:text-primary transition-all"><HiHome /> Home</Link></li>
            <li><Link href="/inventory" className="hover:text-primary transition-all"><HiCollection /> Inventory</Link></li>
            <li><Link href="/services" className="hover:text-primary transition-all"><HiCog /> Services</Link></li>
            <li><Link href="/testimonials" className="hover:text-primary transition-all"><HiStar /> Reviews</Link></li>
          </ul>
        </div>

        {/* --- End Section: Search, Theme, Login --- */}
        <div className="navbar-end gap-2 md:gap-4">
          
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle text-xl">
            {theme === "light" ? <HiMoon /> : <HiSun className="text-yellow-400" />}
          </button>

          {/* User Auth Section */}
          {user.isLoggedIn ? (
            /* Profile Dropdown (If Logged In) */
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost flex items-center gap-2 rounded-full border border-base-300 px-2">
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-8">
                    <span><HiUserCircle className="w-6 h-6" /></span>
                  </div>
                </div>
                <HiChevronDown className="hidden sm:block" />
              </label>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-300">
                <li className="menu-title text-primary font-bold">Account</li>
                <li><Link href="/profile">Profile Settings</Link></li>
                {user.role === "admin" && (
                  <li><Link href="/admin" className="text-accent font-bold">Admin Dashboard</Link></li>
                )}
                <div className="divider my-1"></div>
                <li><button className="text-error" onClick={() => setUser({isLoggedIn: false, role: "user"})}>Logout</button></li>
              </ul>
            </div>
          ) : (
            /* Login & Join Buttons (If Not Logged In) */
            <div className="flex items-center gap-2">
              <Link href="/login" className="btn btn-ghost btn-sm hidden sm:flex items-center gap-1">
                <HiLogin /> Login
              </Link>
              <Link href="/register" className="btn btn-primary btn-sm md:btn-md rounded-full px-4 shadow-lg shadow-primary/20">
                Join Now
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;