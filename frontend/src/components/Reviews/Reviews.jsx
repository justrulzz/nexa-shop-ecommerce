import { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";
import { message } from "antd"; // Silme bildirimi için
import "./Reviews.css";

const Reviews = ({ active, singleProduct }) => {
  const [reviews, setReviews] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // Şu an giriş yapmış olan kullanıcıyı alıyoruz ki sadece kendi yorumunu silebilsin
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getReviews = async () => {
      try {
        const productId = singleProduct._id || singleProduct.id;
        const res = await fetch(`${apiUrl}/api/reviews/${productId}`);
        if (res.ok) {
          const data = await res.json();
          setReviews(data);
        }
      } catch (error) {
        console.log("Yorumlar getirilemedi:", error);
      }
    };
    if (singleProduct) {
      getReviews();
    }
  }, [apiUrl, singleProduct]);

  // Yorum Silme Fonksiyonu
  const handleDelete = async (reviewId) => {
    // Kullanıcıya emin olup olmadığını soralım
    if (!window.confirm("Bu yorumu silmek istediğinize emin misiniz?")) return;

    try {
      const res = await fetch(`${apiUrl}/api/reviews/${reviewId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        message.success("Yorum başarıyla silindi!");
        // Ekranı yenilemeye gerek kalmadan silinen yorumu listeden uçuruyoruz
        setReviews((prev) => prev.filter((review) => review._id !== reviewId));
      } else {
        message.error("Yorum silinirken bir hata oluştu.");
      }
    } catch (error) {
      console.log(error);
      message.error("Sunucu hatası.");
    }
  };

  return (
    <div className={`tab-panel-reviews content ${active}`}>
      <h3>{reviews.length} reviews for {singleProduct.name || "Product"}</h3>
      <div className="comments">
        <ol className="comment-list">
          {reviews.map((review) => (
            <li key={review._id} className="comment-item">
              <div className="comment-avatar">
                {/* YENİ AVATAR: Kullanıcının adına göre otomatik baş harf oluşturur.
                  Örn: sametgulhan için şık bir "SG" ikonu üretir.
                */}
                <img 
                  src={`https://ui-avatars.com/api/?name=${review.user?.username || "Anonim"}&background=random&color=fff`} 
                  alt={review.user?.username} 
                />
              </div>
              <div className="comment-text">
                <ul className="comment-star">
                  {[...Array(5)].map((_, index) => (
                    <li key={index}>
                      <i className={`bi bi-star${index < review.rating ? "-fill" : ""}`}></i>
                    </li>
                  ))}
                </ul>
                <div className="comment-meta">
                  <strong>{review.user?.username || "Anonim"}</strong>
                  <span> - </span>
                  <time>{new Date(review.createdAt).toLocaleDateString()}</time>
                </div>
                <div className="comment-description">
                  <p>{review.text}</p>
                </div>

                {/* SİL BUTONU: Sadece yorumun sahibi login ise görünür */}
                {currentUser && (
                  currentUser._id === (review.user?._id || review.user) || 
                  currentUser.id === (review.user?._id || review.user)
                ) && (
                  <button 
                    onClick={() => handleDelete(review._id)} 
                    style={{
                      color: "red", 
                      border: "none", 
                      background: "none", 
                      cursor: "pointer", 
                      fontSize: "14px",
                      padding: "0",
                      marginTop: "10px",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px"
                    }}
                  >
                    <i className="bi bi-trash"></i> Sil
                  </button>
                )}

            
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="review-form-wrapper">
        <h2>Add a review</h2>
        <ReviewForm singleProduct={singleProduct} setReviews={setReviews} />
      </div>
    </div>
  );
};

export default Reviews;