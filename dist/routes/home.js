"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
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
    return res.json(jsonResponse);
});
exports.default = router;
