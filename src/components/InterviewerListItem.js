import React from "react";

//import the styles
import "components/InterviewerListItem.scss";

//import classNames in
const classNames = require("classnames");

export default function InterviewerListItem(props) {
  const interviewerClass = classNames("interviewers__item", {
    //props are selected unselected and clickable
    "interviewers__item--selected": props.selected,
  });
  //insert functions here
  //insert useState h, {useState}ere

  return (
    <section className="interviewers">
      <h3 className="interviewers__header text--light">Interviewer</h3>
      <li className={interviewerClass} onClick={() => props.setInterviewer}>
        <img
          className="interviewers__item-image"
          src={props.avatar}
          alt={props.name}
        />
        {props.selected && props.name}
      </li>
    </section>
  );
}
