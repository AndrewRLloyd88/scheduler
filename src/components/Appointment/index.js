import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

//all of our states the app is in
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

//Error states
const ERROR_DELETING = "ERROR_DELETING";
const ERROR_SAVING = "ERROR_SAVING";

//building our appointment component
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // Call the props.bookInterview function with the appointment id and interview as arguments from within the save function. Verify that the correct id and interview values are correct in the console output.

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(function () {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVING, true);
      });
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === CONFIRM && (
        <Confirm
          onCancel={() => transition(SHOW)}
          onConfirm={() => {
            transition(DELETING, true);
            props
              .deleteInterview(props.id)
              .then(() => transition(EMPTY))
              .catch(() => {
                transition(ERROR_DELETING, true);
              });
          }}
          message={DELETING}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={(name, interviewer) => {
            transition(SAVING);
            props
              .bookInterview(props.id, save(name, interviewer))
              .then(() => transition(SHOW))
              .catch(() => {
                transition(ERROR_SAVING, true);
              });
          }}
          onCancel={() => transition(SHOW)}
        />
      )}
      {mode === ERROR_DELETING && (
        <Error
          message="There was an error deleting your appointment."
          onClose={() => back()}
        />
      )}
      {mode === ERROR_SAVING && (
        <Error
          message="There was a problem saving your appointment."
          onClose={() => back()}
        />
      )}
    </article>
  );
}
