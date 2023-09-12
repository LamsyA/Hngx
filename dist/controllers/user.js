"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserByName = exports.deleteUser = exports.createUser = void 0;
const users_1 = __importDefault(require("../models/users"));
const validator_1 = __importDefault(require("validator"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, age } = req.body;
        if (!validator_1.default.isEmail(req.body.email)) {
            return res.status(400).json({ status: "failed", error: "invaild email format" });
        }
        // Validate the name field (must be a string)
        if (typeof name !== 'string') {
            return res.status(400).json({ status: "failed", error: 'Name must be a string.' });
        }
        // Validate the age field (must be a positive integer)
        if (!validator_1.default.isInt(age.toString(), { min: 1 })) {
            return res.status(400).json({ status: "failed", error: 'Age must be a positive integer.' });
        }
        const user = new users_1.default({ name, age, email });
        yield user.save();
        res.status(201).json({ status: "success", user });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: 'An error occurred while creating the user.' });
    }
});
exports.createUser = createUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dynamicName = req.params.name;
        // Ensure that the dynamic name parameter is a string
        if (typeof dynamicName !== 'string') {
            return res.status(400).json({ status: "failed", error: 'Name must be a string.' });
        }
        const user = yield users_1.default.findOneAndDelete({ name: dynamicName });
        if (!user) {
            return res.status(404).json({ error: 'user not found.' });
        }
        res.status(200).json({ status: "success", message: "user succefully deleted" });
    }
    catch (error) {
        res.status(500).json({ status: "failed", Error: error });
    }
});
exports.deleteUser = deleteUser;
// Get user by a dynamic name parameter
const getUserByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dynamicName = req.params.name;
        // Validate the name parameter (must be a string)
        if (typeof dynamicName !== 'string') {
            return res.status(400).json({ status: "failed", error: 'Name must be a string.' });
        }
        // Find the user by the dynamic name
        const user = yield users_1.default.findOne({ name: dynamicName });
        if (!user) {
            return res.status(404).json({ status: 'failed', error: 'User not found.' });
        }
        res.status(200).json({ status: "success", user });
    }
    catch (error) {
        res.status(500).json({ status: "failed", error });
    }
});
exports.getUserByName = getUserByName;
// Update a user by a dynamic name parameter
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, age } = req.body;
        const dynamicName = req.params.name;
        // Validate the email field
        if (!validator_1.default.isEmail(email)) {
            return res.status(400).json({ status: "failed", error: "Invalid email format" });
        }
        // Validate the name parameter (must be a string)
        if (typeof dynamicName !== 'string') {
            return res.status(400).json({ status: "failed", error: 'Name must be a string.' });
        }
        // Validate the age field (must be a positive integer)
        if (!validator_1.default.isInt(age.toString(), { min: 1 })) {
            return res.status(400).json({ status: "failed", error: 'Age must be a positive integer.' });
        }
        // Find the user by the dynamic name and update the fields
        const updatedUser = yield users_1.default.findOneAndUpdate({ name: dynamicName }, { name, age, email }, { new: true } // Return the updated user
        );
        if (!updatedUser) {
            return res.status(404).json({ status: 'failed', error: 'User not found.' });
        }
        res.status(200).json({ status: "success", user: updatedUser });
    }
    catch (error) {
        res.status(500).json({ status: "failed", error });
    }
});
exports.updateUser = updateUser;
