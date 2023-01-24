import { useState } from "react";

const SimpleInput = () => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== '';
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const enteredEmailIsValid = enteredEmail.trim() !== '';
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;
  const enteredEmailContentIsValid =
      enteredEmail.includes('@')
      && enteredEmail.includes('.');
  const emailContentIsInvalid = !enteredEmailContentIsValid && enteredEmailTouched;

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid && enteredEmailContentIsValid) {
    formIsValid = true;
  }
  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setEnteredNameTouched(true);

    if (!enteredNameIsValid) {
      return;
    }

    //nameInputRef.current.value = ''; => Not ideal, manipulates the DOM
    setEnteredName('');
    setEnteredNameTouched(false);
    setEnteredEmail('');
    setEnteredEmailTouched(false);
  };

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputIsInvalid && emailContentIsInvalid
    ? "form-control invalid"
    : "form-control";

  const onBlurHandler = () => {
    setEnteredNameTouched(true);
  };
  const onEmailBlurHandler = () => {
    setEnteredEmailTouched(true);
  }

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={onBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && (
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
        {(function(){
          if (emailInputIsInvalid) {
            return <p className="error-text">Email must not be empty.</p>
          } else if (emailContentIsInvalid) {
            return <p className="error-text">Email must be valid.</p>
          }
        }).call(this)}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
