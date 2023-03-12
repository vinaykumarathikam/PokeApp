import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePokemonAction,
  updatePokemonAction,
} from "../Actions/pokemonAction";
import { updateUser } from "../Actions/UserAction";

function Create(props) {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  let harr = userInfo.heights;
  let warr = userInfo.weights;
  let titles = userInfo.titles;
  const [name, setname] = useState(props.name);
  const [temp, settemp] = useState("");
  const [darr, setdarr] = useState([]);
  const handleNameBlur = (e) => {
    settemp(e.target.textContent);
  };
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      const sarr = [...props.arr];
      for (let y of sarr) {
        let hidx = harr.findIndex((x) => {
          return x === y.height;
        });
        harr.splice(hidx, 1);
        let widx = warr.findIndex((x) => {
          return x === y.weight;
        });
        warr.splice(widx, 1);
      }
      let tidx = titles.findIndex((x) => {
        return x === props.name;
      });
      titles.splice(tidx, 1);
      dispatch(deletePokemonAction(id));
      dispatch(
        updateUser({
          heights: harr,
          weights: warr,
          titles,
        })
      );
    }
  };
  return (
    // <div className="col-sm-6">
    <>
      <div className="card ">
        <div
          className="card-body "
          style={{
            backgroundColor: " rgb(141, 141, 238)",
            padding: "30px",
            borderRadius: "10px",
          }}
        >
          <h3
            id={props.id}
            className="card-name"
            contentEditable="false"
            suppressContentEditableWarning={true}
            onBlur={handleNameBlur}
          >
            {name}
          </h3>
          <div
            className="card-buttons"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <button
              className="btn btn-danger "
              style={{
                order: 1,
              }}
              onClick={() => deleteHandler(props.id)}
            >
              delete
            </button>
            <p id="text" style={{ display: "none" }}>
              check the pokemons to remove
            </p>
            <button
              className="btn btn-primary "
              style={{
                order: -1,
                backgroundColor: "gold",
              }}
              onClick={async () => {
                let name = props.name;
                var z = document.getElementsByClassName(name);
                for (let i of z) {
                  i.style.display = "inline-block";
                }
                var x = document.getElementById(name + "down");
                x.style.display = "inline-block";
                var l = document.getElementById("text");
                l.style.display = "inline-block";
                var y = document.getElementById(name + "update");
                y.style.display = "inline-block";
                var m = document.getElementById(props.id);
                m.contentEditable = true;
                m.style.backgroundColor = "white";
              }}
            >
              edit
            </button>
          </div>

          <br />
          <div
            className="container "
            style={{ flexBasis: "calc(50% - 20px)", margin: "10px" }}
          >
            <div className="row">
              {props.arr.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="row g-0"
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      margin: 5,
                    }}
                  >
                    <Card
                      style={{
                        flexDirection: "row",
                        width: "14rem",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      <label>
                        <input
                          className={"form-check-input mt-0  " + props.name}
                          style={{
                            display: "none",
                            position: "absolute",
                            width: "15px",
                            height: "15px",
                            overflow: "hidden",
                            left: "15px",
                          }}
                          type="checkbox"
                          value=""
                          aria-label="Checkbox for following text input"
                          onChange={(e) => {
                            let arr = [...props.arr];
                            let delind = arr.findIndex((x) => {
                              return x.name === item.name;
                            });
                            let ddarr = [...darr];
                            if (e.target.checked) {
                              ddarr.push(delind);
                            } else {
                              let unchecked_indx = ddarr.findIndex((x) => {
                                return x === delind;
                              });
                              ddarr.splice(unchecked_indx, 1);
                            }
                            setdarr(ddarr);
                          }}
                        />
                      </label>
                      <Card.Img
                        style={{ width: "40%", margin: 0 }}
                        variant="left"
                        src={item.img}
                      />
                      <Card.Body
                        style={{
                          width: "60%",
                          paddingTop: "20px",
                          paddingBottom: "20px",
                          paddingLeft: 0,
                          paddingRight: 0,
                        }}
                      >
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>{item.type}</Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
          <p></p>
          <button
            id={props.name + "down"}
            style={{ display: "none", float: "left" }}
            className="btn btn-primary"
            onClick={() => {
              let name = props.name;
              var z = document.getElementsByClassName(name);
              for (let i of z) {
                i.style.display = "none";
                i.checked = false;
              }
              var x = document.getElementById(name + "down");
              x.style.display = "none";
              var y = document.getElementById(name + "update");
              y.style.display = "none";
              var m = document.getElementById(props.id);
              m.contentEditable = false;
              m.style.backgroundColor = " rgb(141, 141, 238)";
              m.textContent = name;
              var l = document.getElementById("text");
              l.style.display = "none";
            }}
          >
            cancel
          </button>
          <button
            className="btn btn-primary"
            id={props.name + "update"}
            style={{ display: "none", float: "right" }}
            onClick={() => {
              if (temp && titles.includes(temp)) {
                window.alert("This collection already exists!");
                return;
              }
              let arr = [...props.arr];
              for (let delind of darr) {
                let y = arr[delind];
                let hidx = harr.findIndex((x) => {
                  return x === y.height;
                });
                harr.splice(hidx, 1);
                let widx = warr.findIndex((x) => {
                  return x === y.weight;
                });
                warr.splice(widx, 1);
                arr.splice(delind, 1);
              }
              let x = temp;
              if (temp) {
                let tidx = titles.findIndex((x) => {
                  return x === name;
                });
                titles.splice(tidx, 1);
                titles.push(temp);
                setname(temp);
              } else {
                x = name;
              }
              dispatch(updatePokemonAction(props.id, x, arr));
              dispatch(
                updateUser({
                  heights: harr,
                  weights: warr,
                  titles,
                })
              );
            }}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
}

export default Create;
