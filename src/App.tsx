import React from "react";
import ArtworkList from "./components/ArtworkList";
import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";

const App: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <div className="flex-grow-1">
        <ArtworkList />
      </div>
      <ScrollToTopButton />
      <Footer />
    </div>
  );
};


export default App;
