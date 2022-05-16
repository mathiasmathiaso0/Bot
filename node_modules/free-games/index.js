const axios = require("axios");

module.exports = (locale = "en", country = "US") => {
    return axios.get(`https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=${locale}&country=${country}`)
        .then(d => d["data"]["data"]["Catalog"]["searchStore"]["elements"]);
}