import * as tf from "@tensorflow/tfjs";
import axios from "axios";
import idx2class1 from "./classIdxDict2";
import Newpage from "./Newpage";

import React, { useState, useEffect } from "react";
function Find() {
  const [file, setFile] = useState(null);
  const [data, setdata] = useState([]);
  const [d, setd] = useState(1);
  function getdata(item) {
    const pokedata = [];
    item.map((i) =>
      axios
        .get("https://pokeapi.co/api/v2/pokemon/" + i)
        .then((res) => pokedata.push(res.data))
    );
    return pokedata;
  }
  const [processing, setProcessing] = useState(false);
  const [topkPredNames, setPrediction] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const [model, setModel] = useState(null);
  function readImage(file) {
    return new Promise((rs, rj) => {
      const fileReader = new FileReader();
      fileReader.onload = () => rs(fileReader.result);
      fileReader.onerror = () => rj(fileReader.error);
      fileReader.readAsDataURL(file);
    });
  }
  function myFunction() {
    var x = document.getElementById("predictbutton");
    x.style.display = "block";
  }
  async function handleImgUpload(event) {
    const {
      target: { files },
    } = event;

    const _file = files[0];
    const fileData = await readImage(_file);
    setFile(fileData);
    setProcessing(true);
  }

  const MODEL_HTTP_URL = "api/pokeml/classify";
  const MODEL_INDEXEDDB_URL = "indexeddb://poke-model";

  const getTopKPred = (pred, k) => {
    const predIdx = [];
    const predNames = [];

    const topkPred = [...pred].sort((a, b) => b - a).slice(0, k);
    topkPred.map((i) => predIdx.push(pred.indexOf(i)));
    predIdx.map((i) => predNames.push(idx2class1[i]));

    return predNames;
  };

  useEffect(() => {
    async function fetchModel() {
      try {
        const localClassifierModel = await tf.loadLayersModel(
          MODEL_INDEXEDDB_URL
        );
        setModel(localClassifierModel);
      } catch (e) {
        try {
          const classifierModel = await tf.loadLayersModel(MODEL_HTTP_URL);
          setModel(classifierModel);
          await classifierModel.save(MODEL_INDEXEDDB_URL);
        } catch (e) {
          console.log("Unable to load model at all: ", e);
        }
      }
    }
    fetchModel();
  }, []);
  useEffect(() => {
    async function predict() {
      if (imageLoaded && file) {
        const imageElement = document.createElement("img");
        imageElement.src = file;

        imageElement.onload = async () => {
          const tensor = tf.browser
            .fromPixels(imageElement)
            .resizeNearestNeighbor([120, 120])
            .toFloat()
            .sub(127)
            .div(127)
            .expandDims();

          const y_pred = await model.predict(tensor).data();
          const getTopKPredPokeObj = (pred, k) => {
            const predPokeName = getTopKPred(pred, k);

            // predPokeName.map((name) =>
            //   foundPokeObj.push(pokeObjFromName(name, pokeObjList))
            // );

            return predPokeName;
          };
          let topkPredNames = getTopKPredPokeObj(y_pred, 6);
          let poke = getdata(topkPredNames);
          setPrediction(topkPredNames);
          setdata(poke);
          setProcessing(false);
          setImageLoaded(false);
          return topkPredNames;
        };
      }
    }

    predict();
  }, [imageLoaded, model, data, file]);

  return (
    <>
      <div
        style={{
          marginTop: "50px",
          backgroundColor: "rgb(124, 124, 223)",
          marginRight: "0px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgb(124, 124, 223)",
          }}
        >
          <div
            className="input-group"
            id={d}
            style={{ width: "400px", margin: "30px" }}
          >
            <h1 style={{ width: "400px", margin: "auto" }}>
              Find Pokemon By Image
            </h1>
            <p></p>
            <label htmlFor="image-upload">
              <h3>Upload Image: </h3>
            </label>
            <input
              id="image-selector"
              type="file"
              name="upload-image"
              accept="image/*"
              className="File-selector"
              onChange={(e) => {
                handleImgUpload(e);
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                  document.querySelector(
                    "#display_img"
                  ).style.backgroundImage = `url(${reader.result})`;
                });
                reader.readAsDataURL(e.currentTarget.files[0]);
              }}
            />
            <button
              type="button"
              className="btn btn-success"
              id="predictbutton"
              style={{ display: "none" }}
              onClick={() => {
                setd(Math.random());
              }}
            >
              predict
            </button>
          </div>
        </div>
      </div>
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gridGap: "40px",
          marginTop: "20px",
        }}
      >
        <div
          className="box"
          style={{
            backgroundColor: "#f0f0f0",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
            textAlign: "center",
            fontSize: "24px",
          }}
        >
          <h2 style={{ backgroundColor: "rgb(199, 195, 195)" }}>
            Preview Image
          </h2>
          <p>
            {" "}
            <img
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                marginTop: "10px",
              }}
              onLoad={() => {
                setImageLoaded(true);
              }}
              alt=""
              src={file}
            />
          </p>
        </div>
        <div
          className="box"
          style={{
            backgroundColor: "#f0f0f0",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
            textAlign: "center",
            fontSize: "24px",
          }}
        >
          <h2 style={{ backgroundColor: "rgb(199, 195, 195)" }}>
            Search Result (top-6-matches)
          </h2>
          {processing ? (
            <p>Loading ...</p>
          ) : topkPredNames !== null ? (
            <div className="row">
              <p></p> <p></p>
              {myFunction()}
              {data.map((item) => {
                return (
                  <div
                    key={item}
                    className="col-sm-6"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      marginTop: "10px",
                    }}
                  >
                    <Newpage
                      name={item.name}
                      type={item.types[0].type.name}
                      image={item.sprites.front_default}
                    />
                  </div>
                );
              })}
              <p></p>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Find;
