const express = require("express");
const News = require("../model/News");
const { parse } = require("rss-to-json");
const cron = require("node-cron");

function extractNewsInfo(newsItem) {
  const title = newsItem.title;
  const url = newsItem.link;
  const imgUrlMatch = newsItem.content.match(
    /<img[^>]*src\s*=\s*["']?([^"']*)["']?[^>]*>/
  );
  const imgUrl = imgUrlMatch ? imgUrlMatch[1] : null;

  return {
    title,
    url,
    imgUrl,
  };
}

const addNews = async (url) => {
  try {
    const rss = await parse(url);
    const newsList = rss.items.map(extractNewsInfo);
    const addedNews = await News.create(newsList);
  } catch (error) {
    console.log(`Error:${error}`);
  }
};

const newsUrls = [
  "https://www.newsofnepal.com/feed/",
  "https://nagariknews.nagariknetwork.com/feed",
  "https://kathmandutribune.com/feed/",
  "https://abhiyandaily.com/abhiyanrss",
];

newsUrls.forEach(async (url) => {
  await addNews(url);
  // Schedule the task to run every 30 minutes
  cron.schedule("*/30 * * * *", async () => {
    await addNews(url);
  });
});

const getAllNews = async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (error) {
    res.status(400).json({ msg: `${error}` });
  }
};

module.exports = { addNews, getAllNews };
