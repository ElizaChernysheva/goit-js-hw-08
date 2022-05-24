// Add imports above this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from './gallery-items';


const galleryEl = document.querySelector(".gallery");

createGallery();

galleryEl.addEventListener("click", (event) => {
  event.preventDefault();
  const galleryItemEl = event.target;

  if (galleryItemEl.nodeName !== "A") return;
});

let lightbox = new SimpleLightbox(".gallery a", {
  overlay: true,
  captionsData: "alt",
  captionDelay: 250,
});

function createGallery() {
  const galleryItemsEl = galleryItems
    .map(({ preview, original, description }) => {
      return `
        <a class="gallery__item" href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>
        `;
    })
    .join("");

  galleryEl.insertAdjacentHTML("beforeend", galleryItemsEl);
}
