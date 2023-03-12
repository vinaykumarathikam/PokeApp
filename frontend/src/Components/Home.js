import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Create from "./Create";
import { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPokemonAction, listPokemons } from "../Actions/pokemonAction";
import { Table } from "react-bootstrap";
import Loading from "./Loading";
import { updateUser } from "../Actions/UserAction";

export default function Home() {
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.pokemonList);
  var { loading, pokemons } = pokemonList;
  if (!Array.isArray(pokemons)) {
    if (!loading && pokemons !== undefined)
      window.alert("Make sure you have proper internet connection!");
    pokemons = [];
  }
  const [added, setAdded] = useState(true);
  const [name, setname] = useState("");
  const [buttontext, setbuttontext] = useState("create");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  let harr = userInfo.heights;
  let warr = userInfo.weights;
  let minheight = 0;
  let maxheight = 0;
  let maxweight = 0;
  let minweight = 0;
  const pokemon = harr.length;
  let titles = userInfo.titles;
  if (harr.length !== 0) {
    let n = harr.length;
    minheight = harr[0];
    maxheight = harr[n - 1];
  }
  if (warr.length !== 0) {
    let n = warr.length;
    minweight = warr[0];
    maxweight = warr[n - 1];
  }
  useEffect(() => {
    dispatch(listPokemons());
    if (!userInfo) {
      navigate("/login");
    }
  }, [dispatch, navigate, added, userInfo]);
  return (
    <div
      style={{
        marginTop: 50,
      }}
    >
      <div
        className="row"
        style={{
          backgroundColor: "skyblue",
          marginRight: "0",
          marginLeft: "0",
          textAlign: "center",
        }}
      >
        <div
          className="col-8"
          style={{ fontSize: "40px", fontFamily: "initial" }}
        >
          Hello {userInfo.fullname}!
        </div>
        <div className="col-4" style={{ overflowX: "auto" }}>
          <div
            className="continer"
            style={{
              marginTop: "15px",
              marginRight: "15px",
              marginLeft: "15px",
            }}
          >
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>{pokemons.length} Collections</th>
                  <th>{minheight} min height</th>
                  <th>{minweight} min weight</th>
                </tr>
                <tr>
                  <th>{pokemon} pokemon</th>
                  <th>{maxheight} max height</th>
                  <th>{maxweight} max weight</th>
                </tr>
              </thead>
            </Table>
          </div>
        </div>
      </div>
      <br />
      <div className="container d-flex justify-content-center">
        <form
          className="row row-cols-lg-auto g-3 align-items-center"
          id="myform"
        >
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="col-12">
            <input
              type="text"
              name="title"
              className="form-control"
              id="specificSizeInputName"
              placeholder="Enter the collection name"
              onChange={(e) => {
                let temp = e.target.value;
                setname(temp);
              }}
            />
          </div>
          <div className="col-12">
            <p></p>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                if (titles.includes(name)) {
                  setError("This collection already exists!");
                  return;
                }
                if (!name) {
                  setError("Enter the collection name");
                  return;
                }
                setError("");
                setbuttontext("created");
                setTimeout(() => {
                  setbuttontext("create");
                }, 1000);
                dispatch(createPokemonAction(name));
                titles.push(name);
                dispatch(
                  updateUser({
                    titles,
                  })
                );
                setAdded(!added);
                document.getElementById("myform").reset();
              }}
              className="btn btn-primary"
            >
              {buttontext}
            </button>
          </div>
        </form>
      </div>
      <br />
      <div className="container text-center">
        <div className="row">
          {loading && <Loading />}
          {pokemons &&
            pokemons.map((item) => {
              return (
                <div className="col-sm-6 mt-3" key={item._id}>
                  <Create id={item._id} name={item.title} arr={item.content} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
