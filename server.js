require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();

// Middleware
app.set("view engine", "ejs"); // Use EJS
app.use(express.static("public")); // Serve static files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://crud:Crud@cluster0.mxla6.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection error:", err));


  app.get("/", (req, res) => {
    res.redirect("/posts");
  });
// Routes
const postRoutes = require("./route/posts");
app.use("/posts", postRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
