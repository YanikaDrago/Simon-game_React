import React from "react";

const Button = (props) => {
    return (
      <div
        type={props.type}
        id={props.id}
        className={props.className}
        onClick={props.onClick}
      ></div>
    )
}

export default Button;