import React, { useState, useEffect } from "react";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "../helpers/selectors.js";

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

  //create a function called bookInterview
  const bookInterview = (id, interview) => {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments,
        });
      });
  };

  // creating the main cancelInterview function in Application.js,
  const deleteInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments,
        });
      });
  };

  const appointmentList = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = appointmentList.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
      />
    );
  });

  const setDay = (day) => setState({ ...state, day });

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
      // console.log(responseArr[2].data);
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
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
