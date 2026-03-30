import React, { useEffect, useState } from 'react';
import { fetchProviderDashboardData } from '../services/serviceProvider.service';

const Dashboard = () => {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadDashboard = async () => {
        try {
            const data = await fetchProviderDashboardData();
            setSlots(data);
        } catch (error) {
            console.error("Error loading dashboard:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    if (loading) return <div className="text-center mt-5">Loading Dashboard...</div>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Service Provider Dashboard</h2>
            <table className="table table-hover border">
                <thead className="table-light">
                    <tr>
                        <th>Date & Time</th>
                        <th>Status</th>
                        <th>Customer Name</th>
                        <th>Contact</th>
                        <th>Review / Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {slots.length === 0 ? (
                        <tr><td colSpan="5" className="text-center">No slots created yet.</td></tr>
                    ) : (
                        slots.map(slot => (
                            <tr key={slot.id}>
                                <td>{slot.date.toLocaleString()}</td>
                                <td>
                                    <span className={`badge ${slot.isBooked ? "bg-danger" : "bg-success"}`}>
                                        {slot.isBooked ? "Booked" : "Available"}
                                    </span>
                                </td>
                                {/* Accessing customerDetails safely */}
                                <td>{slot.isBooked ? (slot.customerDetails?.name || "N/A") : "—"}</td>
                                <td>{slot.isBooked ? (slot.customerDetails?.email || "N/A") : "—"}</td>
                                
                                {/* Displaying the Review data */}
                                <td>
                                    {slot.review ? (
                                        <div>
                                            <strong className="text-warning">
                                                {"★".repeat(slot.review.rating)}
                                            </strong>
                                            <p className="small mb-0 text-muted">{slot.review.comment}</p>
                                        </div>
                                    ) : (
                                        <span className="text-muted italic">{slot.isBooked ? "No review yet" : "—"}</span>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;