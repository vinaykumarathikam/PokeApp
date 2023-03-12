import React, { useEffect } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Actions/UserAction";
import Loading from "./Loading";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        position: "fixed",
        minWidth: "100%",
        backgroundImage: `url("http://4.bp.blogspot.com/-cSBG_rLnYuc/UqT0quEJsKI/AAAAAAAARmo/3oqAA4CryFw/s1600/pokemon-10.png")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card
          style={{
            display: "block",
            padding: 30,
            color: "#2E5A88",
            backgroundColor: "#59D7E6",
          }}
        >
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading && <Loading />}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <p></p>
              <Button disabled={loading} className="w-100" type="submit">
                Log In
              </Button>
            </Form>
          </Card.Body>
          <div className="w-100 text-center mt-2">
            Don't have an account?
            <Link to="/register">Signup</Link>
          </div>
        </Card>
      </div>
    </Container>
  );
}
