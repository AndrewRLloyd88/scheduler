import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Form(props) {
  const { interviewers, onCancel, onSave } = props;

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  //Add the error state to the Form component.
  const [error, setError] = useState("");

  function reset() {
    setName("");
    setInterviewer(null);
    setError("");
  }

  function cancel() {
    reset();
    onCancel();
  }

  //Create a function called validate in the body of the Form component.
  function validate() {
    if (name === "") {
      //We need to track the error state. When the input is invalid, we need to change the error state to "Student name cannot be blank".
      setError("Student name cannot be blank");
      return;
    }

    setError("");
    onSave(name, interviewer);
  }

  //Place the JSX between the input and the InterviewerList in the Form component. (Line 50)
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={name}
            placeholder="Enter Student Name"
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
