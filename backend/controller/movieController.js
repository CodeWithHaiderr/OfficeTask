const axios = require('axios');

const getMovies = async (req, res) => {
    try {
        const response = await axios.get("https://dummyapi.online/api/movies");
        res.json(response.data);

    } catch (error) {
        console.error("Error fetching movies", error);
    }
}
module.exports= getMovies