import React from "react";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePokemonAction } from "../Actions/pokemonAction";
import { updateUser } from "../Actions/UserAction";
export default function Card(props) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const pokemonList = useSelector((state) => state.pokemonList);
  var { pokemons } = pokemonList;
  if (!Array.isArray(pokemons)) {
    pokemons = [];
  }
  const [data, setdata] = useState({
    types: [{ type: { name: "default" } }],
    sprites: { front_shiny: "" },
  });
  useEffect(() => {
    const fetchdata = async () => {
      axios.get(props.url).then((res) => setdata(res.data));
    };
    fetchdata();
  }, [props.url]);

  let cnt = 0;
  let [idx, setidx] = useState(0);
  return (
    <>
      <div
        className="col-sm-3"
        style={{ margin: "40px", marginTop: "5px", marginLeft: "1%" }}
      >
        <div
          className="card mb3"
          style={{
            width: "18rem",
            backgroundColor: "#D07D21",
            border: "1px solid black",
            borderRadius: "10px",
            boxShadow: "black",
          }}
        >
          <img
            src={data.sprites.front_default}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{data.name}</h5>
          </div>
          <ul style={{ listStyleType: "none" }}>
            <li
              style={{
                backgroundColor: "green",
                float: "center",
                width: "150px",
                height: "25px",
                marginLeft: "25px",
                borderRadius: "10px",
              }}
            >
              {data.types[0].type.name}
            </li>
          </ul>
          <ul className="list-group list-group-flush">
            <div
              style={{
                backgroundColor: "rgb(41, 36, 36)",
                borderRadius: "10px",
              }}
            >
              <li
                className="list-group-item"
                style={{
                  backgroundColor: "rgb(41, 36, 36)",
                  color: "white",
                }}
              >
                Height:{data.height}
              </li>
            </div>
            <br />
            <div
              style={{
                backgroundColor: "rgb(41, 36, 36)",
                borderRadius: "10px",
              }}
            >
              <li
                className="list-group-item"
                style={{
                  backgroundColor: "rgb(41, 36, 36)",
                  color: "white",
                }}
              >
                Weight:{data.weight}
              </li>
            </div>
            <br />
            <div
              style={{
                backgroundColor: "rgb(41,36,36",
                borderRadius: "10px",
              }}
            >
              <li
                className="list-group-item"
                style={{
                  backgroundColor: "rgb(41, 36, 36)",
                  color: "white",
                }}
              >
                Base_experience:{data.base_experience}
              </li>
            </div>
            <select
              name="dropdown"
              onChange={(e) => {
                setidx(e.target.value);
              }}
            >
              {pokemons &&
                pokemons.map((item) => (
                  <option key={item._id} value={cnt++}>
                    {item.title}
                  </option>
                ))}
            </select>
          </ul>
          <div className="card-body">
            <div className="col-mb-3">
              <button
                type="button"
                className="btn btn-primary"
                name="operator"
                style={{ marginLeft: "10px" }}
                disabled={props.isDisabled}
                onClick={async () => {
                  let p = pokemons[idx];
                  let parr = [...p.content];
                  for (let x of parr) {
                    if (x.id === data.id) {
                      window.alert(
                        "this pokemon is already present in the collection"
                      );
                      return;
                    }
                  }
                  props.handleAddClick();
                  let harr = userInfo.heights;
                  let warr = userInfo.weights;
                  harr.push(data.height);
                  warr.push(data.weight);
                  harr.sort(function (a, b) {
                    return a - b;
                  });
                  warr.sort(function (a, b) {
                    return a - b;
                  });
                  const newPoke = {
                    id: data.id,
                    img: data.sprites.front_shiny,
                    name: data.name,
                    type: data.types[0].type.name,
                    height: data.height,
                    weight: data.weight,
                  };
                  parr.push(newPoke);
                  await dispatch(updatePokemonAction(p._id, p.title, parr));
                  await dispatch(
                    updateUser({
                      heights: harr,
                      weights: warr,
                    })
                  );
                  props.handleAddUnClick();
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
