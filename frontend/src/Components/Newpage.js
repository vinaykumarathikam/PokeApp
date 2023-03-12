import React from "react";
import { Card } from "react-bootstrap";

export default function Newpage(props) {
  return (
    <Card
      style={{
        width: "100%",
        flexDirection: "row",
        margin: "10px",
      }}
    >
      <Card.Img style={{ width: "30%" }} variant="left" src={props.image} />
      <Card.Body style={{}}>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.type}</Card.Text>
      </Card.Body>
    </Card>
  );
}
