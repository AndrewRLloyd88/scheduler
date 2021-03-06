import React from "react";

import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const { appointments, days, getSpotsForDay, setDay } = props;

  const dayList = days.map((day) => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={getSpotsForDay(appointments, days, day.name)}
      selected={day.name === props.day}
      setDay={setDay}
    />
  ));

  return dayList;
}
