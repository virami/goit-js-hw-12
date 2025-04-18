import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const fetchGalleryBtn = document.querySelector(".gallery-button");

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => `
        <li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" width="360" height="152" />
          </a>
          <ul class="gallery-info">
            <li class="gallery-info-item"><b>Likes</b> ${likes}</li>
            <li class="gallery-info-item"><b>Views</b> ${views}</li>
            <li class="gallery-info-item"><b>Comments</b> ${comments}</li>
            <li class="gallery-info-item"><b>Downloads</b> ${downloads}</li>
          </ul>
        </li>
      `
    )
    .join("");

  gallery.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh(); 
}

export function clearGallery() {
  gallery.innerHTML = "";
}

export function showLoader() {
  loader.classList.remove("is-hidden");
}

export function hideLoader() {
  loader.classList.add("is-hidden");
}

export function showLoadMoreButton() {
  fetchGalleryBtn.classList.remove("is-hidden");
}

export function hideLoadMoreButton() {
  fetchGalleryBtn.classList.add("is-hidden");
}