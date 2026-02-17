"use client"; // ১. ক্লায়েন্ট কম্পোনেন্ট হিসেবে ঘোষণা করা হলো

import React, { useState } from "react"; // ২. useState ইম্পোর্ট করা হলো
import { HiArrowRight, HiMail, HiLockClosed } from "react-icons/hi";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation"; // ৩. 'next/router' এর বদলে 'next/navigation'

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        Swal.fire("Error", "Invalid email or password", "error");
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Logging you in...',
          timer: 1500,
          showConfirmButton: false
        });
        
        router.push("/");
        // App Router-এ router.refresh() সেশন আপডেট করতে সাহায্য করে
        router.refresh(); 
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-base-200 py-16 md:py-24 px-4">
        <div className="container max-w-md w-full z-10">
          <div className="text-center mb-10">
             {/* Logo */}
             <Link href="/" className="flex items-center justify-center gap-2 group mb-2">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  C
                </div>
                <span className="text-3xl font-black tracking-tighter text-primary italic">
                  CAR<span className="text-accent">SQUARE</span>
                </span>
              </Link>
              <p className="text-sm opacity-60 font-medium">Welcome back! Please enter your details.</p>
          </div>

          <div className="card bg-base-100/80 backdrop-blur-xl shadow-2xl border border-base-300 overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-primary via-secondary to-accent"></div>
            <div className="card-body p-6 md:p-10">
              <form className="space-y-6" onSubmit={handleLogin}>
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

                <div className="form-control w-full">
                  <label className="label pb-2">
                    <span className="label-text font-bold uppercase text-[10px] tracking-[2px]">
                      Password
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
                        Sign In to Account
                        <HiArrowRight className="group-hover:translate-x-1 transition-transform ml-2 text-lg" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="divider text-[10px] font-bold opacity-30 my-10 uppercase tracking-[3px]">
                Or Continue With
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
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="text-primary font-black ml-2 hover:underline"
                  >
                    Create Account
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

export default LoginForm;