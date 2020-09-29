import React from "react";

import "components/DayListItem.scss";

const classNames = require("classnames");

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    //conditional formatting between spots > 0 ? day-list__item--selected : day-list__item--full
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  const formatSpots = () => {
    //we check if there are no spots with (s) available
    if (props.spots === 0) {
      return "no spots remaining";
      //then check if this is the last spot (no s) available
    } else if (props.spots === 1) {
      return "1 spot remaining";
    } else {
      //otherwise there are more spot(s) available
      return `${props.spots} spots remaining`;
    }
  };

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}