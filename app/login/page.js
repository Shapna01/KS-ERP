"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    if (
      email === "admin@kssmart.com" &&
      password === "Admin@123"
    ) {
      router.push("/dashboard/users");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <main className="h-screen w-full grid grid-cols-1 md:grid-cols-2">

      <div className="relative bg-gradient-to-br from-pink-100 via-purple-100 to-pink-50 p-16 flex flex-col justify-between overflow-hidden">

        <div className="absolute top-0 left-0 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-40"></div>

        <div className="absolute bottom-0 left-10 w-[600px] h-[300px] bg-purple-300 rounded-full blur-3xl opacity-40"></div>

        <div className="relative z-10">
          <Image
            src="/images/kslogo.png"
            alt="KS Smart Logo"
            width={220}
            height={80}
            className="object-contain"
          />
        </div>

        <div className="relative z-10 max-w-xl">

          <h2 className="text-6xl font-bold leading-tight text-black">
            One platform. Every workflow. Zero gaps.
          </h2>

          <p className="mt-8 text-gray-700 text-xl leading-9">
            From the moment a purchase request is raised to the final
            payment recorded — every decision tracked, every rupee
            accountable.
          </p>
        </div>
      </div>

     <div className="bg-white flex items-center justify-center px-16">

        <div className="w-full max-w-md">

          <h2 className="text-5xl font-bold text-black">
            Welcome to KS ERP
          </h2>

          <p className="mt-4 text-gray-500 leading-8 text-lg">
            Login to access your ERP dashboard.
          </p>

          <form onSubmit={handleLogin} className="mt-10 space-y-6">

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Work mail
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-4 outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-4 outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-purple-700 text-sm hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {
              error && (
                <div className="bg-pink-100 border border-pink-200 text-pink-700 rounded-lg px-5 py-4 text-sm">
                  {error}
                </div>
              )
            }

            <button
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-800 transition-all text-white py-4 rounded-lg font-medium text-lg"
            >
              Login
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}