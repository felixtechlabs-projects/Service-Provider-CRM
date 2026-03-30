import React, { useEffect, useState } from 'react';
import { fetchProviderDashboardData } from '../services/serviceProvider.service';

const Dashboard = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      const data = await fetchProviderDashboardData();
      setSlots(data);
    } catch (error) {
      console.error("Error loading dashboard:", error);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  // Summary counts
  const totalSlots = slots.length;
  const bookedSlots = slots.filter(s => s.isBooked).length;
  const availableSlots = totalSlots - bookedSlots;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-sm text-gray-500 mt-1">Overview of your slots and customer bookings</p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6">
            {error}
          </p>
        )}

        {!loading && !error && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5">
                <p className="text-sm text-gray-500 font-medium">Total Slots</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{totalSlots}</p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5">
                <p className="text-sm text-gray-500 font-medium">Booked</p>
                <p className="text-3xl font-bold text-red-500 mt-1">{bookedSlots}</p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5">
                <p className="text-sm text-gray-500 font-medium">Available</p>
                <p className="text-3xl font-bold text-green-500 mt-1">{availableSlots}</p>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="bg-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  <tr>
                    <th className="px-6 py-4">Date & Time</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Customer Name</th>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Review / Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {slots.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-16 text-center text-gray-400 text-sm">
                        No slots created yet.
                      </td>
                    </tr>
                  ) : (
                    slots.map(slot => (
                      <tr key={slot.id} className="hover:bg-gray-50 transition">

                        {/* Date & Time */}
                        <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                          {slot.date.toLocaleString()}
                        </td>

                        {/* Status Badge */}
                        <td className="px-6 py-4">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            slot.isBooked
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }`}>
                            {slot.isBooked ? "Booked" : "Available"}
                          </span>
                        </td>

                        {/* Customer Name */}
                        <td className="px-6 py-4 font-medium text-gray-800">
                          {slot.isBooked ? (slot.customerDetails?.name || "N/A") : "—"}
                        </td>

                        {/* Contact */}
                        <td className="px-6 py-4 text-gray-600">
                          {slot.isBooked ? (slot.customerDetails?.email || "N/A") : "—"}
                        </td>

                        {/* Review */}
                        <td className="px-6 py-4">
                          {slot.review ? (
                            <div>
                              <p className="text-amber-400 text-base leading-none">
                                {"★".repeat(slot.review.rating)}
                                <span className="text-gray-300">
                                  {"★".repeat(5 - slot.review.rating)}
                                </span>
                              </p>
                              <p className="text-xs text-gray-500 mt-1">{slot.review.comment}</p>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-xs italic">
                              {slot.isBooked ? "No review yet" : "—"}
                            </span>
                          )}
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Dashboard;