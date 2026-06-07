const mongoose = require('mongoose');
const User = require('../models/user.model');

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.getOneUser = async (req, res) => {
    try {
        const user = await User.findById({
            _id: req.params.id,
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate({
            _id: req.params.id
        }, {
            $set: req.body
        }, {
            new: true
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete({
            _id: req.params.id,
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};