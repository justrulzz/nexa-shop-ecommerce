import Breadcrumb from "./Breadcrumb/Breadcrumb";
import Gallery from "./Gallery/Gallery";
import Info from "./Info/Info";
import Tabs from "./Tabs/Tabs";
import "./ProductDetails.css";


const ProductDetails = ({ singleProduct }) => {
  return (
    <section className="single-product">
      <div className="container">
        <div className="single-product-wrapper">
          <Breadcrumb singleProduct={singleProduct} />
          <div className="single-content">
            <main className="site-main">
              {/* Dinamik veriyi buraya aktardık */}
              <Gallery singleProduct={singleProduct} />
              <Info singleProduct={singleProduct} />
            </main>
          </div>
          {/* singleProduct'ı Tabs bileşenine gönderiyoruz */}
          <Tabs singleProduct={singleProduct} />
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;