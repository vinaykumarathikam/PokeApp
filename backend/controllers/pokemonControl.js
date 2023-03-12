const expressAsyncHandler = require("express-async-handler");
const Pokemon = require("../models/pokemonModel");

const getPokemons = expressAsyncHandler(async (req, res) => {
  const pokemons = await Pokemon.find({ user: req.user._id });
  res.json(pokemons);
});

const createPokemon = expressAsyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title) {
    res.status(400);
    throw new Error("Please fill the fileds");
    return;
  } else {
    const poke = new Pokemon({
      user: req.user._id,
      title,
      content: [],
    });
    const createPokemon = await poke.save();
    res.status(201).json(createPokemon);
  }
});

const getNodeById = expressAsyncHandler(async (req, res) => {
  const data = await Pokemon.findById(req.params.id);
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ message: "Pokemon not found" });
  }
  res.json(data);
});

const updatePokemon = expressAsyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const data = await Pokemon.findById(req.params.id);
  if (data.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }
  if (data) {
    data.title = title;
    data.content = content;
    const updatedPokemon = await data.save();
    res.json(updatedPokemon);
  } else {
    res.status(404);
    throw new Error("Pokemon not Found");
  }
});
const DeletePokemon = expressAsyncHandler(async (req, res) => {
  const data = await Pokemon.findById(req.params.id);
  if (data.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }
  if (data) {
    await data.deleteOne({ _id: req.user._id });
    res.json({ message: "Pokemon removed" });
  } else {
    res.status(401);
    throw new Error("Pokemon not found");
  }
});

module.exports = {
  getPokemons,
  createPokemon,
  getNodeById,
  updatePokemon,
  DeletePokemon,
};
