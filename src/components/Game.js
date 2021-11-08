import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import H1 from "./H1";
import Button from "./Button";

const Game = () => {
  const [started, setStarted] = useState(false);
  const [heading, setHeading] = useState("Press A Key to Start");
  const [level, setLevel] = useState(1);
  const [gamePattern, setGamePattern] = useState([]);
  const [userClickedPattern, setUserClickedPattern] = useState([]);
  const [visible, setVisible] = useState({
    red: false,
    green: false,
    yellow: false,
    blue: false,
  });
  const [addClass, setAddClass] = useState("");
  const [gameOver, setGameOver] = useState("");


  const buttonColours = ["red", "blue", "green", "yellow"];

  useEffect(() => {
    const onKeyUp = ({ key }) => {
      if (!started) {
        setHeading("Level " + level);
        setStarted(true);
        nextSequence();
      }
    };

    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keyup", onKeyUp);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, started, visible]);


  useEffect(() => {
    if (started && userClickedPattern.length > 0) {
      checkAnswer(userClickedPattern.length - 1);
    }
  }, [userClickedPattern]);


  console.log(started, gamePattern);


  function nextSequence() {
    
    setUserClickedPattern([]);
    setLevel(level + 1);
    
    console.log(level);

    setHeading("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    
    setVisible({ ...visible, [randomChosenColour]: true });
    playSound(randomChosenColour);
    
    setGamePattern([...gamePattern, randomChosenColour]);
    
    setTimeout(function () {
      setVisible({ ...visible, [randomChosenColour]: false });
    }, 1000);
    console.log("randomChosenColour:", randomChosenColour);
  }

  const handleClick = (event) => {
    let userChosenColour = event.target.id;

    if (started) {
      setUserClickedPattern([...userClickedPattern, userChosenColour]);
      playSound(userChosenColour);
      animatePress(userChosenColour);
    }
  };

  function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  function animatePress(currentColor) {
    setAddClass(currentColor);
    setTimeout(function () {
      document.getElementById(currentColor);
      setAddClass("");
    }, 100);
  }

  function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("currentLevel", currentLevel);
      console.log("gamePattern", gamePattern);
      console.log("userClickedPattern", userClickedPattern);

      if (userClickedPattern.length === gamePattern.length) {
        console.log("success 2");
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      console.log("wrong");

      setHeading("Game Over");
      setGameOver("game-over");
      setTimeout(function () {
        setGameOver("");
      }, 200);

      playSound("wrong");

      setTimeout(function () {
        startOver();
      }, 2000);
    }

    function startOver() {
      setGamePattern([]);
      setStarted(false);
      setVisible(false);
      setLevel(1);
      setHeading("Press A Key to Start");
    }
  }

  return (
    <div className={gameOver}>
      <H1 heading={heading} />

      <div className="container">
        <div className="row">
          <CSSTransition
            in={visible.green}
            timeout={100}
            classNames="fadeInOut"
          >
            <Button
              type="button"
              id="green"
              onClick={handleClick}
              className={`btn green ${addClass === "green" ? "pressed" : ""}`}
            />
          </CSSTransition>

          <CSSTransition in={visible.red} timeout={100} classNames="fadeInOut">
            <Button
              type="button"
              id="red"
              onClick={handleClick}
              className={`btn red ${addClass === "red" ? "pressed" : ""}`}
            />
          </CSSTransition>
        </div>

        <div className="row">
          <CSSTransition
            in={visible.yellow}
            timeout={100}
            classNames="fadeInOut"
          >
            <Button
              type="button"
              id="yellow"
              onClick={handleClick}
              className={`btn yellow ${addClass === "yellow" ? "pressed" : ""}`}
            />
          </CSSTransition>
          <CSSTransition in={visible.blue} timeout={100} classNames="fadeInOut">
            <Button
              type="button"
              id="blue"
              onClick={handleClick}
              className={`btn blue ${addClass === "blue" ? "pressed" : ""}`}
            />
          </CSSTransition>
        </div>
      </div>
    </div>
  );
};

export default Game;
