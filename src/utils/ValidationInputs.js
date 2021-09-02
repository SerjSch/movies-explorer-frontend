function inputValidation(inputname, value) {
  let errors = {};
  if (inputname === 'email') {
    if (!value) {
      errors = { [inputname]: 'Введите Ваш email' };
    } else if (!/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(value)) {
      errors = { [inputname]: 'Вы ввели Email не корректно' };
    }
  }
  if (inputname === 'password') {
    if (!value) {
      errors = { [inputname]: 'Введите пароль минимум 6 символов' };
    }
  }
  if (inputname === 'name') {
    if (!value) {
      errors = { [inputname]: 'Введите свое имя' };
    } else if (value.length < 2) {
      errors = { [inputname]: 'Имя должно быть более 2 символов' };
    }
  }
  return errors;
}
export default inputValidation;
