import css from "./ImageCard.module.css";

type Image = {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string;
};

type ImageCardProps = {
  image: Image;
  onClick: (image: Image) => void;
};

export default function ImageCard({ image, onClick }: ImageCardProps) {
  return (
    <div className={css.imageWrapper} onClick={() => onClick(image)}>
      <img
        className={css.galleryImage}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
}
