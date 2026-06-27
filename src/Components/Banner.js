import React, { useEffect, useState } from "react";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const Banner = ({ onAddToList, language = "en" }) => {
  const [movie, setMovie] = useState(null);

  const texts = {
    en: {
      play: "Play",
      myList: "My List",
    },
    hi: {
      play: "चलाएं",
      myList: "मेरी सूची",
    },
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`,
      );

      const data = await res.json();

      const random =
        data.results[Math.floor(Math.random() * data.results.length)];

      setMovie(random);
    } catch (err) {
      console.log(err);
    }
  };

  const playTrailer = async () => {
    if (!movie) return;

    try {
      const type = movie.media_type === "tv" ? "tv" : "movie";

      const res = await fetch(
        `https://api.themoviedb.org/3/${type}/${movie.id}/videos?api_key=${API_KEY}`,
      );

      const data = await res.json();

      const trailer = data.results.find(
        (video) =>
          video.site === "YouTube" &&
          (video.type === "Trailer" || video.type === "Teaser"),
      );

      if (trailer) {
        window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
      } else {
        alert("Trailer not available");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!movie) return null;

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="banner__overlay"></div>

      <div className="banner__contents">
        <h1 className="banner__title">{movie.title || movie.name}</h1>

        <div className="banner__buttons">
          <button className="banner__button" onClick={playTrailer}>
            ▶️ {texts[language].play}
          </button>

          <button className="banner__button" onClick={() => onAddToList(movie)}>
            + {texts[language].myList}
          </button>
        </div>

        <p className="banner__description">{movie.overview}</p>
      </div>

      <div className="banner--fadeBottom"></div>
    </header>
  );
};

export default Banner;
