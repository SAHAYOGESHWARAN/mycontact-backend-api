const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const mongoUri = process.env.CONNECTION_STRING; // Make sure this is defined in your .env file

        if (!mongoUri) {
            throw new Error('CONNECTION_STRING is not defined in the environment variables');
        }

        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDb;
