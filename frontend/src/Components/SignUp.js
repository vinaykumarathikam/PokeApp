import React, { useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { register } from "../Actions/UserAction";
import { useDispatch } from "react-redux";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";
export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmpassword: "",
    heights: [],
    weights: [],
    titles: [],
  });
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmpassword) {
      setMessage("Passwords do not match");
    } else dispatch(register(user.fullname, user.email, user.password));
  };
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
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
            {loading && <Loading />}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="fname">
                <Form.Label>FullName:</Form.Label>
                <Form.Control
                  type="text"
                  name="fullname"
                  placeholder="Enter full name"
                  onChange={(e) =>
                    setUser({ ...user, [e.target.name]: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={(e) =>
                    setUser({ ...user, [e.target.name]: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  onChange={(e) =>
                    setUser({ ...user, [e.target.name]: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>ConfirmPassword</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmpassword"
                  placeholder="Enter password"
                  onChange={(e) =>
                    setUser({ ...user, [e.target.name]: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <p></p>
              <Button disabled={loading} className="w-100" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
          <div className="w-100 text-center mt-2">
            Already have an account?
            <Link to="/login">Login</Link>
          </div>
        </Card>
      </div>
    </Container>
  );
}
