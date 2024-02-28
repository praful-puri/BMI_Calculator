import "./App.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  //making state of our application
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const getLocalStorageData = localStorage.getItem("user_credentials");

  //logic

  useEffect(() => {
    if (getLocalStorageData === null) {
      navigate("/login");
    }
  }, []);

  let calcBmi = (e) => {
    e.preventDefault();

    if (weight === 0 || height === 0) {
      alert("please enter a valid weight and height");
    } else {
      let bmi = (weight / (height * height)) * 703;
      setBmi(bmi.toFixed(1));

      //

      if (bmi < 18) {
        setMessage("you are underweight");
      } else if (bmi >= 18 && bmi < 25) {
        setMessage("you are healthy weight");
      } else {
        setMessage("you are overweight");
      }
    }
  };

  //reload
  let reload = () => {
    window.location.reload();
  };

  const handleLogout = () =>{
    localStorage.removeItem("user_credentials")
    navigate("/login");
  }

  return (
    <div className="container">
    <button className="logout" onClick={handleLogout}>Logout</button>
      <div className="calculator">
        <div className="header">
          <h1>BMI calculator</h1>
        </div>
        <form onSubmit={calcBmi}>
          <div className="input">
            <div>
              <label>Weight (lbs)</label>
              <input
                type="text"
                className="bmi_input"
                placeholder="Enter your Weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div>
              {" "}
              <label>Height (in)</label>
              <input
                type="text"
                className="bmi_input"
                placeholder="Enter your Height"
                value={height}
                onChange={(event) => setHeight(event.target.value)}
              />
            </div>
          </div>

          <div className="button">
            <button type="submit" className="btn">
              Calculate
            </button>
            <button onClick={reload} type="submit" className="btn">
              Reset{" "}
            </button>
          </div>
          <div className="information">
            <h4>Your Body Mass Index:{bmi}</h4>
            <p>{message}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
