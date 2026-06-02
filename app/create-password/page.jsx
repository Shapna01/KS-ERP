"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreatePassword() {

  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");

  if (password.length < 8) {
    setError("Password must contain at least 8 characters");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  const res = await fetch("/api/create-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "admin@kssmart.com",
      password,
    }),
  });

  const data = await res.json();

  if (data.success) {
    router.push("/login");
  } else {
    setError(data.message);
  }
};

  return (
    <main className="h-screen w-full grid grid-cols-1 md:grid-cols-2 text-black">

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
            Set your password
          </h2>

          <p className="mt-4 text-gray-500 leading-8 text-lg">
            Create a secure password for your ERP account.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                New Password
              </label>

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-4 outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-4 outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div className="text-sm text-gray-500 space-y-2">
              <p>• Minimum 8 characters</p>
              <p>• At least one uppercase letter</p>
              <p>• At least one number</p>
              <p>• At least one special character</p>
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
              Create Password
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}