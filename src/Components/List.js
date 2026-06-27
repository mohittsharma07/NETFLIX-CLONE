import { useEffect, useState } from "react";
import { fetchData } from "../api/api";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const List = ({ title, param }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchData(param).then((res) =>
      setList(res.data.results)
    );
  }, [param]);

  const playTrailer = async (item) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${API_KEY}`
      );

      const data = await response.json();

      const trailer = data.results?.find(
        (video) =>
          video.site === "YouTube" &&
          (video.type === "Trailer" ||
            video.type === "Teaser")
      );

      if (trailer) {
        window.open(
          `https://www.youtube.com/watch?v=${trailer.key}`,
          "_blank"
        );
      } else {
        alert("Trailer not available");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="list">
      <div className="row">
        <h2 className="text-white title">{title}</h2>

        <div className="col">
          <div className="row__posters">
            {list.map((item) => (
              <img
                key={item.id}
                className="row_poster row__posterLarge"
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/original${item.poster_path}`
                    : "https://via.placeholder.com/200x300"
                }
                alt={item.title || item.name}
                onClick={() => playTrailer(item)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;


