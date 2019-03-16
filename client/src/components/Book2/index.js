import React from "react";
import "./style.css";

function Book2(props) {
  return (
    <div  className="card">
      <img alt={props.id} src={props.image} />
      <div className="bookText">
        <p><strong>Title: </strong><span className="title">{props.title}</span></p>
        <p><strong>Author: </strong><span className="author">{props.author}</span></p>
        <p className="description"><strong>Description: </strong><span className="descript">{props.description}</span></p>
        <p><strong><a className="link" href={props.link} target="_blank">Preview Link</a></strong></p>
      </div>
      <button dataid={props.id} className="savebook" onClick={props.deleteBook}>Delete</button>
    </div>
  );
}

export default Book2;
