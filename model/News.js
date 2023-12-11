const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: String,
  link: String,
  description: String,
  imgUrl: String,
});

const News = mongoose.model("News", newsSchema);
module.exports = News;
