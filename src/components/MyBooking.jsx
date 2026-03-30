import React, { useEffect, useState } from 'react'
import { showMyBookings } from '../services/customer.service';
import { useNavigate } from 'react-router-dom';

const MyBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const getAllBookings = async () => {
        try {
            const data = await showMyBookings();
            setBookings(data);
        } catch (error) {
            setError("Failed to fetch bookings.");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleReview = (bookingId) => {
        navigate("/review/"+bookingId);
        
    };

    useEffect(() => {
        getAllBookings();
    }, [])

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>My Bookings</h2>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <ul>
                    {bookings.map((booking, index) => (
                        <li key={index}>
                            <p><strong>Service Provider:</strong> {booking.serviceProviderName}</p>
                            <p><strong>Role:</strong> {booking.serviceProviderRole}</p>
                            <button 
                                className="border p-2 m-3"
                                onClick={() => handleReview(booking.id)}
                            >
                                Add Review
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MyBooking