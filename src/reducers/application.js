// import { useReducer } from "react";
// import useApplicationData from "../useApplicationData";

// export const SET_DAY = "SET_DAY";
// export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
// export const SET_INTERVIEW = "SET_INTERVIEW";

// export function reducer(state, action) {
//   const {
//     appointments,
//     day,
//     days,
//     dayName,
//     id,
//     interview,
//     interviewers,
//   } = action;
//   switch (action.type) {
//     case SET_DAY:
//       return { ...state, day };
//     case SET_APPLICATION_DATA:
//       return { ...state, days, appointments, interviewers };
//     case SET_INTERVIEW: {
//       const appointment = {
//         ...state.appointments[id],
//         interview: interview && { ...interview },
//       };

//       const appointments = {
//         ...state.appointments,
//         [id]: appointment,
//       };

//       const newDays = state.days.map((day) => {
//         if (day.name === dayName) {
//           return { ...day, spots: interview ? day.spots - 1 : day.spots + 1 };
//         }
//         return day;
//       });

//       return { ...state, appointments, days: newDays };
//     }
//     default:
//       throw new Error(
//         `Reduce Error, Attempted to reduce with illegal action type: ${action.type}`
//       );
//   }
// }
