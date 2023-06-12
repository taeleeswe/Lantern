const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

CampgroundSchema.post("findOndAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.review,
      },
    });
  }
});

module.exports = mongoose.model("Campground", CampgroundSchema);
