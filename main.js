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
  if (input.required && input.value.trim() === '') {
    showError(input, message);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
};

const checkEmail = (input) => {
  if (!checkRequired(input, 'Please enter an email address')) return false;

  const isValid = input.checkValidity();
  if (!isValid) {
    showError(input, 'Please enter a valid email');
  }
  return isValid;
};

const checkPassword = (input) => {
  if (!checkRequired(input, 'Please enter a password')) return false;

  const isValid = isPasswordSecure(input.value);
  if (!isValid) {
    showError(
      input,
      'Password must has at least 8 characters that include at least 1 uppercase character, 1 lowercase character and 1 number'
    );
  }
  return isValid;
};

const checkConfirmPassword = (password, confirmPassword) => {
  if (!checkRequired(confirmPassword, 'Please confirm your password'))
    return false;

  const isValid = password.value.trim() === confirmPassword.value.trim();
  if (!isValid) {
    showError(confirmPassword, 'Passwords do not match');
  }
  return isValid;
};

const checkPhone = (phone) => {
  if (!checkRequired(phone, 'Please enter a phone')) return false;

  const isValid = isPhoneNumbers(phone.value.trim());
  if (!isValid) {
    showError(phone, 'The phone number must be a 10 digit or less number');
  }
  return isValid;
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

const validateForm = () => {
  const isFormValid = [
    checkRequired(firstName, 'Please enter your name'),
    checkEmail(email),
    checkPassword(password),
    checkConfirmPassword(password, confirmPassword),
  ].every((fn) => fn === true);

  if (isFormValid) alert('Success');
};

const submitForm = (e) => {
  e.preventDefault();
  validateForm();
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

form.setAttribute('novalidate', '');
form.addEventListener('submit', submitForm);
form.addEventListener('input', debounce(validateInput));
