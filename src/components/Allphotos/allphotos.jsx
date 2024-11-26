import React, { useState, useEffect } from 'react';
import './style.css';

const AllPhotos = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPinValid, setIsPinValid] = useState(false); // Flag for PIN validation
  const [enteredPin, setEnteredPin] = useState(''); // The PIN entered by the user
  const [pinStep, setPinStep] = useState(false); // To show the PIN entry step
  const [imageToDelete, setImageToDelete] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/images');
      const result = await response.json();
      setImages(result);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handlePinSubmit = () => {
    const correctPin = '@%NUllifiEd_ImaGeS'; // Admin pin hardcoded
    if (enteredPin === correctPin) {
      setIsPinValid(true);
      setPinStep(false);
    } else {
      alert('Invalid PIN');
    }
  };

  const handlePinChange = (e) => {
    setEnteredPin(e.target.value);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleUpload = async (e) => {
    if (!isPinValid) {
      setPinStep(true);
      return;
    }

    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const response = await fetch('http://localhost:8000/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pin: enteredPin }), // Send PIN with the request
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

  const handleDelete = async (image) => {
    if (!isPinValid) {
      setPinStep(true);
      return;
    }

    const confirmDelete = window.confirm(`Are you sure you want to delete ${image}?`);
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8000/api/delete/${image}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pin: enteredPin }), // Send PIN with the request
        });

        const result = await response.json();
        if (response.ok) {
          alert(result.message);
          fetchImages(); // Refresh the list of images
        } else {
          alert(result.message); // Handle errors
        }
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
  };

  return (
    <div className="all-photos-container">
      <h1>Gallery</h1>

      {pinStep && (
        <div className="pin-auth-container">
          <h2>Enter Admin PIN to Proceed</h2>
          <input
            type="password"
            value={enteredPin}
            onChange={handlePinChange}
            placeholder="Enter PIN"
          />
          <button onClick={handlePinSubmit}>Submit</button>
        </div>
      )}

      <div className="photos">
        {images.map((image) => (
          <div key={image} className="photo-item">
            <img
              src={`http://localhost:8000/assets/Images/${image}`}
              alt={image}
              onClick={() => handleImageClick(image)}
            />
            {isPinValid && (
              <div className="photo-actions">
                <button onClick={() => handleDelete(image)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {isPinValid && (
        <div className="upload-section">
          <h2>Upload a New Image</h2>
          <input type="file" accept="image/jpeg, image/png" onChange={handleUpload} />
        </div>
      )}

      {selectedImage && (
        <div className="selected-image-modal">
          <h2>{selectedImage}</h2>
          <img
            src={`http://localhost:8000/assets/Images/${selectedImage}`}
            alt={selectedImage}
          />
          <button onClick={() => setSelectedImage(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default AllPhotos;
