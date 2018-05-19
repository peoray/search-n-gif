const getGif = (e) => {
  const searchInput = document.getElementById("search-input");
  const searchTerm = searchInput.value;
  const searchLimit = document.getElementById("limit").value;
  if (searchTerm === "") {
    showMessage("Please fill in the search term", "alert-danger");
  }

  fetch(
    `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=qIR90tuYNfH07iAKDNNHDwRH3qsdxLIa&limit=${searchLimit}`
  )
    .then(res => res.json())
    .then(data => {
      let output = '<div class="container">';
      data.data.forEach(item => {
        console.log(item.images.original.url);
        output += `
            <div class="row">
                <div class="col-md-3>
                    <figure class="figure">
                        <img src="${
                          item.images.original.url
                        }" class="figure-img img-fluid rounded" alt="A gif image">
                    </figure>
                </div>
            </div>
            `;
      });
      output += "</div>";
      document.getElementById("results").innerHTML = output;
    })
    .catch(error => console.log(error));

  searchTerm.value = "";

  e.preventDefault();
};

const showMessage = (message, className) => {
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  const searchContainer = document.getElementById("search-container");
  const search = document.getElementById("search");
  searchContainer.insertBefore(div, search);

  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
};

// document.getElementById("search-form").addEventListener("submit", getGif);
document.getElementById("search-form").addEventListener("submit", (e) => {
  //show loader
  document.getElementById("loading").style.display = "block";
  setTimeout(getGif, 3000);

  e.preventDefault();
});

