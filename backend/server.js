const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const movieRoutes = require('./routes/movies.js')


const app = express();
const PORT = 3000;

const corsOption = {
    origin: 'http://localhost:5173/',
}


app.use(cors());
app.use(bodyParser.json());




app.use('/api/movies', movieRoutes);

app.listen(PORT, () => {
    console.log('Server running on port ${PORT}')
})