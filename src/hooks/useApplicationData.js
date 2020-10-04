import { useEffect, useReducer } from "react";

import axios from "axios";

const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function useApplicationData() {
  //using reducer to control state, throws error when the action.type is unsupported by the reducer
  //worked through this session with a mentor to better understand the constructon for the switch
  const reducer = (state, action) => {
    switch (action.type) {
      //change the day logic
      case SET_DAY:
        return { ...state, day: action.day };
      //update Application Data
      case SET_APPLICATION_DATA: {
        //pulling out each action
        const { appointments, days, interviewers } = action;
        //gives us back the appropriate state, days, appointments and interviewers
        return { ...state, days, appointments, interviewers };
      }
      //Book an interview
      case SET_INTERVIEW: {
        //do not want data update on edit
        const { id, interview } = action;
        const appointment = {
          ...state.appointments[id],
          interview: interview && { ...interview },
        };

        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };
        //returns day obj or null
        const appointmentDay = state.days.find((day) =>
          day.appointments.includes(id)
        );
        //need a variable to hold our mapped over days
        const newDays = state.days.map((day) => {
          //check if the selected day matches a day name
          if (day.name === appointmentDay.name) {
            //depending on the action taking remove or add a spot
            return { ...day, spots: interview ? day.spots - 1 : day.spots + 1 };
          }
          return day;
        });
        //return our appointments object our days array and our interviewers object including spots
        return { ...state, appointments, days: newDays };
      }
      //error handling as a default if for any reason the app jumps to an illegal action type
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

    webSocket.onmessage = function (event) {
      const { id, interview } = JSON.parse(event.data);
      // console.log(interview);
      dispatch({ type: SET_INTERVIEW, id, interview });
      // console.log("Message Recieved: ", event.data);
    };

    Promise.all(promises).then((responseArr) =>
      dispatch({
        type: SET_APPLICATION_DATA,
        days: responseArr[0].data,
        appointments: responseArr[1].data,
        interviewers: responseArr[2].data,
      })
    );
    return () => webSocket.close();
  }, []);

  // sends the create appointmnet request data to our API via side effect of axios
  const bookInterview = (id, interview, dayName) => {
    // console.log(id, interview, dayName);
    return (
      axios
        //TODO: get away from hard coded URL use ENV Variables especially for live deploy
        .put(`http://localhost:8001/api/appointments/${id}`, { interview })
        .then(() => {
          dispatch({
            type: SET_INTERVIEW,
            id,
            interview,
          });
        })
    );
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

  //pass this data across for use in our components/Application.js (The client side)
  return { state, setDay, bookInterview, deleteInterview };
}
