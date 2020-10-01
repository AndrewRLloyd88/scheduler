import React, { useState, useEffect } from "react";
import { getAppointmentsForDay } from "helpers/selectors.js";

import "components/Application.scss";
import "components/Appointment";
import Appointment from "components/Appointment";
import axios from "axios";

import DayList from "components/DayList";

export default function Application(props) {
  //set the default day to Monday - adding state to Application.js
  //line 39 passes day and days to DayList
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {},
  });

  const appointmentList = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
      return <Appointment key={appointment.id} {...appointment} />;
    }
  );

  const setDay = (day) => setState({ ...state, day });
  const setDays = (days) => setState((prev) => ({ ...prev, days }));

  useEffect(() => {
    const dayPromise = axios.get("http://localhost:8001/api/days");
    const promiseAppointments = axios.get(
      "http://localhost:8001/api/appointments"
    );
    const promiseInterviewers = axios.get(
      "http://localhost:8001/api/interviewers"
    );
    const promises = [dayPromise, promiseAppointments, promiseInterviewers];

    Promise.all(promises).then((responseArr) => {
      setState((prev) => ({
        ...prev,
        days: responseArr[0].data,
        appointments: responseArr[1].data,
        interviewers: responseArr[2].data,
      }));
      //testing our interviewers route is retireving data ok
      console.log(responseArr[2].data);
    });
  }, []);
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
