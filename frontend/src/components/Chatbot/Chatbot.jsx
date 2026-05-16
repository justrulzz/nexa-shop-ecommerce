import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [products, setProducts] = useState([]); // Tüm ürünleri tutacak
  const [filteredResults, setFilteredResults] = useState([]); // Sadece eşleşenleri tutacak

  const [filters, setFilters] = useState({
    category: "",
    color: "",
    price: "",
  });

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // Asistan açıldığında ürünleri veritabanından çek
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/products`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.log("Hata:", error);
      }
    };
    fetchProducts();
  }, [apiUrl]);

  const handleCategorySelect = (selectedCategory) => {
    setFilters({ ...filters, category: selectedCategory });
    setStep(2);
  };

  const handleColorSelect = (selectedColor) => {
    setFilters({ ...filters, color: selectedColor });
    setStep(3);
  };

  // Fiyat seçildiği an FİLTRELEME İŞLEMİ başlar
  const handlePriceSelect = (selectedPrice) => {
    const newFilters = { ...filters, price: selectedPrice };
    setFilters(newFilters);

    const results = products.filter((p) => {
      // 1. Kategori Kontrolü
      const dbCategory =
        typeof p.category === "object" ? p.category.name : p.category;
      const matchCategory =
        dbCategory?.trim().toLowerCase() ===
        newFilters.category.trim().toLowerCase();

      // 2. Fiyat Kontrolü
      const price = p.price.current;
      let matchPrice = false;
      if (selectedPrice === "0-100") matchPrice = price >= 0 && price <= 100;
      else if (selectedPrice === "100-500")
        matchPrice = price > 100 && price <= 500;
      else if (selectedPrice === "500-1000")
        matchPrice = price > 500 && price <= 1000;
      else if (selectedPrice === "1000+") matchPrice = price > 1000;

      // 3. Renk Kontrolü (Eğer veritabanında "colors" dizisi yoksa veya "Farketmez" seçildiyse es geç)
      const matchColor =
        newFilters.color === "Farketmez" ||
        !p.colors ||
        p.colors.length === 0 ||
        p.colors.includes(newFilters.color);

      return matchCategory && matchPrice && matchColor;
    });

    setFilteredResults(results);
    setStep(4);
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const resetChat = () => {
    setStep(1);
    setFilters({ category: "", color: "", price: "" });
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {step > 1 && (
                <button
                  onClick={goBack}
                  title="Geri"
                  style={{
                    background: "none",
                    border: "none",
                    color: "white",
                    fontSize: "20px",
                    cursor: "pointer",
                    padding: "0",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  ⬅️
                </button>
              )}
              <h3 style={{ margin: 0, display: "flex", alignItems: "center" }}>
                🛍️ Akıllı Asistan
              </h3>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              X
            </button>
          </div>    

          <div className="chatbot-body">
            {step === 1 && (
              <>
                <div className="bot-message">
                  Merhaba! Hangi kategoride ürün arıyorsun?
                </div>
                <div className="bot-options">
                  <button onClick={() => handleCategorySelect("Smartphone")}>
                    📱 Akıllı Telefon
                  </button>
                  <button onClick={() => handleCategorySelect("Watches")}>
                    ⌚ Saatler
                  </button>
                  <button onClick={() => handleCategorySelect("Electronics")}>
                    💻 Elektronik
                  </button>
                  <button onClick={() => handleCategorySelect("Furnitures")}>
                    🛋️ Mobilya
                  </button>
                  <button onClick={() => handleCategorySelect("Collections")}>
                    👜 Koleksiyonlar
                  </button>
                  <button onClick={() => handleCategorySelect("Fashion")}>
                    👕 Moda
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="bot-message">
                  {filters.category} harika seçim! Hangi renk olsun?
                </div>

                {}
                <div
                  className="bot-options"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                  }}
                >
                  <button onClick={() => handleColorSelect("Siyah")}>
                    ⚫ Siyah
                  </button>
                  <button onClick={() => handleColorSelect("Beyaz")}>
                    ⚪ Beyaz
                  </button>
                  <button onClick={() => handleColorSelect("Kahverengi")}>
                    🟤 Kahverengi
                  </button>
                  <button onClick={() => handleColorSelect("Gri")}>
                    🔘 Gri
                  </button>
                  <button onClick={() => handleColorSelect("Gümüş")}>
                    💿 Gümüş
                  </button>
                  <button onClick={() => handleColorSelect("Altın")}>
                    🟡 Altın
                  </button>
                  <button onClick={() => handleColorSelect("Kırmızı")}>
                    🔴 Kırmızı
                  </button>
                  <button onClick={() => handleColorSelect("Mavi")}>
                    🔵 Mavi
                  </button>
                  <button onClick={() => handleColorSelect("Lacivert")}>
                    🌌 Lacivert
                  </button>
                  <button onClick={() => handleColorSelect("Yeşil")}>
                    🟢 Yeşil
                  </button>
                  <button onClick={() => handleColorSelect("Sarı")}>
                    🟨 Sarı
                  </button>
                  <button onClick={() => handleColorSelect("Turuncu")}>
                    🟠 Turuncu
                  </button>
                  <button onClick={() => handleColorSelect("Mor")}>
                    💜 Mor
                  </button>
                  <button onClick={() => handleColorSelect("Pembe")}>
                    🌸 Pembe
                  </button>
                </div>

                {}
                <div className="bot-options" style={{ marginTop: "8px" }}>
                  <button onClick={() => handleColorSelect("Farketmez")}>
                    🤷‍♂️ Rengi Farketmez
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="bot-message">
                  Son olarak bütçeni öğrenebilir miyim?
                </div>
                <div className="bot-options">
                  <button onClick={() => handlePriceSelect("0-100")}>
                    💵 0$ - 100$ arası
                  </button>
                  <button onClick={() => handlePriceSelect("100-500")}>
                    💰 100$ - 500$ arası
                  </button>
                  <button onClick={() => handlePriceSelect("500-1000")}>
                    💎 500$ - 1000$ arası
                  </button>
                  <button onClick={() => handlePriceSelect("1000+")}>
                    🏆 1000$+ (Premium)
                  </button>
                </div>
              </>
            )}

            {/* ADIM 4: SONUÇLARI LİSTELEME EKRANI */}
            {step === 4 && (
              <>
                <div className="bot-message">
                  İşte senin için bulduğum ürünler! 🔍
                </div>

                <div className="bot-product-list">
                  {filteredResults.length > 0 ? (
                    filteredResults.map((p) => (
                      <Link
                        to={`/product/${p._id}`}
                        className="bot-product-card"
                        key={p._id}
                      >
                        <img src={p.img[0]} alt={p.name} />
                        <div className="bot-product-info">
                          <h4>
                            {p.name.length > 20
                              ? p.name.substring(0, 20) + "..."
                              : p.name}
                          </h4>
                          <p>${p.price.current.toFixed(2)}</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div
                      style={{
                        textAlign: "center",
                        color: "#666",
                        fontSize: "14px",
                        marginTop: "10px",
                      }}
                    >
                      Maalesef bu kriterlere uygun ürün bulamadım. 😔
                    </div>
                  )}
                </div>

                <div className="bot-options" style={{ marginTop: "20px" }}>
                  <button
                    onClick={resetChat}
                    style={{ background: "#e94560", color: "white" }}
                  >
                    Baştan Başla
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {!isOpen && (
        <button className="chatbot-toggle-btn" onClick={() => setIsOpen(true)}>
          💬 Asistan
        </button>
      )}
    </div>
  );
};

export default Chatbot;
