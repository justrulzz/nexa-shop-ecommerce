import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "../ProductDetails/ProductDetails";
import { Spin } from "antd";
import productsData from "../../data.json"; 

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      // JSON'da var mı diye bak (Ana sayfa ürünleri)
      const localProduct = productsData.find((p) => p.id === Number(id));
      if (localProduct) {
        setSingleProduct(localProduct);
        setLoading(false);
        return; 
      }

      // MongoDB'den çek (Arama motoru ürünleri)
      try {
        const res = await fetch(`${apiUrl}/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();

          // DÜZELTME: Veriyi Info.jsx ve Gallery.jsx'in beklediği kılığa sokuyoruz
          const adaptedProduct = {
            ...data,
            price: {
              newPrice: data.price?.current || 0,
              oldPrice: (data.price?.current || 0) + 50 
            },
            img: {
              singleImage: data.img[0],
              thumbs: data.img
            }
          };

          setSingleProduct(adaptedProduct);
        }
      } catch (error) {
        console.log("Hata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, apiUrl]);

  if (loading) return <div style={{ textAlign: "center", padding: "100px 0" }}><Spin size="large" /></div>;
  if (!singleProduct) return <div style={{ textAlign: "center", padding: "100px 0" }}><h2>Ürün Bulunamadı!</h2></div>;

  return <ProductDetails singleProduct={singleProduct} />;
};

export default ProductDetailsPage;