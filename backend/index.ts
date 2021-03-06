import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import auth from "./middleware/auth";
import { errorLogger, errorResponder } from "./middleware/errorhandler";

import profileRoutes from "./routes/profileRoute";
import userRoutes from "./routes/usersRoute";
import favoritesRoutes from "./routes/favoritesRoute";
import spoonacularRoutes from "./routes/spoonacularRoute";

import {} from "./environment";

dotenv.config();

mongoose.connect(`${process.env.CONNECTION_URL}`);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "https://react-recipe-app-kappa.vercel.app"
    ],
  })
);

// Paths
app.get("/", (req, res) => {
  res.send({ message: "Welcome to the backend" });
});

app.use("/users", userRoutes);
app.use("/spoonacular", spoonacularRoutes);
app.use("/profile", auth, profileRoutes);
app.use("/favorites", auth, favoritesRoutes);

// Error handlers
app.use(errorResponder);
app.use(errorLogger);


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`It's alive on port: ${PORT}`));
