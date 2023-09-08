const express = require('express');
const cors = require('cors');
const home = require("./routes/home");

require('dotenv').config();

const app = express();



app.use(cors());
app.use(express.json());
app.use("/home", home);

// Start the Express server
const port = process.env.PORT || 3004;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

