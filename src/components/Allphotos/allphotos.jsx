import { useState, useEffect } from 'react';
import './style.css';

const AllPhotos = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // Stores the clicked image
  const [isPinValid, setIsPinValid] = useState(false); // Admin PIN validation flag
  const [enteredPin, setEnteredPin] = useState(''); // Admin PIN input
  const [pinStep, setPinStep] = useState(false); // To show PIN entry section

  const adminPin = '12345'; // The admin PIN (you can change it)

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/images');
      const result = await response.json();
      setImages(result);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handlePinSubmit = () => {
    if (enteredPin === adminPin) {
      setIsPinValid(true);
      setPinStep(false);
    } else {
      alert('Invalid PIN');
    }
  };

  const handlePinChange = (e) => {
    setEnteredPin(e.target.value);
  };

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    
    // Send the PIN as a part of the form data as well
    formData.append('pin', enteredPin);
  
    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,  // Send formData with image and pin
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert(result.message);
        fetchImages(); // Refresh the list of images
      } else {
        alert(result.message); // Handle errors
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  
  const handleDelete = async () => {
    if (selectedImage) {
      const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedImage}?`);
      if (confirmDelete) {
        try {
          const response = await fetch(`http://localhost:5000/api/delete/${selectedImage}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pin: enteredPin }), // Send PIN for validation
          });
          const result = await response.json();
          if (response.ok) {
            alert(result.message);
            fetchImages(); // Refresh the list of images
            setSelectedImage(null); // Close the modal
            console.log ('Image deleted successfully');
          } else {
            alert(result.message); // Handle errors
          }
        } catch (error) {
          console.error('Error deleting image:', error);
        }
      }
    }
  };

  return (
    <div className="all-photos-container">
      <div className="header-container">
        <h1 className="page-title">Gallery</h1>

        {/* PIN Authentication Section (visible to Admin) */}
        {!isPinValid && (
          <div className="pin-auth-container">
            <div className="pin-message">Only admins can upload or delete images.</div>
            <input
              type="password"
              value={enteredPin}
              onChange={handlePinChange}
              placeholder="Enter Admin PIN"
            />
            <button onClick={handlePinSubmit}>Submit</button>
          </div>
        )}

        {/* Upload Section - Only visible to Admin */}
        {isPinValid && (
          <div className="upload-section">
            <input type="file" accept="image/jpeg, image/png" onChange={handleUpload} />
          </div>
        )}
      </div>

      {/* Photos Section */}
      <div className="photos">
        {images.map((image) => (
          <div key={image} className="photo-item">
            <img
              src={`http://localhost:5000/assets/Images/${image}`}
              alt={image}
              onClick={() => setSelectedImage(image)} // Open the selected image
            />
          </div>
        ))}
      </div>

      {/* Full Zoom View of the Selected Image */}
      {selectedImage && (
        <div className="selected-image-modal">
          <div className="modal-content">
            <img
              src={`http://localhost:5000/assets/Images/${selectedImage}`}
              alt={selectedImage}
              className="zoomed-image"
            />
            <button className="close-button" onClick={() => setSelectedImage(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for Delete Confirmation */}
      {selectedImage && isPinValid && (
        <div className="delete-image-modal">
          <h2>Delete {selectedImage}</h2>
          <img
            src={`http://localhost:5000/assets/Images/${selectedImage}`}
            alt={selectedImage}
          />
          <div className="modal-actions">
            <button onClick={() => setSelectedImage(null)}>Close</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPhotos;
