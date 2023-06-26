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
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000) + 1;
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "648a112a2f5f840c7c17d72b",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos, nulla. Natus pariatur perferendis, ut sint dicta provident quam illum recusandae reprehenderit odio aspernatur repellendus, placeat, fuga nemo nihil itaque temporibus!",
      price,
      images: [
        {
          url: "https://res.cloudinary.com/dvbcszwxc/image/upload/v1687440111/YelpCamp/pgqg1opjr5egcu4yiyig.jpg",
          filename: "YelpCamp/pgqg1opjr5egcu4yiyig",
        },
        {
          url: "https://res.cloudinary.com/dvbcszwxc/image/upload/v1687440111/YelpCamp/btqtayr8humf6uxgpm0k.jpg",
          filename: "YelpCamp/btqtayr8humf6uxgpm0k",
        },
        {
          url: "https://res.cloudinary.com/dvbcszwxc/image/upload/v1687440110/YelpCamp/yxxileti52xvswiwtv6v.jpg",
          filename: "YelpCamp/yxxileti52xvswiwtv6v",
        },
        {
          url: "https://res.cloudinary.com/dvbcszwxc/image/upload/v1687440110/YelpCamp/uoh69rjj9wf7qnccwtvh.jpg",
          filename: "YelpCamp/uoh69rjj9wf7qnccwtvh",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
