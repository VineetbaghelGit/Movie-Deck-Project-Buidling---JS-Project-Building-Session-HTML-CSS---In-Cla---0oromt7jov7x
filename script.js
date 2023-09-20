let movies = [];
const API_KEY = "f531333d637d0c44abc85b3e74db2186";

const movieList = document.getElementsByClassName("movie-container")[0];

async function fetchMovies() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`
    );
    const result = await response.json();
    movies = result.results;
    renderMovies(movies);

    console.log("🚀 ~ file: script2.js:13 ~ fetchMovies ~ result:", result);
  } catch (err) {
    console.log("🚀 ~ file: script2.js:14 ~ fetchMovies ~ err:", err);
  }
}
fetchMovies();

const renderMovies = (movies) => {
  movieList.innerHTML = "";
  movies.map((movie) => {
    const { poster_path, title, vote_count, vote_average } = movie;
    let divItem = document.createElement("div");
    divItem.className = "movie-box";
    let imgSrc = poster_path
      ? `https://image.tmdb.org/t/p/original/${poster_path}`
      : "https://w7.pngwing.com/pngs/116/765/png-transparent-clapperboard-computer-icons-film-movie-poster-angle-text-logo-thumbnail.png";

    divItem.innerHTML += `
    <img
    src=${imgSrc}
  />
  <div class="movie-details px-2 py-1 my-2">
    <h5 class="text-center movie-title my-2">${title}</h5>
    <div class="votes-likes d-flex justify-content-between">
      <div>
        <p class="vote-count">Vote: ${vote_count}</p>
        <p class="rating-count">Rating: ${vote_average}</p>
      </div>
      <span>❤️</span>
    </div>
    <button type="button" class="btn w-100 btn-outline-danger">
      Watch Now
    </button>
  </div>
    `;
    movieList.appendChild(divItem);
  });
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
  // pagnination.style.display="none"
});

const searchMovies = async (searchedMovie) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchedMovie}&api_key=${API_KEY}&include_adult=false&language=en-US&page=1`
    );
    const result = await response.json();
    console.log("🚀 ~ file: script2.js:115 ~ searchMovies ~ result:", result);
    movies = result.results;
    renderMovies(movies);
  } catch (err) {
    console.log("🚀 ~ file: script2.js:114 ~ searchMovies ~ err:", err);
  }
};
