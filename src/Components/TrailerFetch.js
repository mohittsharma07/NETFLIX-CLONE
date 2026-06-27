const playTrailer = async (id) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
    );

    const data = await response.json();

    const trailer = data.results.find(
      (video) =>
        video.type === "Trailer" &&
        video.site === "YouTube"
    );

    if (trailer) {
      window.open(
        `https://www.youtube.com/watch?v=${trailer.key}`,
        "_blank"
      );
    } else {
      alert("Trailer not found");
    }
  } catch (error) {
    console.log(error);
  }
};