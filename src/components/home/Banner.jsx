import React from 'react';
import Link from 'next/link';
import { HiArrowRight, HiPlay } from "react-icons/hi";

const Banner = () => {
    return (
        // Desktop e height komiye fixed height ba kom vh deya hoyeche
        <div className="relative min-h-[85vh] md:min-h-[70vh] md:h-[600px] w-full flex items-center overflow-hidden bg-base-200">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[300px] h-[300px] bg-accent/10 rounded-full blur-3xl opacity-30"></div>

            <div className="container mx-auto px-4 md:px-8 z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    
                    {/* Left Content */}
                    <div className="space-y-6 animate-in fade-in slide-in-from-left duration-1000">
                        <div className="inline-flex items-center gap-2 bg-base-100 border border-base-300 px-3 py-1.5 rounded-full shadow-sm">
                            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse"></span>
                            <span className="text-[10px] md:text-xs font-medium uppercase tracking-wider opacity-80">
                                New Collection 2026
                            </span>
                        </div>

                        {/* Text size desktop e ektu choto kora hoyeche (text-5xl/6xl instead of 7xl) */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1]">
                            Elevate Your <br />
                            <span className="text-primary italic">Driving</span> 
                            <span className="text-accent"> Experience</span>
                        </h1>

                        <p className="text-base md:text-lg text-neutral/70 max-w-md leading-relaxed">
                            Discover the perfect blend of luxury and performance. 
                            Find the car that speaks your language.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <Link 
                                href="/inventory" 
                                className="btn btn-primary btn-md md:btn-lg rounded-full px-6 shadow-xl shadow-primary/20 group"
                            >
                                Browse Inventory
                                <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            
                            <button className="btn btn-ghost btn-md md:btn-lg rounded-full px-6 flex items-center gap-2 hover:bg-base-300">
                                <div className="bg-base-100 p-1.5 rounded-full shadow-md">
                                    <HiPlay className="text-primary" />
                                </div>
                                <span className="text-sm md:text-base">How it works</span>
                            </button>
                        </div>

                        {/* Stats Summary - Compact Margin */}
                        <div className="flex gap-6 pt-6 border-t border-base-300">
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold">500+</h3>
                                <p className="text-xs opacity-60">Premium Cars</p>
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold">12k+</h3>
                                <p className="text-xs opacity-60">Happy Clients</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Image Section */}
                    <div className="relative animate-in fade-in zoom-in duration-1000 delay-200 hidden lg:block">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-base-100 max-h-[450px]">
                            <img 
                                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop" 
                                alt="Premium Luxury Car"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Floating Glass Card - More Compact */}
                        <div className="absolute -bottom-4 -left-8 z-20 p-4 bg-base-100/70 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl max-w-[200px]">
                            <div className="flex items-center gap-3">
                                <div className="avatar-group -space-x-3">
                                    <div className="avatar border-none w-6">
                                        <img src="https://i.pravatar.cc/100?u=1" />
                                    </div>
                                    <div className="avatar border-none w-6">
                                        <img src="https://i.pravatar.cc/100?u=2" />
                                    </div>
                                </div>
                                <p className="text-[9px] font-semibold uppercase opacity-60">Highly Rated</p>
                            </div>
                            <p className="mt-2 text-xs font-medium italic">
                                "Seamless experience!"
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Banner;