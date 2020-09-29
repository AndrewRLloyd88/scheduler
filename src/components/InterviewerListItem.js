import React from "react";

//import the styles
import "components/InterviewerListItem.scss";

//import classNames in
const classNames = require("classnames");

export default function InterviewerListItem(props) {
  const interviewerClass = classNames("interviewers__item", {
    //props are selected unselected and clickable
    "interviewers__item-image": props.selected
  });
//insert functions here
//insert useState here

  return (
    <li className={interviewerClass} onClick={() => props.selected}>
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      Sylvia Palmer
    </li>
  );
}
