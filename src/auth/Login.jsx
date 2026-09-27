import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAPI } from "../api";

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // 1. Single API call to login endpoint
      const data = await fetchAPI("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      console.log("Login Response:", data);

      // 2. Extract token checking all common backend property names
      const token = data.token || data.accessToken || data.jwt;

      if (!token) {
        throw new Error("No authentication token received from server.");
      }

      // 3. Save token immediately to localStorage
      localStorage.setItem("token", token);

      // 4. Update UI feedback and navigate
      setSuccess("Logged in successfully! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-950 min-h-screen text-white flex items-center justify-center p-6">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-md w-full space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black tracking-wider">SOLEMORA</h1>
          <p className="text-zinc-400 text-sm">
            Sign in to access your cart and account
          </p>
        </div>

        {/* Success Banner */}
        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs p-3 rounded-lg text-center font-medium">
            {success}
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={credentials.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full bg-zinc-800 border border-zinc-700/60 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={credentials.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-zinc-800 border border-zinc-700/60 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !!success}
            className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-xl transition text-sm uppercase tracking-wider mt-2 disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs text-zinc-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-amber-400 hover:underline font-semibold"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
