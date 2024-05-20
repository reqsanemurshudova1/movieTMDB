
// URL-dən Film ID-nin çıxarılması ucun  
const search = window.location.search;
const params = new URLSearchParams(search);
const id = params.get("id");

// film detallarinin alinmasi api
fetch(
  `https://api.themoviedb.org/3/movie/${id}?api_key=778c329c5caa95b6c2d0a5c350263a7a`
)
  .then((res) => res.json())
  .then((movie) => {
    console.log(movie);

    const div = document.createElement("div");
    div.classList.add("detail");

    const title = document.createElement("h1");
    title.textContent = movie.title;
 
    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const text = document.createElement("div");
    text.classList.add("text");

    const h3 = document.createElement("h3");
    h3.textContent = movie.title;

    const p = document.createElement("p");
    p.textContent = movie.overview;

    const span1 = document.createElement("span");
    span1.textContent = "Budget:" + movie.budget + "$.";

    const span2 = document.createElement("span");
    span2.textContent = "Imdb:" + movie.vote_average;

    const span3 = document.createElement("span");
    span3.textContent = " Release:" + movie.release_date;

    const span4 = document.createElement("span");
    span4.textContent = "Lan:" + movie.original_language;

    const span5 = document.createElement("span");
    span5.textContent = "Runtime:" + movie.runtime + " dəqiqə";
    const a = document.createElement("a");
    a.setAttribute(
      "href",
      "https://youtu.be/Btn9i_bodiI?si=wXhOIydsGdnbuBaj"
    );
    a.textContent = "Watching Trailer";
    div.appendChild(h3);
    div.appendChild(img);
    
    div.appendChild(p);
    div.appendChild(span1);
    div.appendChild(span2);
    div.appendChild(span3);
    div.appendChild(span4);
    div.appendChild(span5);
    div.appendChild(a);
    document.querySelector(".details").appendChild(div);

    // filmde oynamis aktyorlarin api

    fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=543f69d2bbf810ca63adf5bbbe256bbf`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.cast);

        const swiper = document.querySelector(".swiper-wrapper");
        data.cast.forEach((actor) => {
          const actorDiv = document.createElement("div");
          actorDiv.classList.add("swiper-slide");
          const imgDiv = document.createElement("div");
          imgDiv.classList.add("imgDiv");
          const img = document.createElement("img");

          img.src = actor.profile_path
            ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
            : "https://upload.wikimedia.org/wikipedia/az/c/c0/Menyu_%28film%29.jpg";
          imgDiv.append(img);
          const h3 = document.createElement("h3");
          h3.textContent = "Actor Name:"+actor.name;

          const p = document.createElement("p");
          p.textContent = " Character:"+actor.character;
          const textDiv = document.createElement("div");
          textDiv.append(h3, p);
          actorDiv.append(imgDiv, textDiv);

          swiper.appendChild(actorDiv);
        });
      })
      .catch((error) => {
        console.error("Error fetching movie credits:", error);
      });
  })
  .catch((error) => {
    console.error("Error fetching movie details:", error);
  });

// Oxsar filmler
fetch(
  `https://api.themoviedb.org/3/movie/${id}/similar?api_key=778c329c5caa95b6c2d0a5c350263a7a&page=1`
)
  .then((res) => res.json())
  .then((data) => {
    const carousel = document.querySelector(".carousel");

    data.results.forEach((movie) => {
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");

      const img = document.createElement("img");
      img.src = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://upload.wikimedia.org/wikipedia/az/c/c0/Menyu_%28film%29.jpg";

      const title = document.createElement("h3");
      title.textContent = movie.title;

      carouselItem.appendChild(img);
      carouselItem.appendChild(title);

      carousel.appendChild(carouselItem);
    });
  })
  .catch((error) => {
    console.error("Error fetching similar movies:", error);
  });

  function searchMovies() {

  
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=778c329c5caa95b6c2d0a5c350263a7a&query=${searchInput.value}`)
        .then(response => response.json())
        .then(data => {
            
            const results = data.results;
            searchList.innerHTML = "";
            results.forEach(result => {
              searchInput.innerHTML = "";
                const movieTitle = result.title;
                const listItem = document.createElement("div");
                listItem.classList.add("search-item");
                const a=document.createElement("a");
                a.setAttribute("href",`details.html?id=${result.id}`);

                a.classList.add("link");
                listItem.appendChild(a);

                listItem.classList.add("search-list-item");
                listItem.setAttribute("id", result.id);
                
                const img = document.createElement("img");
                img.src = `https://image.tmdb.org/t/p/w500${result.poster_path}`;
                img.alt = movieTitle;
                a.appendChild(img);
                const text=document.createElement("div");
                text.classList.add("text");
                a.appendChild(text);
                
                const h3 = document.createElement("h3");
                h3.textContent = movieTitle;
                text.appendChild(h3);
                
                const p = document.createElement("p");
                p.textContent = "IMDB: " + result.vote_average;
                text.appendChild(p);

                searchList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("Error searching movies:", error);
        });
}

searchInput.addEventListener("input", searchMovies);
