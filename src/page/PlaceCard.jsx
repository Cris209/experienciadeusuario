import React, { useState } from 'react';
import RatingSection from './RatingSection';
import CommentSection from './CommentSection';
import "../styles/styles.css";

function PlaceCard({ place, loggedInUser }) {
  const [comments, setComments] = useState([]);
  const [ratings, setRatings] = useState([]);

  const handleComment = (comment) => {
    setComments([...comments, { username: loggedInUser, comment }]);
  };

  const handleRating = (rating) => {
    setRatings([...ratings, { username: loggedInUser, rating }]);
  };

  return (
    <div className="place-card">
      <h3>{place.name}</h3>
      {loggedInUser ? (
        <>
          <RatingSection onRate={handleRating} />
          <CommentSection onComment={handleComment} />
        </>
      ) : (
        <p>Inicia sesión para calificar y comentar</p>
      )}
      <div className="comments">
        {comments.map((comment, index) => (
          <div key={index}>
            <strong>{comment.username}: </strong>{comment.comment}
          </div>
        ))}
      </div>
      <div className="ratings">
        {ratings.map((rating, index) => (
          <div key={index}>
            <strong>{rating.username}: </strong>{rating.rating}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaceCard;
