import { useState, useEffect } from "react";
import "./Gallery.css";

const Gallery = ({ singleProduct }) => {
  const [activeImg, setActiveImg] = useState({
    img: "",
    imgIndex: 0,
  });

  useEffect(() => {
    if (singleProduct?.img) {
      const firstImg = Array.isArray(singleProduct.img) 
        ? singleProduct.img[0] 
        : singleProduct.img.singleImage;
        
      setActiveImg({ img: firstImg, imgIndex: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleProduct]); // ÇÖZÜM: Bağımlılık dizisini bu şekilde bırakıp üstteki yorumu ekledik.

  const fixSrc = (src) => {
    if (!src) return "";
    if (src.startsWith("http") || src.startsWith("data:")) return src;
    return src.startsWith("/") ? src : `/${src}`;
  };

  const productImages = Array.isArray(singleProduct?.img) 
    ? singleProduct.img 
    : singleProduct?.img?.thumbs || [];

  return (
    <div className="product-gallery">
      <div className="single-image-wrapper">
        <img src={fixSrc(activeImg.img)} alt="" className="main-image" />
      </div>
      <div className="product-thumb">
        <ul className="thumb-list">
          {productImages.map((item, index) => (
            <li 
              key={index} 
              className="thumb-item" 
              onClick={() => setActiveImg({ img: item, imgIndex: index })}
            >
              <img 
                src={fixSrc(item)} 
                alt="" 
                className={`thumb-img ${activeImg.imgIndex === index ? "active" : ""}`} 
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Gallery;