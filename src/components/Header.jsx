import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const type = localStorage.getItem("userType");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const customerLinks = [
    { to: "/home", label: "Browse Slots" },
    { to: "/bookings", label: "My Bookings" },
  ];

  const providerLinks = [
    { to: "/add-slot", label: "Add New Slot" },
    { to: "/dashboard", label: "Dashboard" },
  ];

  const navLinks = type === "customer"
    ? customerLinks
    : type === "service-provider"
    ? providerLinks
    : [];

  return (
    <header className="w-full h-16 bg-slate-900 text-white shadow-lg flex items-center justify-between px-6 sticky top-0 z-50">

      {/* Brand */}
      <Link
        to={type === "service-provider" ? "/add-slot" : "/home"}
        className="text-lg font-extrabold tracking-tight text-white hover:text-blue-400 transition duration-200"
      >
        Service CRM
      </Link>

      {/* Nav Links + Logout */}
      <nav className="flex items-center gap-2">
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="text-sm font-medium text-gray-300 hover:text-white hover:bg-slate-700 px-3 py-2 rounded-lg transition duration-200"
          >
            {label}
          </Link>
        ))}

        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="ml-3 text-sm font-semibold bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            Logout
          </button>
        )}
      </nav>

    </header>
  );
};

export default Header;