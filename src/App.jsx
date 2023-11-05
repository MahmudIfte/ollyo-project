import React, { useState, useRef } from 'react';
import './App.css';

export default function App() {
  const [uploadImage, setUploadImage] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const dragImage = useRef(0);
  const dragOverImage = useRef(0);

  // Functions

  const handleUploadImage = () => {
    if (uploadImage) {
      const newImage = {
        id: Date.now(),
        uploadImage,
        imageURL: URL.createObjectURL(uploadImage),
      };

      setImages([...images, newImage]);
      setUploadImage(null);
    }
  };

  const handleSelected = (e, id) => {
    if (e.target.checked) {
      setSelectedImages([...selectedImages, id]);
    } else {
      setSelectedImages(
        selectedImages.filter((selectedImage) => {
          return selectedImage !== id;
        })
      );
    }
  };

  const handleDelete = () => {
    const filteredImages = images.filter((image) => {
      return !selectedImages.includes(image.id);
    });

    setImages(filteredImages);
    setSelectedImages([]);
  };

  const handleDragEnd = () => {
    const imagesCopy = [...images];

    const temp = imagesCopy[dragImage.current];
    imagesCopy[dragImage.current] = imagesCopy[dragOverImage.current];
    imagesCopy[dragOverImage.current] = temp;

    setImages(imagesCopy);
  };

  return (
    <>


      <section class="gallery min-vh-100">
        <div class="container-ig">
          <div class="row gy-4 row-cols-1">
            <div class="col">
              <div class=" col-7 mb-3 ">
                <input
                  type="file"
                  class="form-control"
                  onChange={(e) => {
                    setUploadImage(e.target.files[0]);
                  }}
                />
              </div>
              <button onClick={handleUploadImage} class="btn btn-outline-dark">Upload</button>

              <div className="bg-success font-weight-bold mt-2 mb-2">{selectedImages.length} image selected</div>


              <hr />

              <div className="imgDiv row row-cols-1 row-cols-sm-2 row-cols-md-3">
                {images.map((image, index) => (
                  <>
                    <div
                      key={image.id}
                      className="indImgDiv"
                      draggable={'true'}
                      onDragStart={() => {
                        dragImage.current = index;
                      }}
                      onDragEnter={() => {
                        dragOverImage.current = index;
                      }}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => {
                        e.preventDefault();
                      }}
                    >
                      
                      <img
                        src={image.imageURL}
                        alt=""
                        style={{ maxWidth: '300px' }}
                        className={index === 0 ? 'featureProduct' : ''}
                      />
                    
                      <input
                        type="checkbox"
                        checked={selectedImages.includes(image.id)}
                        onChange={(e) => {
                          handleSelected(e, image.id);
                        }}
                      />
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
          <hr />

          <button onClick={handleDelete} class="btn btn-outline-dark">Delete images</button>

        </div>
      </section>

    </>
  );
}
