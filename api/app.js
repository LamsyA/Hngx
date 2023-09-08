const express = require('express');
require('dotenv').config();

const app = express();


app.get('/', (req, res) => {
    const slack_name = req.query.slack_name;
    const track = req.query.track;

    // Get the current date and time
    const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });
    const utcTime = new Date().toISOString();

    //  the JSON response
    const jsonResponse = {
        slack_name,
        current_day: currentDay,
        utc_time: utcTime,
        track,
        github_file_url: 'https://github.com/LamsyA/Hngx',
        github_repo_url: 'https://github.com/lamsya',
        status_code: 200,
    };

    res.json(jsonResponse);
});

// Start the Express server
const port = process.env.PORT || 3004;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;