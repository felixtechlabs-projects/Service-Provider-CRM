import React, { useEffect, useState } from 'react'
import { fetchAllServiceProviders } from '../services/serviceProvider.service';
import { Link } from 'react-router-dom';

const CustomerHome = () => {
  const [spArray, setSpArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSPs = async () => {
    try {
      const arr = await fetchAllServiceProviders();
      setSpArray(arr);
    } catch (error) {
      console.error(error);
      setError("Failed to load service providers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSPs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Service Providers</h2>
          <p className="text-sm text-gray-500 mt-1">Browse and book available service providers</p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <tr>
                  <th className="px-6 py-4">Sr. No.</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {spArray.length > 0 ? (
                  spArray.map((sp, index) => (
                    <tr key={sp.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-gray-400 font-medium">{index + 1}</td>
                      <td className="px-6 py-4 font-semibold text-gray-800">{sp.name}</td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                          {sp.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={"/slots/" + sp.id}
                          className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition duration-200"
                        >
                          View Slots
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-16 text-center text-gray-400 text-sm">
                      No service providers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};

export default CustomerHome;