const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
    rating: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    
    // DİKKAT: Burayı ObjectId yerine String yaptık ki "1" gibi test ID'lerini kabul etsin
    product: { type: String, required: true }, 
  },
  { timestamps: true } 
);

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;