import React from "react";
import Card from "./Card";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listPokemons } from "../Actions/pokemonAction";
export default function Explore() {
  const [data, setdata] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const handleAddClick = () => {
    setIsDisabled(true);
  };
  const handleAddUnClick = () => {
    setIsDisabled(false);
  };
  const fetchdata = async () => {
    const src = "https://pokeapi.co/api/v2/pokemon?limit=150";
    axios.get(src).then((res) => setdata(res.data.results));
  };
  const { userInfo } = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo) dispatch(listPokemons());
  }, [dispatch, userInfo]);
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div className="container text-center" style={{ marginTop: 50 }}>
      <div className="row">
        {data.map((item) => {
          return (
            <Card
              key={item.name}
              isDisabled={isDisabled}
              handleAddClick={handleAddClick}
              handleAddUnClick={handleAddUnClick}
              url={item.url}
              name={item.name}
            />
          );
        })}
      </div>
    </div>
  );
}
