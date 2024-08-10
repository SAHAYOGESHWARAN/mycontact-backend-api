const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

// Connect to the database
connectDb();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Example route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Routes
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Use the error handler middleware after all routes
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
