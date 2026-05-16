import { useState } from "react";

import { message } from "antd"; // Bildirimler için antd kullanabiliriz

const ReviewForm = ({ singleProduct, setReviews }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleRatingChange = (e, newRating) => {
    e.preventDefault();
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      return message.error("Yorum yapmak için giriş yapmalısınız!");
    }
    if (rating === 0) {
      return message.error("Lütfen bir puan seçin!");
    }
    if (review.trim().length < 10) {
      return message.error("Yorumunuz en az 10 karakter olmalıdır!");
    }

    // GÜVENLİK KONTROLÜ: singleProduct verisi gelmiş mi?
    if (!singleProduct) {
      return message.error(
        "Ürün bilgisi bulunamadı, lütfen sayfayı yenileyin.",
      );
    }

    // HEM id HEM _id DESTEĞİ (Dummy data veya Gerçek MongoDB verisi için)
    const productId = singleProduct._id || singleProduct.id;
    const userId = user._id || user.id;

    const formData = {
      text: review,
      rating: rating,
      user: userId,
      product: productId,
    };

    console.log("Gönderilen Veri:", formData); // Hangi verinin gittiğini konsolda görelim

    try {
      const res = await fetch(`${apiUrl}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const newReview = await res.json();
        setReviews((prev) => [...prev, newReview]);
        setReview("");
        setRating(0);
        message.success("Yorumunuz başarıyla eklendi.");
      } else {
        message.error("Bir hata oluştu.");
      }
    } catch (error) {
      console.log(error);
      message.error("Sunucu hatası.");
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      {}
      {}
      <div className="comment-form-rating">
        <label>
          Your rating <span className="required">*</span>
        </label>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <a
              key={star}
              href="#"
              className={`star ${rating >= star ? "active" : ""}`}
              onClick={(e) => handleRatingChange(e, star)}
            >
              <i className="bi bi-star-fill"></i>
            </a>
          ))}
        </div>
      </div>
      <div className="comment-form-comment form-comment">
        <label htmlFor="comment">
          Your review <span className="required">*</span>
        </label>
        <textarea
          id="comment"
          cols="50"
          rows="10"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
      </div>
      <div className="form-submit">
        <input type="submit" className="btn submit" value="Submit" />
      </div>
    </form>
  );
};

export default ReviewForm;
