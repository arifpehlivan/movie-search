import express from "express";
import fetch from "node-fetch";
import nodeCache from "node-cache";
import dotenv from "dotenv";

const movieCache = new nodeCache({ stdTTL: 30 });
const app = express();
const port = 3000;
// var movieUrl = `https://www.omdbapi.com/?s=star&apikey=`;
dotenv.config();

console.log(process.env.API_KEY);

///api/search?keyword=foo
app.get("/api/search/:keyword", (req, res) => {
    var movieUrl = `https://www.omdbapi.com/?s=${req.params.keyword}&apikey=${process.env.API_KEY}`;
    if (movieCache.has("movie")) {
        console.log("Getting from cache");
        console.log(movieUrl);
        console.log(req.params.keyword);
        return res.send(movieCache.get("movie"));

    } else {
        fetch(movieUrl)
            .then((response) => response.json())
            .then((json) => {
                movieCache.set("movie", json);
                console.log("Getting from api");
                res.send(json);
            })
    }

})

app.get("/api/clear",(req,res)=>{
    movieCache.flushAll();
    res.send(movieCache.getStats())
})

// app.get("/stats",(req,res)=>{
//     res.send(movieCache.getStats())
// })

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})