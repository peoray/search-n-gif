document.getElementsByName("sortby").forEach(radioButton => {
  // document.getElementById("search-input").focus();
  radioButton.addEventListener("change", event => {
    if (event.target.value === "trending") {
      document.getElementById("search-input").disabled = true;
    } else {
      document.getElementById("search-input").disabled = false;
      document.getElementById("search-input").focus();
    }
  });
});

const getGif = e => {
  const searchFalse = (document.getElementById("search").disabled = false);
  const searchInput = document.getElementById("search-input");
  const searchTerm = searchInput.value;
  const searchLimit = document.getElementById("limit").value;
  let data = document.querySelector("input[name=sortby]:checked").value;

  if (searchTerm === "" && data === "search") {
    showMessage("Please fill in the search term", "alert-danger");
  }

  document.getElementById("loader").style.display = "block";

  fetch(
    `https://api.giphy.com/v1/gifs/${data}?q=${searchTerm}&api_key=qIR90tuYNfH07iAKDNNHDwRH3qsdxLIa&limit=${searchLimit}`
  )
    .then(res => res.json())
    .then(data => {
      document.getElementById("loader").style.display = "none";
      let output = '<div class="container">';
      data.data.forEach(item => {
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

document.getElementById("search-form").addEventListener("submit", getGif);

// https://dev.to/hitman666/getting-started-with-vuejs-2-by-building-a-giphy-search-application-2co3
