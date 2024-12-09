"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setAccess } from "@/app/redux/features/tokenSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const url = "http://127.0.0.1:8000/account/access/";
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("access")) {
      router.push("/lobby");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const { data } = await axios.post(url, {
        username,
        password,
      });

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      dispatch(setAccess(data.access));
    } catch (err) {
      setError("Invalid credentials or server error.");
      console.error(err);
    } finally {
      if (localStorage.getItem("access")) {
        router.push("/lobby");
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="max-w-[600px] flex-auto bg-white shadow-md shadow-blue-200 rounded-lg p-8 mx-auto">
        <section>
          <h1 className="font-title text-neutral-950 text-2xl mb-2">LogIn</h1>
          <p className="text-neutral-500 mb-8">Login For Chating</p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="sr-only" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Name"
                className="w-full border-b border-neutral-300 outline-none py-2 focus:border-blue-600"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="sr-only" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="w-full border-b border-neutral-300 outline-none py-2 focus:border-blue-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-blue-50 font-medium py-3 rounded-md mt-6 hover:bg-blue-400"
            >
              Login
            </button>
          </form>

          <section className="mt-8">
            <p className="text-neutral-500 mb-4 text-center">ACCESS QUICKLY</p>
            <div className="flex justify-center gap-4">
              <button className="text-blue-500 border border-blue-500 py-2 px-4 rounded-md">
                Google
              </button>
            </div>
          </section>
          <p className="text-neutral-500 text-center mt-8">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500">
              Sign Up
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Login;
