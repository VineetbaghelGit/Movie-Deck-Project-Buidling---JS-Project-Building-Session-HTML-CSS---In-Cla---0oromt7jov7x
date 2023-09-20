let movies = [];
const API_KEY = "f531333d637d0c44abc85b3e74db2186";
const MOVIE_API_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`;

// An IIFE (Immediately Invoked Function Expression) function for runs as soon as it is defined.
(async () => {
  try {
    movies = await fetchMovies(MOVIE_API_URL);
    renderMovies(movies);
  } catch (err) {}
})();

//fetch function for fetching movies
async function fetchMovies(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    if (result.results) {
      return result.results;
    }
    throw result.status_message;
  } catch (err) {
    alert(err);
  }
}

//renderMovies function for render the ui of movie
const renderMovies = (movies) => {
  const movieList = document.getElementsByClassName("movie-container")[0];
  movieList.innerHTML = "";
  movies?.forEach((movie) => {
    const { poster_path, title, vote_count, vote_average } = movie;
    const movieHTML = renderMovieHTML(
      poster_path,
      title,
      vote_count,
      vote_average
    );

    const divItem = document.createElement("div");
    divItem.className = "movie-box";
    divItem.innerHTML = movieHTML;

    movieList.appendChild(divItem);
  });
};
//renderMovieHTML function is for html render
const renderMovieHTML = (posterPath, title, voteCount, voteAverage) => {
  const imgSrc = posterPath
    ? `https://image.tmdb.org/t/p/original/${posterPath}`
    : "./assets/images/default-img.png";

  return `
    <img src="${imgSrc}" />
    <div class="movie-details px-2 py-1 my-2">
      <h5 class="text-center movie-title my-2">${title}</h5>
      <div class="votes-likes d-flex justify-content-between">
        <div>
          <p class="vote-count">Vote: ${voteCount}</p>
          <p class="rating-count">Rating: ${voteAverage}</p>
        </div>
        <span>❤️</span>
      </div>
      <button type="button" class="btn w-100 btn-outline-danger">
        Watch Now
      </button>
    </div>
  `;
};

//sort by date
const sortByDateBtn = document.getElementById("sort-by-date");
sortByDateBtn.addEventListener("click", sortByDate);
let firstSortByDateClicked = true;

function sortByDate() {
  let sortedMovies;
  if (firstSortByDateClicked) {
    sortedMovies = movies.sort(function (a, b) {
      return new Date(a.release_date) - new Date(b.release_date);
    });
    sortByDateBtn.textContent = "Sort by date (latest to oldest)";
    firstSortByDateClicked = false;
  } else {
    sortedMovies = movies.sort(function (a, b) {
      return new Date(b.release_date) - new Date(a.release_date);
    });
    sortByDateBtn.textContent = "Sort by date (oldest to latest)";
    firstSortByDateClicked = true;
  }
  renderMovies(sortedMovies);
}

//sort by rating
const sortByRatingBtn = document.getElementById("sort-by-rating");
let firstSortByRatingClicked = true;
sortByRatingBtn.addEventListener("click", sortByRating);

function sortByRating() {
  let sortedMovies;
  if (firstSortByRatingClicked) {
    sortedMovies = movies.sort(function (a, b) {
      return a.vote_average - b.vote_average;
    });
    sortByRatingBtn.textContent = "Sort by rating (most to least)";
    firstSortByRatingClicked = false;
  } else {
    sortedMovies = movies.sort(function (a, b) {
      return b.vote_average - a.vote_average;
    });
    sortByRatingBtn.textContent = "Sort by rating (least to most)";
    firstSortByRatingClicked = true;
  }
  renderMovies(sortedMovies);
}

//search by name
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

searchBtn.addEventListener("click", () => {
  searchMovies(searchInput.value);
});
// fetch data by name function
const searchMovies = async (searchedMovie) => {
  const SEARCH_MOVIE_API_URL = `https://api.themoviedb.org/3/search/movie?query=${searchedMovie}&api_key=${API_KEY}&include_adult=false&language=en-US&page=1`;
  const movies = await fetchMovies(SEARCH_MOVIE_API_URL);
  renderMovies(movies);
};
