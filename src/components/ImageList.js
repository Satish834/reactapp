import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ImageList.css';

const ImageList = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://ubt4dlosea.execute-api.us-east-1.amazonaws.com/dep/metadata?tablename=img-metadata&imgid=sheetal_misra-2025_sheetal-nature_beauty.jpg');
        console.log('API Response:', response.data);
        setImages(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="image-list">
      <div className="image-section">
        {images.map((image) => (
          <img key={image.ImgID} src={`https://s3.amazonaws.com/proce-imgs/${image.ImgID}`} alt={image.Description} />
        ))}
      </div>
      <div className="content-box">
        <h2>Processed Images Metadata</h2>
        {images.map((image) => (
          <div key={image.ImgID}>
            <p><strong>ID:</strong> {image.ImgID}</p>
            <p><strong>Upload Timestamp:</strong> {image.UploadTimestamp}</p>
            <p><strong>Description:</strong> {image.Description}</p>
            <p><strong>Artist:</strong> {image.Artist}</p>
            <p><strong>Copyright:</strong> {image.Copyright}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageList;
