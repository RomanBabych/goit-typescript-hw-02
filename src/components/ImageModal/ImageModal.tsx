import React from "react";
import Modal from "react-modal";
import { Image } from "../App/App";

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  image: Image | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onRequestClose, image }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      {image && (
        <div>
          <img src={image.urls.regular} alt={image.alt_description} />
          <button onClick={onRequestClose}>Close</button>
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;
