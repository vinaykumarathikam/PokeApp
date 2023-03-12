const { default: mongoose } = require("mongoose");

const pokemonSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    content: {
      type: Array,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Pokemon = mongoose.model("Pokemon", pokemonSchema);
module.exports = Pokemon;
