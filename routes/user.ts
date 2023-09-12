import express from "express";
import { createUser, deleteUser, getUserByName, updateUser } from "../controllers/user";

const router = express.Router();

// Use the correct HTTP methods for each route
router.post('/', createUser); // Create a new user
router.put('/:name', updateUser); // Update a user by name
router.get('/:name', getUserByName); // Get a user by name
router.delete('/:name', deleteUser); // Delete a user by name

export default router;
