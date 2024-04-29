

document.querySelector("#input").addEventListener("keyup", (event) => {
  if (event.key == "Enter")
    apiRequest();
});

document.querySelector("#search").addEventListener("click", () => {
    apiRequest();
});

let currentPage = 1;
const perPage = 12;

document.getElementById("showMoreBtn").style.display = "none";
document.getElementById("para").style.display = "none";

apiRequest = () => {
  document.querySelector("#grid").textContent = "";
  currentPage = 1; // Reset current page when a new search is made.

  const url = 'https://api.unsplash.com/search/photos?query=' + input.value + '&per_page=' + perPage + '&page=' + currentPage + '&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';

  fetch(url)
    .then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then(data => {
      loadImages(data);
    })
    .catch(error => console.log(error));
}

loadImages = (data) => {
  for (let i = 0; i < data.results.length; i++) {
    let image = document.createElement("div");
    image.className = "img";
    image.style.backgroundImage = "url(" + data.results[i].urls.raw + "&w=1366&h=768" + ")";
    image.addEventListener("dblclick", function () {
      window.open(data.results[i].links.download, '_blank');
    })
    document.querySelector("#grid").appendChild(image);
  }

  // Show More button
  const showMoreBtn = document.getElementById("showMoreBtn");
  const para = document.getElementById("para");
  if (data.total_pages > currentPage) {
    showMoreBtn.style.display = "block";
    para.style.display = "block";
    showMoreBtn.addEventListener("click", function () {
      currentPage++;
      showMore();
    });
  } else {
    showMoreBtn.style.display = "none"; // Hide button if no more pages available
  }
}

showMore = () => {
  const url = 'https://api.unsplash.com/search/photos?query=' + input.value + '&per_page=' + perPage + '&page=' + currentPage + '&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';

  fetch(url)
    .then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then(data => {
      loadImages(data);
    })
    .catch(error => console.log(error));
}
