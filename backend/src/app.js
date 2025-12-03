import express from "express";

const app = express(); // Creating an Express application instance

app.use(express.json()); // Middleware to parse JSON request bodies

// Middleware and route configurations would go here
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";




app.use("/api/v1/posts", postRoutes); // Using the post routes for handling post-related API requests
//example route: http://localhost:4000/api/v1/posts/post

app.use("/api/v1/users", userRoutes); // Using the user routes for handling user-related API request
//example route: http://localhost:4000/api/v1/users/register


export default app;
