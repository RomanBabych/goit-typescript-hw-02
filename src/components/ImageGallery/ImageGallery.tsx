import React from "react";
import { Image } from "../App/App";
import css from "./ImageGallery.module.css"

interface ImageGalleryProps {
  images: Image[];
  onClick: (image: Image) => void;
  lastItemRef: React.RefObject<HTMLLIElement>;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onClick, lastItemRef }) => {
  return (
    <ul className={css.galleryList}>
      {images.map((image) => (
        <li className={css.galleryListItem}
          key={image.id}
          ref={lastItemRef}
          onClick={() => onClick(image)}
        >
          <img src={image.urls.small} alt={image.alt_description} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
