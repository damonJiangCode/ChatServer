import "./SignUp.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordCheck: "",
    email: "",
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
    if (
      !formData.username ||
      !formData.password ||
      !formData.email ||
      !formData.passwordCheck
    ) {
      alert("Invalid input!");
      setFormData({
        username: "",
        email: "",
        passwordCheck: "",
        password: "",
      });
    } else if (formData.password !== formData.passwordCheck) {
      alert("Passwords do not match!");
      setFormData({
        ...formData,
        password: "",
        passwordCheck: "",
      });
    } else {
      console.log(formData);
      try {
        const response = await fetch("http://localhost:3001/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log("Data successfully submitted");
          alert(`Sign Up Successfully`);
          navigate("/chat", {
            state: { username: formData.username },
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
      <label className="signUpText">Sign Up</label>
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
          email:
          <input
            type="email"
            name="email"
            value={formData.email}
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

        <label>
          Confirm Password:
          <input
            type="password"
            name="passwordCheck"
            value={formData.passwordCheck}
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

export default SignUp;
