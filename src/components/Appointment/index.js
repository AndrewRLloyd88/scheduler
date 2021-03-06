import React, { useEffect } from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

//Working states of our app
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

//building our appointment component and state logic associated
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVING, true);
      });
  }

  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (!props.interview && mode === SHOW) {
      transition(EMPTY);
    }
  }, [props.interview, transition, mode]);

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
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
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you want to delete this appointment?"}
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
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
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
