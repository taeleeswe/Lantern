const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000) + 1;
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      //YOUR USER ID
      author: "648a112a2f5f840c7c17d72b",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos, nulla. Natus pariatur perferendis, ut sint dicta provident quam illum recusandae reprehenderit odio aspernatur repellendus, placeat, fuga nemo nihil itaque temporibus!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dvbcszwxc/image/upload/v1687753097/YelpCamp/ytaoxh4bstpf0ungsnea.jpg",
          filename: "YelpCamp/ytaoxh4bstpf0ungsnea",
        },
        {
          url: "https://res.cloudinary.com/dvbcszwxc/image/upload/v1687753100/YelpCamp/kezlr0py9vfaewgqms6y.jpg",
          filename: "YelpCamp/kezlr0py9vfaewgqms6y",
        },
        {
          url: "https://res.cloudinary.com/dvbcszwxc/image/upload/v1687542270/YelpCamp/yy60evuv7irzex7hscmo.jpg",
          filename: "YelpCamp/yy60evuv7irzex7hscmo",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
