import "./LogIn.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert("Invalid input!");
      setFormData({
        username: "",
        password: "",
      });
    } else {
      try {
        const response = await fetch("http://localhost:3001/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log("Found The User");
          navigate("/chat", {
            state: { username: formData.username, email: formData.email },
          });
        } else {
          if (response.status === 400) {
            const errorData = await response.json();
            alert(`Error: ${errorData.error}`);
          } else {
            console.error("Failed to submit data");
          }
        }
      } catch (error) {
        console.error("Error during data submission:", error);
      }
    }
  };

  return (
    <div className="container">
      <label className="logInText">Log In</label>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default LogIn;
