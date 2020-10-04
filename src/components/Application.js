import React from "react";
//import styles
import "components/Application.scss";

import Appointment from "components/Appointment";
import DayList from "components/DayList";

//importing our new hook containing all of the juicy goodness to make our app work
import useApplicationData from "../hooks/useApplicationData";

//import our helper functions
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
  getSpotsForDay,
} from "../helpers/selectors";

export default function Application(props) {
  //pulling our all of our objects from useApplicationData()
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview,
  } = useApplicationData();
  //getting all appointments per day
  const appointmentList = getAppointmentsForDay(state, state.day);
  //getting each interviewer per day
  const interviewers = getInterviewersForDay(state, state.day);
  //iterating over our schedule to retrieve each interview from the appointmentList per day
  const schedule = appointmentList.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    //return an individual appointment
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

  //rendering out the sidebar and schedule
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
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
            appointments={state.appointments}
            getSpotsForDay={getSpotsForDay}
          />
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
