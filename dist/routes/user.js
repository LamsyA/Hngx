"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
// Use the correct HTTP methods for each route
router.post('/', user_1.createUser); // Create a new user
router.put('/:name', user_1.updateUser); // Update a user by name
router.get('/:name', user_1.getUserByName); // Get a user by name
router.delete('/:name', user_1.deleteUser); // Delete a user by name
exports.default = router;
