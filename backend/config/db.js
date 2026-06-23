const mongoose = require('mongoose');

// Imports connection variables and connects to database //
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODBURI,);

        console.log('MongoDB successfully connected.');
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;