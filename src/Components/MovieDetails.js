import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const API_KEY = "YOUR_API_KEY_HERE";

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );

        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <h1>Loading...</h1>;

  return (
    <div style={{ color: "white", padding: "30px" }}>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/300"
        }
        alt={movie.title}
      />

      <h1>{movie.title}</h1>

      <h3>⭐ Rating: {movie.vote_average}</h3>

      <h4>Release: {movie.release_date}</h4>

      <p>{movie.overview}</p>
    </div>
  );
};

export default MovieDetails;