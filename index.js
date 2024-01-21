const express = require("express");
const urlRouter = require("./routes/url");
const connectDB = require("./connect");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

connectDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("connected to mongodb")
);

app.use(express.json());

app.get("/:shortID", async (req, res) => {
  const shortId = req.params.shortID;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  res.redirect(entry.redirectURL)
});

app.use("/url", urlRouter);

app.listen(PORT, () => {
  console.log(`listening to http://localhost:${PORT}`);
});
