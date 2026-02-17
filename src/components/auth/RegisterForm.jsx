"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiArrowRight, HiMail, HiLockClosed, HiUser } from "react-icons/hi";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";

const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ name, email, password, role: "user" }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        // --- Auto Login Logic Start ---
        const loginRes = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (!loginRes?.error) {
          Swal.fire({
            icon: 'success',
            title: 'Welcome!',
            text: 'Account created and logged in successfully!',
            timer: 2000,
            showConfirmButton: false
          });
          router.push("/");
          router.refresh();
        } else {
          router.push("/login");
        }
      } else {
        Swal.fire("Error", data.message || "Registration failed", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-base-200 py-16 md:py-24 px-4">
        <div className="container max-w-md w-full z-10">
          
          {/* Logo Section */}
          <div className="text-center mb-10">
            <Link href="/" className="flex items-center justify-center gap-2 group mb-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                C
              </div>
              <span className="text-3xl font-black tracking-tighter text-primary italic">
                CAR<span className="text-accent">SQUARE</span>
              </span>
            </Link>
            <p className="text-sm opacity-60 font-medium">Join us! Create your account today.</p>
          </div>

          <div className="card bg-base-100/80 backdrop-blur-xl shadow-2xl border border-base-300 overflow-hidden">
            {/* Top Gradient Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-primary via-secondary to-accent"></div>
            
            <div className="card-body p-6 md:p-10">
              <form className="space-y-5" onSubmit={handleRegister}>
                
                {/* Name Field */}
                <div className="form-control w-full">
                  <label className="label pb-2">
                    <span className="label-text font-bold uppercase text-[10px] tracking-[2px]">
                      Full Name
                    </span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral/40 group-focus-within:text-primary transition-colors">
                      <HiUser size={18} />
                    </div>
                    <input
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      className="input input-bordered h-12 w-full pl-11 bg-base-200/50 focus:input-primary"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="form-control w-full">
                  <label className="label pb-2">
                    <span className="label-text font-bold uppercase text-[10px] tracking-[2px]">
                      Email Address
                    </span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral/40 group-focus-within:text-primary transition-colors">
                      <HiMail size={18} />
                    </div>
                    <input
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      className="input input-bordered h-12 w-full pl-11 bg-base-200/50 focus:input-primary"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="form-control w-full">
                  <label className="label pb-2">
                    <span className="label-text font-bold uppercase text-[10px] tracking-[2px]">
                      Set Password
                    </span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral/40 group-focus-within:text-primary transition-colors">
                      <HiLockClosed size={18} />
                    </div>
                    <input
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="input input-bordered h-12 w-full pl-11 bg-base-200/50 focus:input-primary"
                      required
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary btn-block h-12 rounded-xl shadow-xl shadow-primary/20 text-white border-none group"
                  >
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <>
                        Create Account
                        <HiArrowRight className="group-hover:translate-x-1 transition-transform ml-2 text-lg" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="divider text-[10px] font-bold opacity-30 my-8 uppercase tracking-[3px]">
                Or Sign Up With
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                  className="btn btn-outline border-base-300 h-12 hover:bg-base-200 rounded-xl flex items-center gap-2 capitalize font-bold text-sm"
                >
                  <FaGoogle className="text-error text-lg" /> Google
                </button>
                <button 
                  type="button"
                  onClick={() => signIn("github", { callbackUrl: "/" })}
                  className="btn btn-outline border-base-300 h-12 hover:bg-base-200 rounded-xl flex items-center gap-2 capitalize font-bold text-sm"
                >
                  <FaGithub className="text-lg" /> Github
                </button>
              </div>

              <div className="text-center mt-10">
                <p className="text-sm text-neutral/60">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-primary font-black ml-2 hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;