import React, { useState } from 'react'
import { addSlot } from '../services/serviceProvider.service';

const AddSlot = () => {
  const emptySlot = {
    date: "",
    startTime: "",
    endTime: "",
    isBooked: false
  };

  const [slotDate, setSlotDate] = useState(emptySlot);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    if (slotDate.startTime >= slotDate.endTime) {
      setError("End time must be after start time.");
      return;
    }

    setSubmitting(true);
    try {
      const d = new Date(slotDate.date);
      await addSlot({ ...slotDate, date: d });
      setSuccess("Slot added successfully!");
      setSlotDate(emptySlot);
    } catch (err) {
      console.error(err);
      setError("Failed to add slot. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-12 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">

        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Add a Slot</h3>
          <p className="text-sm text-gray-500 mt-1">Define your availability for customers</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={slotDate.date}
              onChange={(e) => setSlotDate({ ...slotDate, date: e.target.value })}
            />
          </div>

          {/* Start & End Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="time"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={slotDate.startTime}
                onChange={(e) => setSlotDate({ ...slotDate, startTime: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="time"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={slotDate.endTime}
                onChange={(e) => setSlotDate({ ...slotDate, endTime: e.target.value })}
              />
            </div>
          </div>

          {/* Feedback Messages */}
          {error && (
            <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-600 text-sm bg-green-50 border border-green-200 rounded-lg px-4 py-2">
              {success}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl transition duration-200 mt-2"
          >
            {submitting ? "Adding Slot..." : "Add Slot"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddSlot;