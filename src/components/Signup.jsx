import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addServiceProvider } from '../services/serviceProvider.service'
import { addCustomer } from '../services/customer.service'

const Signup = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    area: "",
    contact: "",
    role: ""
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const type = localStorage.getItem("userType");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (type === "service-provider") {
        await addServiceProvider(user);
      } else if (type === "customer") {
        await addCustomer(user);
      }
      navigate("/signin");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

  const fields = [
    { label: "Full Name",      key: "name",    type: "text",     placeholder: "John Doe" },
    { label: "Email Address",  key: "email",   type: "email",    placeholder: "abc@gmail.com" },
    { label: "Area",           key: "area",    type: "text",     placeholder: "Kothrud" },
    { label: "Contact Number", key: "contact", type: "tel",      placeholder: "9898787680", extra: { minLength: 10, maxLength: 10 } },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">

        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-extrabold text-gray-800">Create an Account</h2>
          <p className="text-sm text-gray-500 mt-1">
            Signing up as{" "}
            <span className="font-semibold text-blue-600">
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

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Common Fields */}
          {fields.map(({ label, key, type: fieldType, placeholder, extra }) => (
            <div key={key}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={fieldType}
                required
                placeholder={placeholder}
                className={inputClass}
                value={user[key]}
                onChange={(e) => setUser({ ...user, [key]: e.target.value })}
                {...extra}
              />
            </div>
          ))}

          {/* Role — Service Provider only */}
          {type === "service-provider" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Role / Profession
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Electrician, Plumber"
                className={inputClass}
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              />
            </div>
          )}

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
                className={`${inputClass} pr-12`}
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
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl transition duration-200 mt-2"
          >
            {submitting ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600 font-semibold hover:underline">
            Sign in here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;