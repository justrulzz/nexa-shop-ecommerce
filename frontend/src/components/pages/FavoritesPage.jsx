import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesProvider";
import ProductItem from "../components/Products/ProductItem";

const FavoritesPage = () => {
  const { favoriteItems } = useContext(FavoritesContext);

  return (
    <section className="favorites-page" style={{ padding: "50px 0" }}>
      <div className="container">
        <div className="section-title">
          <h2>Favori Ürünlerim</h2>
        </div>
        {favoriteItems.length > 0 ? (
          <div className="product-wrapper">
            <ul
              className="product-list"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "20px",
              }}
            >
              {favoriteItems.map((item) => (
                <ProductItem key={item.id} productItem={item} />
              ))}
            </ul>
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>Henüz favori ürününüz yok.</p>
        )}
      </div>
    </section>
  );
};

export default FavoritesPage;
