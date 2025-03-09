import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { ArrowUp } from "react-bootstrap-icons";

const ScrollToTopButton: React.FC = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button 
      variant="dark"
      className={`scroll-to-top ${showButton ? "show" : ""}`} 
      onClick={scrollToTop}
    >
      <ArrowUp size={24} />
    </Button>
  );
};

export default ScrollToTopButton;