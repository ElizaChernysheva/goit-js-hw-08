import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from './gallery-items';

const galleryEl = document.querySelector(".gallery");

createGallery();

let lightbox = new SimpleLightbox(".gallery a", {
  overlay: true,
  captionsData: "alt",
  captionDelay: 250,
});

function createGallery() {
  const galleryItemsEl = galleryItems
    .map(({ preview, original, description }) => {
      return `
      <li>
        <a class="gallery__item" href="${original}">
          <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>
      </li>
        `;
    })
    .join("");

  galleryEl.insertAdjacentHTML("beforeend", galleryItemsEl);
}
