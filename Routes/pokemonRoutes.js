const express = require("express");
const {
  getPokemons,
  createPokemon,
  getNodeById,
  updatePokemon,
  DeletePokemon,
} = require("../controllers/pokemonControl");
const { protect } = require("../Middlewares/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getPokemons);
router.route("/create").post(protect, createPokemon);
router
  .route("/:id")
  .get(getNodeById)
  .put(protect, updatePokemon)
  .delete(protect, DeletePokemon);
module.exports = router;
