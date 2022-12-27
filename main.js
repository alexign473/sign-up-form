const select = (selector) => document.querySelector(selector);

const firstName = select('#first-name'),
  email = select('#email'),
  password = select('#password'),
  confirmPassword = select('#confirm-password'),
  form = select('#sign-up-form');

const showError = (input, message) => {
  const formGroup = input.parentElement;
  const errorContainer = formGroup.querySelector('.error');
  const errorIcon = formGroup.querySelector('.error-icon');
  const successIcon = formGroup.querySelector('.success-icon');

  errorContainer.textContent = message;
  input.style.border = '2px solid var(--c-error)';
  errorIcon.style.opacity = '1';
  successIcon.style.opacity = '0';
};

const showSuccess = (input) => {
  const formGroup = input.parentElement;
  const errorContainer = formGroup.querySelector('.error');
  const errorIcon = formGroup.querySelector('.error-icon');
  const successIcon = formGroup.querySelector('.success-icon');

  errorContainer.textContent = '';
  input.style.border = '2px solid green';
  errorIcon.style.opacity = '0';
  successIcon.style.opacity = '1';
};

const checkRequired = (input, message) => {
  if (input.value.trim() === '') {
    showError(input, message);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
};

const checkEmail = (email) => {
  if (!checkRequired(email, 'Please enter an email address')) return false;

  if (!email.checkValidity()) {
    showError(email, 'Please enter a valid email');
    return false;
  } else {
    return true;
  }
};

const checkPassword = (password) => {
  if (!checkRequired(password, 'Please enter a password')) return false;

  if (!isPasswordSecure(password.value.trim())) {
    showError(
      password,
      'Password must has at least 8 characters that include at least 1 uppercase character, 1 lowercase character and 1 number'
    );
    return false;
  } else {
    return true;
  }
};

const checkConfirmPassword = (password, confirmPassword) => {
  if (!checkRequired(confirmPassword, 'Please confirm your password'))
    return false;

  if (password.value.trim() !== confirmPassword.value.trim()) {
    showError(confirmPassword, 'Passwords do not match');
    return false;
  } else {
    return true;
  }
};

const checkPhone = (phone) => {
  if (!isPhoneNumbers(+phone.value.trim())) {
    showError(phone, 'The phone number must be a 10 digit or less number');
    return false;
  } else {
    showSuccess(phone);
    return true;
  }
};

const isPasswordSecure = (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  return re.test(password);
};

const isPhoneNumbers = (number) => {
  const re = /^[0-9]{10}$/;
  return re.test(+number);
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

  const isFirstNameValid = checkRequired(firstName, 'Please enter your name');
  const isEmailValid = checkEmail(email);
  const isPasswordValid = checkPassword(password);
  const isConfirmPasswordValid = checkConfirmPassword(
    password,
    confirmPassword
  );

  const isFormValid =
    isFirstNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid;

  if (isFormValid) alert('Success');
};

const validateInput = (e) => {
  switch (e.target.id) {
    case 'first-name':
      checkRequired(firstName, 'Please enter your name');
      break;
    case 'email':
      checkEmail(email);
      break;
    case 'phone':
      checkPhone(phone);
      break;
    case 'password':
      checkPassword(password);
      break;
    case 'confirm-password':
      checkConfirmPassword(password, confirmPassword);
      break;
  }
};

form.addEventListener('submit', submitForm);
form.addEventListener('input', debounce(validateInput));
