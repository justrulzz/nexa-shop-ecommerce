const express = require("express");
const router = express.Router();
const Review = require("../models/Review.js"); // Yeni oluşturduğumuz modeli çağırdık

// Yorum Ekleme (POST - /api/reviews)
router.post("/", async (req, res) => {
  try {
    const { text, rating, user, product } = req.body;

    const newReview = new Review({
      text,
      rating,
      user,
      product,
    });

    await newReview.save();

    // Yorumu kaydedince kullanıcı adını da içine çekip (populate) frontend'e gönderiyoruz
    const populatedReview = await Review.findById(newReview._id).populate(
      "user",
      "username",
    );

    res.status(201).json(populatedReview);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Sunucu hatası." });
  }
});

// Ürüne Ait Yorumları Getirme (GET - /api/reviews/:productId)
router.get("/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    }).populate("user", "username");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Sunucu hatası." });
  }
});
// Yorum Silme (DELETE - /api/reviews/:reviewId)
router.delete("/:reviewId", async (req, res) => {
  try {
    // URL'den gelen ID'ye göre yorumu bul ve sil
    await Review.findByIdAndDelete(req.params.reviewId);
    res.status(200).json({ message: "Yorum başarıyla silindi." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Sunucu hatası." });
  }
});

module.exports = router;
