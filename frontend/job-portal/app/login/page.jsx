"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/loginUser", {
        email,
        password,
      });
      localStorage.setItem("test", response.data);
      localStorage.setItem("email", email);
      localStorage.setItem("token", response.data.token);
      router.push("/");
    } catch (error) {
      console.log("Login failed", error);
    }
  };

  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-9 space-y-8 bg-white rounded-xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-orange-600">Job Portal</h1>
          <p className="mt-2 text-gray-600"> Sign into your account</p>
        </div>
        <form onSubmit={submit} action="" method="POST" className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            ></Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md:outline-none focus:ring-2 focus:ring-orange-500"
            ></Input>

            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            ></Input>
          </div>
          <Button
            type="submit"
            className="w-full px-4 py-2 text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-orange-500 focus:ring-offset-2"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

export default login;
