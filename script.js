//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url){
	return new Promise((resolve, reject) => {
		const img = new Image();
	    img.onload = () => resolve(img);
	    img.onerror = () => reject(`Failed to download image: ${url}`);
	    img.src = url;
	})
}

function downloadImages() {
  const loading = document.getElementById("loading");
  const errorDiv = document.getElementById("error");

  output.innerHTML = "";
  errorDiv.textContent = "";

  loading.style.display = "block";
  const promises = images.map(imgObj => downloadImage(imgObj.url));

  Promise.all(promises)
    .then(loadedImages => {
      loading.style.display = "none";
      loadedImages.forEach(img => output.appendChild(img));
    })
    .catch(err => {
      loading.style.display = "none";
      errorDiv.textContent = err;
    });
}

btn.addEventListener("click", downloadImages);