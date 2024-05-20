function showMovie() {
    

fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=778c329c5caa95b6c2d0a5c350263a7a&page=2')
.then(res => res.json())
.then(data => {
    let s = (activePage - 1) * recordPerPage;
    let e = activePage * recordPerPage;
 
    document.querySelector(".products").innerHTML = "";
    data.results.slice(s,e).forEach(movie => {
        console.log(movie);
        const div = document.createElement('div');
        div.classList.add('product');
        const a=document.createElement('a');
        a.setAttribute("href",`details.html?id=${movie.id}`);
        a.classList.add("link");
        div.appendChild(a);
  
        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        img.alt = movie.title;

        const h3 = document.createElement('h3');
        h3.textContent = movie.title;

        const p = document.createElement('p');
        p.textContent = "IMDB: "+movie.vote_average;
        const i1=document.createElement("i");
        i1.classList.add("fa-regular");
        i1.classList.add("fa-star");
        i1.style.color = "gold"; 
        i1.style.padding = "5px";
        p.appendChild(i1);
        const i=document.createElement('i');
        i.classList.add('fa-regular');
        i.classList.add('fa-heart');
        i.style.color="white";
        i.style.fontSize="20px";
   
        a.appendChild(img);
        a.appendChild(h3);
        a.appendChild(p);
        a.appendChild(i);

        document.querySelector('.products').appendChild(div);
    });
})
.catch(error => {
    console.error('Error fetching movies:', error);
});
}

    
const ul = document.querySelector(".pagination ");
const recordPerPage = 8;
let activePage = 1;
let totalRecords =20;
let totalPage = Math.ceil(totalRecords / recordPerPage);
function pagination() {
  ul.innerHTML = "";
  let s = activePage - 1 > 0 ? activePage - 1 : 1;
  let e = activePage + 1 <= totalPage ? activePage + 1 : totalPage;
  for (let i = s; i <= e; i++) {
    let li = document.createElement("li");
    li.textContent = i;
    if (i == activePage) {
      li.classList.add("active");
    }
    li.addEventListener("click", () => {
      activePage = i;
      showMovie();
      pagination();
    });
    ul.appendChild(li);
  }
}
showMovie();
pagination();
const searchInput = document.getElementById("search-box");
const searchList = document.getElementById("search-list");

function searchMovies() {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=778c329c5caa95b6c2d0a5c350263a7a&query=${searchInput.value}`)
        .then(response => response.json())
        .then(data => {
          searchList.innerHTML = ""; 
            const results = data.results;
       
            results.forEach(result => {
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
