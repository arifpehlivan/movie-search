import express from "express";
import fetch from "node-fetch";
import nodeCache from "node-cache";
import dotenv from "dotenv";
import cors from "cors";

const movieCache = new nodeCache({ stdTTL: 30 });
const app = express();
const port = 3000;
dotenv.config();
app.use(cors());

app.get("/api/search/:keyword", (req, res) => {
    var movieUrl = `https://www.omdbapi.com/?s=${req.params.keyword}&apikey=${process.env.API_KEY}`;
    if (movieCache.has(`${req.params.keyword}`)) {
        console.log("Getting from cache");
        console.log(movieUrl);
        console.log(req.params.keyword);
        return res.send(movieCache.get(`${req.params.keyword}`));

    } else {
        try {
            fetch(movieUrl)
                .then((response) => response.json())
                .then((json) => {
                    movieCache.set(`${req.params.keyword}`, json);
                    console.log("Getting from api");
                    res.send(json);
                })
        } catch (error) {
            res.send.status(404);
            console.log(error);
        }
    }
})

app.get("/api/clear", (req, res) => {
    movieCache.flushAll();
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})