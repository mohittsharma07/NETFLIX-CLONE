import React from "react";

const Card = ({ image, title }) => {
  return (
    <div className="movie-card m-2">
      <img
        src={image}
        alt={title}
        width="200"
        className="rounded"
      />
    </div>
  );
};

export default Card;