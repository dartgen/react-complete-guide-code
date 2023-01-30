import { useState } from "react";

import useInput from "../Hooks/useInput";

const SimpleInput = () => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const enteredEmailIsValid = enteredEmail.trim() !== "";
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;
  const enteredEmailContentIsValid =
    enteredEmail.includes("@") && enteredEmail.includes(".");
  const emailContentIsInvalid =
    !enteredEmailContentIsValid && enteredEmailTouched;

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid && enteredEmailContentIsValid) {
    formIsValid = true;
  }
  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid) {
      return;
    }

    //nameInputRef.current.value = ''; => Not ideal, manipulates the DOM
    resetNameInput();

    setEnteredEmail("");
    setEnteredEmailTouched(false);
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses =
    emailInputIsInvalid && emailContentIsInvalid
      ? "form-control invalid"
      : "form-control";

  const onEmailBlurHandler = () => {
    setEnteredEmailTouched(true);
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="text"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={onEmailBlurHandler}
          value={enteredEmail}
        />
        {function () {
          if (emailInputIsInvalid) {
            return <p className="error-text">Email must not be empty.</p>;
          } else if (emailContentIsInvalid) {
            return <p className="error-text">Email must be valid.</p>;
          }
        }.call(this)}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
