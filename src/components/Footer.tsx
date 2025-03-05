import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="d-flex justify-content-between align-items-center text-white bg-dark p-4">
      <div>
        <p className="fs-3 fw-bold m-0">ArtGalleryManager</p>
        <p className="m-0">Your go-to platform for managing and exploring exquisite art peaces.</p>
      </div>

      <div className="d-flex flex-wrap justify-content-center align-items-center">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light p-1">
          <FaFacebookF size={20} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light p-1">
          <FaTwitter size={20} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light p-1">
          <FaInstagram size={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
