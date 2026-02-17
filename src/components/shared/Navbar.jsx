"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  HiUserCircle,
  HiSun,
  HiMoon,
  HiLogin,
  HiChevronDown,
  HiLogout,
} from "react-icons/hi";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [theme, setTheme] = useState("light");

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
        {/* --- Navbar Start (Logo) --- */}
        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
              C
            </div>
            <span className="text-2xl font-black tracking-tighter text-primary italic">
              CAR<span className="text-accent">SQUARE</span>
            </span>
          </Link>
        </div>

        {/* --- Navbar Center (Desktop Menu) --- */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4 font-medium">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/inventory">Inventory</Link>
            </li>
            <li>
              <Link href="/services">About Us</Link>
            </li>
            {/* Session check for Admin Link */}
            {session?.user?.role === "admin" && (
              <li>
                <Link href="/admin" className="text-primary font-bold">
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* --- Navbar End --- */}
        <div className="navbar-end gap-2 md:gap-4">
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle text-xl"
          >
            {theme === "light" ? (
              <HiMoon />
            ) : (
              <HiSun className="text-yellow-400" />
            )}
          </button>

          {/* User Auth logic */}
          {status === "authenticated" ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost flex items-center gap-2 rounded-full border border-base-300 px-2"
              >
                <div className="avatar">
                  <div className="bg-neutral text-neutral-content rounded-full w-8 overflow-hidden">
                    {session.user.image ? (
                      <img src={session.user.image} alt="profile" />
                    ) : (
                      <HiUserCircle className="w-full h-full p-1" />
                    )}
                  </div>
                </div>
                <div className="hidden sm:block text-left text-xs">
                  <p className="font-bold max-w-[80px] truncate">
                    {session.user.name || session.user.fullName}
                  </p>
                  <p className="opacity-50 capitalize">{session.user.role}</p>
                </div>
                <HiChevronDown className="hidden sm:block" />
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-300"
              >
                <li className="menu-title text-primary font-bold">Account</li>
                <li>
                  <Link href="/profile">Profile Settings</Link>
                </li>
                {session.user.role === "admin" && (
                  <li>
                    <Link href="/admin">Admin Dashboard</Link>
                  </li>
                )}
                <div className="divider my-1"></div>
                <li>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-error font-bold"
                  >
                    <HiLogout /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="btn btn-ghost btn-sm hidden sm:flex items-center gap-1"
              >
                <HiLogin /> Login
              </Link>
              <Link
                href="/register"
                className="btn btn-primary btn-sm md:btn-md rounded-full px-4 shadow-lg shadow-primary/20"
              >
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
