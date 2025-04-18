import { getImagesByQuery } from "./js/pixabay-api";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton
} from "./js/render-functions";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import iconError from "./img/error.svg"


const form = document.querySelector(".form");
const fetchGalleryBtn = document.querySelector(".gallery-button");

let curentPage = 1;
let curentQuery = "";

form.addEventListener("submit", async event => {
  event.preventDefault();

  const query = event.target.elements["search-text"].value.trim().toLowerCase();

  if (query === "") {
    iziToast.error({
      message: "Please enter a search query.",
      position: "topRight",
      backgroundColor: "#ef4040",
      titleColor: "#fff",
      messageColor: "#fff",
      class: "error-icon",
      iconUrl: iconError,
    });
    return;
  } 
  if(query !== curentQuery) {
    curentQuery = query;
    curentPage = 1;
    clearGallery();
    hideLoadMoreButton();
  }

  await fetchImages(true);
  form.reset();

}); 

fetchGalleryBtn.addEventListener("click", async () => {
    await fetchImages();
});

  async function fetchImages(isFirstLoad = false) {
    showLoader();
 
    try {
        const userGetImages = await getImagesByQuery(curentQuery, curentPage);
        
     
        if (userGetImages.hits.length === 0 && isFirstLoad) {
          iziToast.error({
            message: "Sorry, there are no images matching<br/> your search query. Please try again!",
            position: "topRight",
            backgroundColor: "#ef4040",
            titleColor: "#fff",
            messageColor: "#fff",
            class: "error-icon",
            iconUrl: iconError,
          });
          return;
        }
  
    createGallery(userGetImages.hits);
    curentPage++;
    
    if(!isFirstLoad) {
    const firstCard = document.querySelector(".gallery .gallery-item");
if (firstCard) {
  const cardHeight = firstCard.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}
    }
    
if(userGetImages.hits.length === 15) {
    showLoadMoreButton();
    showLoader();
} else {
    hideLoadMoreButton()
    iziToast.show({
      message: "We're sorry, but you've reached the end of search results.",
    });
    hideLoader();
  }
        
      } catch (error) {
        iziToast.error({
          message: "Something went wrong. Please try again later!",
          position: "topRight",
          backgroundColor: "#ef4040",
          titleColor: "#fff",
          messageColor: "#fff",
          class: "error-icon",
          iconUrl: iconError,
        });
         
      } finally {
        hideLoader();
      }
    }

  