import { useState } from "react";

const Search = ({ language = "en" }) => {
  const texts = {
    en: {
      placeholder: "Search Movies & TV ...",
      search: "Search",
      trailer: "Watch Trailer",
      notFound: "Trailer not available",
      noResults: "No results found"
    },
    hi: {
      placeholder: "फिल्म या शो खोजें...",
      search: "खोजें",
      trailer: "ट्रेलर देखें",
      notFound: "ट्रेलर उपलब्ध नहीं",
      noResults: "कोई परिणाम नहीं मिला"
    }
  };

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searched, setSearched] = useState(false);

  const searchMovie = async () => {
    if (!query.trim()) return;

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}`
      );

      const data = await res.json();

      const filtered = (data.results || []).filter(
        (item) =>
          item.media_type === "movie" ||
          item.media_type === "tv"
      );

      setMovies(filtered);
      setSearched(true);
    } catch (error) {
      console.log(error);
    }
  };

  const playTrailer = async (item) => {
    try {
      const url =
        item.media_type === "tv"
          ? `https://api.themoviedb.org/3/tv/${item.id}/videos?api_key=${API_KEY}`
          : `https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${API_KEY}`;

      const res = await fetch(url);
      const data = await res.json();

      const trailer = data.results?.find(
        (video) =>
          video.site === "YouTube" &&
          video.type === "Trailer"
      );

      if (trailer) {
        window.open(
          `https://www.youtube.com/watch?v=${trailer.key}`,
          "_blank"
        );
      } else {
        alert(texts[language].notFound);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="search-box"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent:"flex-end",
        gap: "8px",
        width:"100%"
      }}
    >
      <input
        type="text"
        placeholder={texts[language].placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            searchMovie();
          }
        }}
        style={{
          Width:"180px",
          height:"44",
          padding: "10px",
          borderRadius: "6px",
          border: "none",
          outline: "none"
        }}
      />

      <button
        onClick={searchMovie}
        style={{
          Width:"90",
          height:"44px",
          cursor: "pointer"
        }}
      >
        {texts[language].search}
      </button>

      {query && (
        <button
          onClick={() => {
            setQuery("");
            setMovies([]);
            setSelectedMovie(null);
            setSearched(false);
          }}
          style={{
            width:"44px",
            height:"44px",
            background:"#fff",
            border:"none",
            borderRadius:"6px",
            cursor:"pointer",
            fontSize:"20px"
          }}
        >
          ❌
        </button>
      )}

      {/* RESULTS */}
      {movies.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: "0",
            width: "320px",
            background: "#000",
            color: "#fff",
            maxHeight: "400px",
            overflowY: "auto",
            zIndex: 9999,
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)"
          }}
        >
          {movies.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedMovie(item)}
              style={{
                display: "flex",
                gap: "10px",
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #333"
              }}
            >
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                    : "https://via.placeholder.com/80"
                }
                width="50"
                alt={item.title || item.name}
              />

              <div>
                <h6>{item.title || item.name}</h6>
                <small>{item.media_type}</small>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* NO RESULTS */}
      {searched && movies.length === 0 && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: "0",
            background: "#111",
            color: "#fff",
            padding: "10px",
            borderRadius: "8px"
          }}
        >
          {texts[language].noResults}
        </div>
      )}

      {/* MODAL */}
      {selectedMovie && (
        <div
          onClick={() => setSelectedMovie(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10000
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#111",
              padding: "20px",
              width: "600px",
              maxWidth: "90%",
              borderRadius: "10px",
              color: "white"
            }}
          >
            <button
              onClick={() => setSelectedMovie(null)}
              style={{
                float: "right",
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: "22px",
                cursor: "pointer"
              }}
            >
              ✕
            </button>

            <h2>{selectedMovie.title || selectedMovie.name}</h2>

            <p style={{ marginTop: "10px" }}>
              {selectedMovie.overview ||
                texts[language].notFound}
            </p>

            <button
              onClick={() => playTrailer(selectedMovie)}
              style={{
                marginTop: "15px",
                background: "#e50914",
                color: "#fff",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              ▶ {texts[language].trailer}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;