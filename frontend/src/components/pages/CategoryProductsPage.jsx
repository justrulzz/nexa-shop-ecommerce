import { useState, useEffect, useContext } from "react"; // useContext eklendi
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../../context/CartProvider"; // CartContext eklendi
import "./CategoryProductsPage.css";

const CategoryProductsPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const { addToCart } = useContext(CartContext); // addToCart fonksiyonunu çektik
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/products`);
        if (response.ok) {
          const data = await response.json();
          const filteredProducts = data.filter((product) => {
            const dbCategory =
              typeof product.category === "object"
                ? product.category.name
                : product.category;
            return (
              dbCategory?.trim().toLowerCase() ===
              categoryName?.trim().toLowerCase()
            );
          });
          setProducts(filteredProducts);
        }
      } catch (error) {
        console.log("Hata:", error);
      }
    };
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setVisibleCount(8);
  }, [categoryName, apiUrl]);

  const handleLoadMore = () => {
    setVisibleCount(16);
  };

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="category-products-container">
      <div className="container">
        <h1 className="page-title">{categoryName} Ürünleri</h1>

        <div className="product-grid">
          {visibleProducts.length > 0 ? (
            visibleProducts.map((p) => (
              <div className="product-card" key={p._id}>
                <div className="product-image">
                  <Link to={`/product/${p._id}`}>
                    <img src={p.img[0]} alt={p.name} />
                  </Link>
                </div>
                <div className="product-info">
                  <Link to={`/product/${p._id}`} className="product-title">
                    {p.name}
                  </Link>
                  <div className="product-price">
                    <strong>${p.price.current.toFixed(2)}</strong>
                  </div>

                  {/* SEPETE EKLE BUTONU GÜNCELLENDİ */}
                  <button
                    className="add-to-cart-btn"
                    onClick={() =>
                      addToCart({
                        ...p,
                        id: p._id, // Bazı sepet yapıları _id yerine id bekler, sağlama alalım
                        quantity: 1,
                        price: {
                          newPrice: p.price.current,
                          oldPrice: p.price.current + 50, // Eğer sepet sayfasında hata verirse diye ekledik
                        },
                        img: {
                          singleImage: p.img[0], // Resmin görünmesini sağlayan kritik satır burası!
                          thumbs: p.img,
                        },
                      })
                    }
                  >
                    Sepete Ekle
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-product"></p>
          )}
        </div>

        {products.length > visibleCount && visibleCount < 16 && (
          <div className="load-more-container">
            <button className="load-more-btn" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProductsPage;
