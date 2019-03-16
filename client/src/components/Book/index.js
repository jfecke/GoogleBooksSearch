import React from "react";
import "./style.css";

function Book(props) {
  return (
    <div  className="card">
      <img id={props.id} alt={props.id} src={props.image} />
    </div>
  );
}

export default Book;
