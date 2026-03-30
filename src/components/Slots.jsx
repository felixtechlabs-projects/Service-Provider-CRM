import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchSlotsForId } from '../services/serviceProvider.service';
import { bookASlot } from '../services/customer.service';

const Slots = () => {
  const params = useParams();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingId, setBookingId] = useState(null); // tracks which slot is being booked
  const [successId, setSuccessId] = useState(null); // tracks freshly booked slot for feedback

  const fetchSlots = async () => {
    try {
      const arr = await fetchSlotsForId(params.id);
      setSlots(arr);
    } catch (error) {
      console.error(error);
      setError("Failed to load slots. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const bookSlotByCustomer = async (id) => {
    setBookingId(id);
    setError("");
    try {
      await bookASlot(id);
      setSuccessId(id);
      // Optimistically mark slot as booked in local state
      setSlots(prev =>
        prev.map(slot => slot.id === id ? { ...slot, isBooked: true } : slot)
      );
    } catch (error) {
      console.error(error);
      setError("Failed to book the slot. Please try again.");
    } finally {
      setBookingId(null);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const availableCount = slots.filter(s => !s.isBooked).length;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Available Slots</h2>
            <p className="text-sm text-gray-500 mt-1">
              {!loading && !error && (
                <span>{availableCount} slot{availableCount !== 1 ? "s" : ""} available</span>
              )}
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {/* Success toast */}
        {successId && (
          <div className="text-green-600 text-sm bg-green-50 border border-green-200 rounded-lg px-4 py-3 mb-6">
            ✓ Slot booked successfully!
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <tr>
                  <th className="px-6 py-4">Sr. No.</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Start Time</th>
                  <th className="px-6 py-4">End Time</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {slots.length > 0 ? (
                  slots.map((slot, index) => (
                    <tr key={slot.id} className="hover:bg-gray-50 transition">

                      {/* Sr. No. */}
                      <td className="px-6 py-4 text-gray-400 font-medium">{index + 1}</td>

                      {/* Date */}
                      <td className="px-6 py-4 font-semibold text-gray-800 whitespace-nowrap">
                        {new Date(slot.date).toDateString()}
                      </td>

                      {/* Start Time */}
                      <td className="px-6 py-4 text-gray-600">{slot.startTime}</td>

                      {/* End Time */}
                      <td className="px-6 py-4 text-gray-600">{slot.endTime}</td>

                      {/* Action */}
                      <td className="px-6 py-4">
                        {slot.isBooked ? (
                          <span className="text-xs font-semibold bg-red-100 text-red-500 px-3 py-1 rounded-full">
                            Booked
                          </span>
                        ) : (
                          <button
                            onClick={() => bookSlotByCustomer(slot.id)}
                            disabled={bookingId === slot.id}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white text-xs font-semibold px-4 py-2 rounded-lg transition duration-200"
                          >
                            {bookingId === slot.id ? "Booking..." : "Book Slot"}
                          </button>
                        )}
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-gray-400 text-sm">
                      No slots available for this provider.
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

export default Slots;