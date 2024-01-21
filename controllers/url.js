const URL = require("../models/url");
// const { shortid } = require("shortid");
const shortId = require('shortid')

async function handleGenerateNewShortURL(req, res) {
    const body = req.body

  if (!req.body) return res.status(400).json({ error: "url is required" });

  console.log(body.url, "===================");

  const shortID = shortId.generate(8)

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortID });
}

module.exports = {handleGenerateNewShortURL};
