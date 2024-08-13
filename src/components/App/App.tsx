import css from "./App.module.css";
import { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import { fetchImages } from "../../images-api";

export type Image = {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
};

type Error = string | null;

export default function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>(null);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const lastGalleryItemRef = useRef<HTMLLIElement | null>(null);

  const handleSearch = (newQuery: string) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setTotalPages(0);
    setError(null);
  };

  useEffect(() => {
    const fetchImagesData = async () => {
      setLoading(true);

      try {
        const { images: fetchedImages, totalPages } = await fetchImages(query, page);
        setImages((prevImages) =>
          page === 1 ? fetchedImages : [...prevImages, ...fetchedImages]
        );
        setTotalPages(totalPages);
      } catch (error) {
        const errorMessage = (error as { message?: string }).message || "An unknown error occurred";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchImagesData();
    }
  }, [query, page]);

  useEffect(() => {
    if (lastGalleryItemRef.current) {
      lastGalleryItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [images]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {error && <ErrorMessage message={error} />}
      <ImageGallery
        images={images}
        onClick={setSelectedImage}
        lastItemRef={lastGalleryItemRef}
      />
      {loading && <Loader />}
      {images.length > 0 && page < totalPages && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {page === totalPages && (
        <p className={css.endCollectionText}>
          you have reached the end of search results.
        </p>
      )}
      <ImageModal
        isOpen={!!selectedImage}
        onRequestClose={() => setSelectedImage(null)}
        image={selectedImage}
      />
    </div>
  );
}
