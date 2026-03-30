import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signinServiceProvider } from '../services/serviceProvider.service'
import { signinCustomer } from '../services/customer.service'

const Signin = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const type = localStorage.getItem("userType");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      localStorage.setItem("isAuthenticated", "true");

      if (type === "service-provider") {
        await signinServiceProvider(user.email, user.password);
        navigate("/add-slot");
      } else if (type === "customer") {
        await signinCustomer(user.email, user.password);
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      localStorage.removeItem("isAuthenticated");
      setError("Invalid email or password. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">

        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-extrabold text-gray-800">Welcome back</h2>
          <p className="text-sm text-gray-500 mt-1">
            Signing in as{" "}
            <span className="font-semibold text-blue-600 capitalize">
              {type === "service-provider" ? "Service Provider" : "Customer"}
            </span>
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="abc@gmail.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-12"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-medium transition"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl transition duration-200"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
            Register here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signin;