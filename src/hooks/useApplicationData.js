import { useEffect, useReducer } from "react";

import axios from "axios";

export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function useApplicationData() {
  const reducer = (state, action) => {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.day };
      case SET_APPLICATION_DATA: {
        const { appointments, days, interviewers } = action;
        return { ...state, days, appointments, interviewers };
      }
      case SET_INTERVIEW: {
        const { id, interview, dayName } = action;
        const appointment = {
          ...state.appointments[id],
          interview: interview && { ...interview },
        };

        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };

        const newDays = state.days.map((day) => {
          if (day.name === dayName) {
            return { ...day, spots: interview ? day.spots - 1 : day.spots + 1 };
          }
          return day;
        });

        return { ...state, appointments, days: newDays };
      }
      default:
        throw new Error(
          `Reduce Error, Attempted to reduce with illegal action type: ${action.type}`
        );
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  //sends the payload to axios containing days appointtments and interviewers
  useEffect(() => {
    const dayPromise = axios.get("http://localhost:8001/api/days");
    const promiseAppointments = axios.get(
      "http://localhost:8001/api/appointments"
    );
    const promiseInterviewers = axios.get(
      "http://localhost:8001/api/interviewers"
    );
    const promises = [dayPromise, promiseAppointments, promiseInterviewers];

    Promise.all(promises).then((responseArr) =>
      dispatch({
        type: SET_APPLICATION_DATA,
        days: responseArr[0].data,
        appointments: responseArr[1].data,
        interviewers: responseArr[2].data,
      })
    );
  }, []);

  // sends the create appointmnet request data to our API via side effect of axios
  const bookInterview = (id, interview, dayName) => {
    console.log(id, interview, dayName);
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({
          type: SET_INTERVIEW,
          id,
          dayName,
          interview,
        });
      });
  };

  // sends the delete appointment request data to our API via side effect of axios
  const deleteInterview = (id, dayName) => {
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        dispatch({
          type: SET_INTERVIEW,
          id,
          dayName,
          interview: null,
        });
      });
  };
  return { state, setDay, bookInterview, deleteInterview };
}
