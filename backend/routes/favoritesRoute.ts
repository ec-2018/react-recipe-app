import express from "express";
import {
  addFavorite,
  getFavorites,
  removeFavorites,
  addEmptyList,
  removeList,
  renameList,
} from "../controllers/favoritesController";

const router = express.Router();

router.get("/getFavorites", getFavorites);
router.put("/addFavorite", addFavorite);
router.delete("/removeFavorites", removeFavorites);
router.put("/addEmptyList", addEmptyList);
router.delete("/removeList/:listId", removeList);
router.put("/renameList/:listId", renameList);

export default router;
