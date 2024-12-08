import { useState, useEffect, useRef } from "react";
import "./gallery.css";

const Gallery = () => {
  const [scrollPos, setScrollPos] = useState(0); // Track scroll position
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state
  const [modalImage, setModalImage] = useState(null); // Store the image to be displayed in the modal
  const galleryRef = useRef(null); // Reference to the gallery container
  const intervalRef = useRef(null); // Ref to store the interval ID

  // Function to automatically scroll images from right to left
  const autoScroll = () => {
    if (galleryRef.current) { // Check if gallery element exists
      const maxScroll = galleryRef.current.scrollWidth - galleryRef.current.clientWidth; // Calculate max scroll position
      setScrollPos((prev) => (prev >= maxScroll ? 0 : prev + 1)); // Increment scroll position
    }
  };

  // Handle mouse wheel scrolling
  const handleWheel = (e) => {
    e.preventDefault(); // Prevent default scroll behavior
    if (galleryRef.current) { // Check if gallery element exists
      const scrollAmount = e.deltaY > 0 ? 1 : -1; // Determine scroll direction
      galleryRef.current.scrollLeft += scrollAmount; // Scroll gallery
    }
  };

  // Start auto-scrolling when the component mounts
  useEffect(() => {
    intervalRef.current = setInterval(autoScroll, 25); // Adjust the interval for smoother scrolling
    return () => clearInterval(intervalRef.current); // Clean up on component unmount
  }, []);

  // Pause auto-scrolling on hover
  const handleMouseEnter = () => {
    clearInterval(intervalRef.current); // Clear the interval when hovered  
  };

  // Resume auto-scrolling after hover is left or the mouse pointer is not on the images
  const handleMouseLeave = () => {
    intervalRef.current = setInterval(autoScroll, 30); // Restart the interval when hover ends
  };

  // Open modal to show enlarged image
  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  // Handle next scroll (click on '>')
  const scrollNext = () => {
    setScrollPos((prev) => prev + 200); // Adjust by the width of one image (e.g., 200px)
  };

  // Handle previous scroll (click on '<')
  const scrollPrev = () => {
    setScrollPos((prev) => (prev > 0 ? prev - 200 : 0)); // Prevent going below zero
  };

  return (
    <div
      className="gallery-container"
      onWheel={handleWheel} // Add wheel event listener
      onMouseEnter={handleMouseEnter} // Pause auto-scrolling on hover
      onMouseLeave={handleMouseLeave} // Resume auto-scrolling after hover
      ref={galleryRef}
    >
      <div
        className="image-wrapper"
        style={{
          display: "flex",
          transition: "transform 0.5s",
          transform: `translateX(-${scrollPos}px)`,
        }}
      >
        {Array.from({ length: 65 }, (_, index) => (
          <div className="image-container" key={index}>
            <img
              src={`./assets/Images/Image (${index + 1}).jpg`} // Updated path to images
              alt={`Radhey Smart Interiors ${index + 1}`}
              onClick={(e) => {
                e.stopPropagation(); // Stop event from bubbling up to parent
                openModal(`./assets/Images/Image (${index + 1}).jpg`);
              }}
            />
            <div className="click-overlay" style={{ color: '#f39c12;' }}>Click to View</div> {/* Overlay text */}
          </div>
        ))}
      </div>

      {/* Modal for enlarged image */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={modalImage} alt="RADHEY SMART INTERIORS" className="modal-image" />
            <button className="close-modal" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      {/* Navigation buttons for faster scrolling */}
      <button className="scroll-button prev" onClick={scrollPrev}>◀️</button>
      <button className="scroll-button next" onClick={scrollNext}>▶️</button>
    </div>

  );
};


export default Gallery;
