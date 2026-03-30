import React from 'react'
import { useNavigate } from 'react-router-dom';

const GetStarted = () => {
  const navigate = useNavigate();

  const clickUser = (type) => {
    localStorage.setItem("userType", type);
    navigate("/signin");
  };

  const roles = [
    {
      type: 'service-provider',
      label: 'Service Provider',
      description: 'Manage your slots and bookings',
      icon: '🛠️',
    },
    {
      type: 'customer',
      label: 'Customer',
      description: 'Browse and book available services',
      icon: '👤',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">

      {/* Heading */}
      <div className="text-center mb-10">
        <h3 className="text-4xl font-extrabold text-gray-800">
          Welcome to Service CRM
        </h3>
        <p className="text-gray-500 mt-2 text-lg">Who are you joining as?</p>
      </div>

      {/* Role Cards */}
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-xl">
        {roles.map(({ type, label, description, icon }) => (
          <button
            key={type}
            onClick={() => clickUser(type)}
            className="flex-1 flex flex-col items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg rounded-2xl px-8 py-10 transition duration-200 group cursor-pointer"
          >
            <span className="text-5xl">{icon}</span>
            <span className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">
              {label}
            </span>
            <span className="text-sm text-gray-400 text-center">{description}</span>
          </button>
        ))}
      </div>

      {/* Footer hint */}
      <p className="text-xs text-gray-400 mt-10">
        You can change your role at any time from settings.
      </p>

    </div>
  );
};

export default GetStarted;