import React, { useState } from 'react';
import "../styles/styles.css";

function CommentSection({ onComment }) {
  const [comment, setComment] = useState('');

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div>
      <label>
        Comentario:
        <textarea
          value={comment}
          onChange={handleCommentChange}
        />
      </label>
      <button onClick={() => onComment(comment)}>Enviar comentario</button>
    </div>
  );
}

export default CommentSection;
