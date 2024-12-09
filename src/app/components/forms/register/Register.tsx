"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("access")) {
      router.push("/lobby");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password1 !== password2) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/account/create/",
        {
          username,
          password: password1,
        }
      );
      router.push("/");
    } catch (err) {
      setError("Failed to create account. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="max-w-[600px] flex-auto bg-white shadow-md rounded-lg p-8 mx-auto">
        <section>
          <h1 className="font-title text-neutral-950 text-2xl mb-2">Sign up</h1>
          <p className="text-neutral-500 mb-8">Sign up to continue</p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="sr-only" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Name"
                className="w-full border-b border-neutral-300 outline-none py-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="password1">
                Password
              </label>
              <input
                id="password1"
                type="password"
                placeholder="Password"
                className="w-full border-b border-neutral-300 outline-none py-2"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="password2">
                Confirm Password
              </label>
              <input
                id="password2"
                type="password"
                placeholder="Confirm Password"
                className="w-full border-b border-neutral-300 outline-none py-2"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>

            {/* Error message */}
            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 text-blue-50 font-medium py-3 rounded-md mt-6"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign up"}
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
            Already have an account?{" "}
            <Link href="/" className="text-blue-500">
              Sign in
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Register;
