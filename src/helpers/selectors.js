//our mock data to reference for our tests
// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3],
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5],
//     },
//   ],
//   appointments: {
//     1: { id: 1, time: "12pm", interview: null },
//     2: { id: 2, time: "1pm", interview: null },
//     3: {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 },
//     },
//     4: { id: 4, time: "3pm", interview: null },
//     5: {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 },
//     },
//   },
//   interviewers: {
//     1: {
//       id: 1,
//       name: "Sylvia Palmer",
//       avatar: "https://i.imgur.com/LpaY82x.png",
//     },
//     2: {
//       id: 2,
//       name: "Tori Malcolm",
//       avatar: "https://i.imgur.com/Nmx0Qxo.png",
//     },
//   },
// };

// returns an array of appointments for the given day.
export function getAppointmentsForDay(state, day) {
  //store our appointments to return
  const appointmentObject = [];
  //defining appointment days as state.days
  const appointmentDays = state.days;
  //deining our appointments in our object
  const appointments = state.appointments;
  //looping through our array of days
  for (const appointmentDay of appointmentDays) {
    //if the day matches the day name
    if (appointmentDay.name === day) {
      console.log(appointmentDay);
      //loop through the appointments array
      for (const elem of appointmentDay.appointments) {
        appointmentObject.push(appointments[elem]);
      }
    }
  }
  return appointmentObject;
}

//
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewObject = {};
  interviewObject.student = interview.student;
  interviewObject.interviewer = state.interviewers[interview.interviewer];

  return interviewObject;
}
