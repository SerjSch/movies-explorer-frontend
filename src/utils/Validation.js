import React from 'react';
import inputValidation from './ValidationInputs';

export function Validation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const onFocus = () => {
    setIsFocused(true);
  };

  const handleChange = (event) => {
    const { target } = event;
    const { name } = target;
    const { value } = target;
    const error = inputValidation(name, value);

    setErrors(inputValidation(name, value));

    setValues({ ...values, [name]: value });
    if (Object.keys(error).length === 0) {
      setIsValid(target.closest('form').checkValidity());
    }
  };

  const resetForm = React.useCallback(
    (newErrors = {}, newIsValid = false) => {
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setErrors, setIsValid]
  );
  
  return {
    handleChange,
    onFocus,
    isFocused,
    values,
    setValues,
    isValid,
    errors,
    resetForm,
  };
}

export default Validation;