const select = (selector) => document.querySelector(selector);
const classes = (classes) => document.getElementsByClassName(classes);

const firstName = select('#first-name'),
  email = select('#email'),
  password = select('#password'),
  confirmPassword = select('#confirm-password'),
  form = select('#sign-up-form'),
  errorMsg = classes('error'),
  successIcon = classes('success-icon'),
  failureIcon = classes('failure-icon');

const showError = (input, index, message) => {
  errorMsg[index].textContent = message;
  input.style.border = '2px solid var(--c-error)';
  // icons
  failureIcon[index].style.opacity = '1';
  successIcon[index].style.opacity = '0';
};

const showSuccess = (input, index) => {
  errorMsg[index].textContent = '';
  input.style.border = '2px solid green';
  // icons
  failureIcon[index].style.opacity = '0';
  successIcon[index].style.opacity = '1';
};

const checkRequired = (input, index, message) => {
  if (input.value.trim() === '') {
    showError(input, index, message);
    return false;
  } else {
    showSuccess(input, index);
    return true;
  }
};

const checkEmail = (email, index) => {
  if (!checkRequired(email, index, 'Please enter an email address'))
    return false;

  if (!email.checkValidity()) {
    showError(email, index, 'Please enter a valid email');
    return false;
  } else {
    return true;
  }
};

const checkPassword = (password, index) => {
  if (!checkRequired(password, index, 'Please enter a password')) return false;

  if (!isPasswordSecure(password.value.trim())) {
    showError(
      password,
      index,
      'Password must has at least 8 characters that include at least 1 uppercase character, 1 lowercase character and 1 number'
    );
    return false;
  } else {
    return true;
  }
};

const checkConfirmPassword = (confirmPassword, index) => {
  if (!checkRequired(confirmPassword, index, 'Please confirm your password'))
    return false;
  if (password.value.trim() !== confirmPassword.value.trim()) {
    showError(confirmPassword, index, 'Passwords do not match');
    return false;
  } else {
    return true;
  }
};

const checkPhone = (phone, index) => {
  if (!isPhoneNumbers(+phone.value.trim())) {
    showError(
      phone,
      index,
      'The phone number must be a 10 digit or less number'
    );
    return false;
  } else {
    showSuccess(phone, index);
    return true;
  }
};

const isPasswordSecure = (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  return re.test(password);
};

const isPhoneNumbers = (number) => {
  const re = /^[0-9]{10}$/;
  return re.test(number);
};

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

const submitForm = (e) => {
  e.preventDefault();

  const isFirstNameValid = checkRequired(
    firstName,
    0,
    'Please enter your name'
  );
  const isEmailValid = checkEmail(email, 2);
  const isPasswordValid = checkPassword(password, 4);
  const isConfirmPasswordValid = checkConfirmPassword(confirmPassword, 5);

  const isFormValid =
    isFirstNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid;

  if (!isFormValid) {
    e.preventDefault();
    console.log('not valid');
  } else {
    console.log('valid');
  }
};

const validateInput = (e) => {
  switch (e.target.id) {
    case 'first-name':
      checkRequired(firstName, 0, 'Please enter your name');
      break;
    case 'email':
      checkEmail(email, 2);
      break;
    case 'phone':
      checkPhone(phone, 3);
      break;
    case 'password':
      checkPassword(password, 4);
      break;
    case 'confirm-password':
      checkConfirmPassword(confirmPassword, 5);
      break;
  }
};

form.addEventListener('submit', submitForm);
form.addEventListener('input', debounce(validateInput));
