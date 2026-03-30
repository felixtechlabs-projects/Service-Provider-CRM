import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import { auth } from '../../environments/environment';
import { addReview } from '../services/customer.service';

const AddReview = () => {
  const params = useParams();
  const navigate = useNavigate(); // Added for better UX after saving

  const [comment, setComment] = useState({
    comment: "",
    rating: 0, // Initial value
    customerId: ""
  })

  // Catch Rating value
  const handleRating = (rate) => {
    setComment({ ...comment, rating: rate });
  }

  const handleReview = async (e) => {
    e.preventDefault();

    // Validation
    if (comment.rating === 0) {
      alert("Please select a star rating!");
      return;
    }

    const userId = auth.currentUser.uid;
    const slotId = params.id;

    // Prepare data
    const reviewData = {
      ...comment,
      customerId: userId,
      slotId: slotId,
      date: new Date() // Good practice to include a timestamp
    };

    try {
      await addReview(reviewData);
      alert("Review submitted successfully!");
      navigate('/my-bookings'); // Redirect back to bookings
    } catch (error) {
      console.error("Error adding review:", error);
      alert("Something went wrong.");
    }
  }

  return (
    <div className='max-w-md m-3 p-4 border rounded shadow-sm'>
      <h3 className='text-2xl font-bold mb-4'> Add Review </h3>

      <form onSubmit={handleReview}>
        <div className='mb-4'>
          <label className='block font-medium mb-1'> Rate your experience </label>

          <Rating
            onClick={handleRating}
            initialValue={comment.rating}
            size={30}
            fillColor="orange"
            emptyColor="gray"
            SVGstyle={{ display: "inline-block" }}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "5px"
            }}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="comment" className='block font-medium mb-1'> Your Comment </label>
          <textarea
            id="comment"
            placeholder="How was the service?"
            className='border p-2 w-full h-32 rounded'
            value={comment.comment}
            onChange={(e) => setComment({ ...comment, comment: e.target.value })}
            required
          ></textarea>
        </div>

        <button
          type='submit'
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'
        >
          Submit Review
        </button>
      </form>
    </div>
  )
}

export default AddReview;