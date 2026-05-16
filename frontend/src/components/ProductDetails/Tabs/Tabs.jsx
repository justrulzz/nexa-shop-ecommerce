import { useState } from "react";
import Reviews from "../../Reviews/Reviews"; 
import "./Tabs.css";

// singleProduct'ı prop olarak karşılıyoruz
const Tabs = ({ singleProduct }) => {
  const [activeTab, setActiveTab] = useState("desc");

  const handleTabClick = (e, tab) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  return (
    <div className="single-tabs">
      <ul className="tab-list">
        <li>
          <a
            href="#"
            className={`tab-button ${activeTab === "desc" ? "active" : ""}`}
            data-id="desc"
            onClick={(e) => handleTabClick(e, "desc")}
          >
            Description
          </a>
        </li>
        <li>
          <a
            href="#"
            className={`tab-button ${activeTab === "info" ? "active" : ""}`}
            data-id="info"
            onClick={(e) => handleTabClick(e, "info")}
          >
            Additional information
          </a>
        </li>
        <li>
          <a
            href="#"
            className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
            data-id="reviews"
            onClick={(e) => handleTabClick(e, "reviews")}
          >
            Reviews
          </a>
        </li>
      </ul>

      <div className="tab-panel">
        {/* DESCRIPTION İÇERİĞİ */}
        <div
          className={`tab-panel-descriptions content ${
            activeTab === "desc" ? "active" : ""
          }`}
          id="desc"
        >
          <p>
            Quisque varius diam vel metus mattis, id aliquam diam rhoncus. Proin
            vitae magna in dui finibus malesuada et at nulla. Morbi elit ex,
            viverra vitae ante vel, blandit feugiat ligula. Fusce fermentum
            iaculis nibh, at sodales leo maximus a. Nullam ultricies sodales
            nunc, in pellentesque lorem mattis quis. Cras imperdiet est in nunc
            tristique lacinia. Nullam aliquam mauris eu accumsan tincidunt.
            Suspendisse velit ex, aliquet vel ornare vel, dignissim a tortor.
          </p>

          <p>
            Quisque varius diam vel metus mattis, id aliquam diam rhoncus. Proin
            vitae magna in dui finibus malesuada et at nulla. Morbi elit ex,
            viverra vitae ante vel, blandit feugiat ligula. Fusce fermentum
            iaculis nibh, at sodales leo maximus a. Nullam ultricies sodales
            nunc, in pellentesque lorem mattis quis. Cras imperdiet est in nunc
            tristique lacinia. Nullam aliquam mauris eu accumsan tincidunt.
            Suspendisse velit ex, aliquet vel ornare vel, dignissim a tortor.
          </p>
        </div>

        {/* ADDITIONAL INFORMATION İÇERİĞİ */}
        <div
          className={`tab-panel-information content ${
            activeTab === "info" ? "active" : ""
          }`}
          id="info"
        >
          <h3>Additional information</h3>
          <table>
            <tbody>
            <tr>
                <th>Color</th>
                <td>
                  <p>
                    {singleProduct?.colors?.length > 0 
                      ? singleProduct.colors.join(", ") 
                      : "Renk bilgisi girilmedi"}
                  </p>
                </td>
              </tr>
             {/* Tabs.jsx içinde ilgili yere bunu yapıştırabilirsin */}
{singleProduct.sizes && singleProduct.sizes.length > 0 && (
  <tr>
    <th>Size</th>
    <td>
      <p>
        {/* Veritabanındaki bedenleri aralarına virgül koyarak yan yana yazar */}
        {singleProduct.sizes.join(", ")}
      </p>
    </td>
  </tr>
)}
            </tbody>
          </table>
        </div>

        {/* REVIEWS İÇERİĞİ */}
        {/* Reviews bileşenine "active" prop'unun yanına singleProduct'ı da gönderiyoruz */}
        <Reviews
          active={activeTab === "reviews" ? "content active" : "content"}
          singleProduct={singleProduct}
        />
      </div>
    </div>
  );
};

export default Tabs;