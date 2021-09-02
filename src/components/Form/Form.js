import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Form/Form.css';

function Form({
  formName,
  formPointsItem,
  submitText,
  validation,
  handleSubmit,
}) {
  const { isValid } = validation;
  return (
    <form
      className='form'
      action='post'
      name={`${formName}-form`}
      onSubmit={handleSubmit}>
      {formPointsItem}
      <button type='submit' className='form__button' disabled={!isValid}>
        {submitText.buttonText}
      </button>
      <div className='form__sign-in'>
        {`${submitText.promt} `}
        <NavLink to={submitText.route} className='form__link'>
          {submitText.linkText}
        </NavLink>
      </div>
    </form>
  );
}
export default Form;
