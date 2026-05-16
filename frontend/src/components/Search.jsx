import React, { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom"; // React'in doğru yönlendirme aracı eklendi

const Search = ({ setIsSearchShow }) => {
  const [searchResults, setSearchResults] = useState(null);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate(); // Yönlendirme motorunu başlattık

  const handleCloseModal = (e) => {
    if(e) e.stopPropagation();
    setIsSearchShow(false);
    setSearchResults(null);
  };

  const handleProductClick = (e, id) => {
    e.preventDefault(); 
    e.stopPropagation(); // Tıklamanın Header'a sıçramasını engeller
    
    setIsSearchShow(false);
    setSearchResults(null);
    
    // Altı çizilen window.location yerine React'in orijinal metodunu kullanıyoruz:
    navigate(`/product/${id}`); 
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const productName = e.target[0].value;

    if (productName.trim().length === 0) {
      message.warning("Boş karakter arayamazsınız!");
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/api/products/search/${productName}`);
      if (!res.ok) {
        message.error("Ürün getirme hatası!");
        return;
      }
      const data = await res.json();
      setSearchResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 99999,
        display: "flex", justifyContent: "center", alignItems: "center",
      }}
      onClick={handleCloseModal} // Siyah boşluğa tıklayınca kapansın
    >
      <div
        style={{
          backgroundColor: "#fff", width: "100%", maxWidth: "500px",
          padding: "40px", borderRadius: "8px", position: "relative",
          textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          maxHeight: "80vh", overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()} // Beyaz kutuya tıklayınca kapanmasın
      >
        <button
          onClick={handleCloseModal}
          style={{
            position: "absolute", top: "15px", right: "20px", background: "none",
            border: "none", fontSize: "28px", cursor: "pointer", color: "#333", lineHeight: "1",
          }}
        >
          &times;
        </button>

        <h2 style={{ marginBottom: "20px", fontSize: "24px", color: "#333", fontWeight: "600" }}>
          Ne Aramıştınız?
        </h2>

        <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Ürün, kategori veya marka ara..."
            style={{ flex: 1, padding: "12px 15px", fontSize: "16px", border: "1px solid #ddd", borderRadius: "4px", outline: "none" }}
          />
          <button
            type="submit"
            style={{ padding: "12px 25px", backgroundColor: "#0d6efd", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "16px", fontWeight: "500" }}
          >
            Ara
          </button>
        </form>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", textAlign: "left" }}>
          {searchResults?.length === 0 && (
            <p style={{ textAlign: "center", color: "#888", marginTop: "10px" }}>
              😔 Aradığınız Ürün Bulunamadı 😔
            </p>
          )}

          {searchResults?.length > 0 &&
            searchResults.map((resultItem) => (
              <div
                key={resultItem._id || resultItem.id}
                onClick={(e) => handleProductClick(e, resultItem._id || resultItem.id)}
                style={{
                  display: "flex", alignItems: "center", gap: "15px", padding: "10px",
                  border: "1px solid #eee", borderRadius: "6px", cursor: "pointer",
                  color: "inherit", transition: "background 0.2s",
                }}
              >
                <img
                  src={Array.isArray(resultItem.img) ? resultItem.img[0] : resultItem.img}
                  alt={resultItem.name}
                  style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "4px" }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h4 style={{ margin: "0 0 5px 0", fontSize: "16px" }}>{resultItem.name}</h4>
                  <span style={{ color: "#0d6efd", fontWeight: "bold", fontSize: "14px" }}>
                    ${resultItem.price?.current ? resultItem.price.current.toFixed(2) : "0.00"}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;