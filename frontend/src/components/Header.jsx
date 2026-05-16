import { useContext, useState } from "react";
import { CartContext } from "../context/CartProvider.jsx";
import { FavoritesContext } from "../context/FavoritesProvider.jsx";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = ({ setIsSearchShow }) => {
  const { cartItems } = useContext(CartContext);
  const user = localStorage.getItem("user");
  const { favoriteItems = [], toggleFavorite = () => {} } =
    useContext(FavoritesContext) || {};

  const location = useLocation();
  const pathname = location?.pathname || "/";

  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  return (
    <header>
      <div className="global-notification">
        <p>
          SUMMER SALE FOR ALL SWIM SUITS AND FREE EXPRESS INTERNATIONAL DELIVERY
          - OFF 50%!
          <Link to="/shop"> SHOP NOW</Link>
        </p>
      </div>
      <div className="header-row">
        <div className="container">
          <div className="header-wrapper">
            <div className="header-mobile">
              <i className="bi bi-list" id="btn-menu"></i>
            </div>
            
            {}
            <div className="header-left">
              <Link to="/" className="logo-text">
                NEXASHOP
              </Link>
            </div>

            <div className="header-center" id="sidebar">
              <nav className="navigation">
                <ul className="menu-list">
                  <li className="menu-list-item">
                    <Link
                      to="/"
                      className={`menu-link ${pathname === "/" ? "active" : ""}`}
                    >
                      Home
                    </Link>
                  </li>

                  {/* SHOP & MEGA MENU BAŞLANGIÇ */}
                  <li className="menu-list-item megamenu-wrapper">
                    <Link
                      to="/shop"
                      className={`menu-link ${pathname === "/shop" ? "active" : ""}`}
                    >
                      Shop <i className="bi bi-chevron-down"></i>
                    </Link>
                    <div className="menu-dropdown-wrapper">
                      <div className="menu-dropdown-megamenu">
                        <div className="megamenu-links">
                          <div className="megamenu-column">
                            <strong className="megamenu-products-title">
                              SHOP STYLE
                            </strong>
                            <ul className="megamenu-menu-list">
                              <li>
                                <a href="#">Shop Standard</a>
                              </li>
                              <li>
                                <a href="#">Shop Full</a>
                              </li>
                              <li>
                                <a href="#">Shop Only Categories</a>
                              </li>
                              <li>
                                <a href="#">Shop Image Categories</a>
                              </li>
                              <li>
                                <a href="#">Shop Sub Categories</a>
                              </li>
                              <li>
                                <a href="#">Shop List</a>
                              </li>
                              <li>
                                <a href="#">Hover Style 1</a>
                              </li>
                            </ul>
                          </div>
                          <div className="megamenu-column">
                            <strong className="megamenu-products-title">
                              FILTER LAYOUT
                            </strong>
                            <ul className="megamenu-menu-list">
                              <li>
                                <a href="#">Sidebar</a>
                              </li>
                              <li>
                                <a href="#">Filter Side Out</a>
                              </li>
                              <li>
                                <a href="#">Filter Dropdown</a>
                              </li>
                              <li>
                                <a href="#">Filter Drawer</a>
                              </li>
                            </ul>
                          </div>
                          <div className="megamenu-column">
                            <strong className="megamenu-products-title">
                              SHOP LOADER
                            </strong>
                            <ul className="megamenu-menu-list">
                              <li>
                                <a href="#">Shop Pagination</a>
                              </li>
                              <li>
                                <a href="#">Shop Infinity</a>
                              </li>
                              <li>
                                <a href="#">Shop Load More</a>
                              </li>
                              <li>
                                <a href="#">Cart Modal</a>
                              </li>
                              <li>
                                <a href="#">Cart Drawer</a>
                              </li>
                              <li>
                                <a href="#">Cart Page</a>
                              </li>
                            </ul>
                          </div>
                          <div className="megamenu-single">
                            <img src="/img/mega-menu.jpg" alt="Mega Menu" />
                            <h3 className="megamenu-single-title">
                              JOIN THE LAYERING GANG
                            </h3>
                            <p className="megamenu-single-subtitle">
                              Suspendeisse faucibus nunc et pellentesque
                            </p>
                            <a href="#" className="megamenu-single-button">
                              SHOP NOW
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  {/* SHOP & MEGA MENU BİTİŞ */}

                  <li className="menu-list-item">
                    <Link
                      to="/blog"
                      className={`menu-link ${pathname === "/blog" ? "active" : ""}`}
                    >
                      Blog
                    </Link>
                  </li>
                  <li className="menu-list-item">
                    <Link
                      to="/contact"
                      className={`menu-link ${pathname === "/contact" ? "active" : ""}`}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="header-right">
              <div className="header-right-links">
                <div className="header-account">
                  <Link to="/auth">
                    <i className="bi bi-person"></i>
                  </Link>
                  <button
                    className="search-button"
                    onClick={() => setIsSearchShow(true)}
                  >
                    <i className="bi bi-search"></i>
                  </button>

                  <div
                    className="header-favorites"
                    style={{ position: "relative" }}
                  >
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsFavoritesOpen(!isFavoritesOpen);
                      }}
                    >
                      <i
                        className="bi bi-heart"
                        style={{ fontSize: "20px" }}
                      ></i>
                      {favoriteItems.length > 0 && (
                        <span className="header-cart-count">
                          {favoriteItems.length}
                        </span>
                      )}
                    </a>

                    {/* Favori Listesi Dropdown */}
                    {isFavoritesOpen && (
                      <div
                        className="favorites-dropdown"
                        style={{
                          position: "absolute",
                          top: "150%",
                          right: 0,
                          width: "250px",
                          backgroundColor: "#fff",
                          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                          zIndex: 50,
                          padding: "10px",
                          borderRadius: "4px",
                        }}
                      >
                        {favoriteItems.length === 0 ? (
                          <p>Favori yok</p>
                        ) : (
                          favoriteItems.map((item) => (
                            <div
                              key={item.id}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "5px",
                              }}
                            >
                              <span>{item.name}</span>
                              <button
                                onClick={() => toggleFavorite(item)}
                                style={{
                                  background: "none",
                                  color: "red",
                                  marginTop: 0,
                                }}
                              >
                                X
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>

                  <div className="header-cart">
                    <Link to="/cart" className="header-cart-link">
                      <i className="bi bi-bag"></i>
                      <span className="header-cart-count">
                        {cartItems.length}
                      </span>
                    </Link>
                  </div>
                  {user && (
                    <button
                      className="search-button"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Çıkış yapmak istediğinize emin misiniz?",
                          )
                        ) {
                          localStorage.removeItem("user");
                          window.location.href = "/";
                        }
                      }}
                    >
                      <i className="bi bi-box-arrow-right"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;