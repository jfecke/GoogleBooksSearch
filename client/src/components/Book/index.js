import React from "react";
import "./style.css";

function Book(props) {
  return (
    <div  className="card">
      <img id={props.id} alt={props.id} src={props.image} />
      <div className="bookText">
        <p><strong>Title: </strong><span className="title">{props.title}</span></p>
        <p><strong>Author: </strong><span className="author">{props.author}</span></p>
        <p className="description"><strong>Description: </strong><span className="descript">{props.description}</span></p>
        <p><strong><a className="link" href={props.link} target="_blank">Preview Link</a></strong></p>
      </div>
      <button className="savebook" onClick={props.saveBook}>Save</button>
    </div>
  );
}

export default Book;
