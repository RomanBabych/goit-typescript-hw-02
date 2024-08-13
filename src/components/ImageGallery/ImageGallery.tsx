import React from "react";
import { Image } from "../App/App";

interface ImageGalleryProps {
  images: Image[];
  onClick: (image: Image) => void;
  lastItemRef: React.RefObject<HTMLLIElement>;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onClick, lastItemRef }) => {
  return (
    <ul>
      {images.map((image) => (
        <li
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
