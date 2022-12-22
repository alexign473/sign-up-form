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
  input.style.border = '2px solid var(--c-border-error)';
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

const checkPassword = (password, index) => {
  if (!checkRequired(password, index, 'Please enter a password')) return;

  if (!isPasswordSecured(password.value.trim())) {
    showError(
      password,
      index,
      'Password must has at least 8 characters that include at least 1 uppercase character, 1 lowercase character and 1 number'
    );
  }
};

const checkConfirmPassword = (confirmPassword, index) => {
  if (!checkRequired(confirmPassword, index, 'Please confirm your password'))
    return;
  if (password.value.trim() !== confirmPassword.value.trim()) {
    showError(confirmPassword, index, 'Passwords do not match');
  }
};

const isPasswordSecured = (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  return re.test(password);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkRequired(firstName, 0, 'Please enter your name');
  checkRequired(email, 1, 'Please enter an email address');
  checkPassword(password, 2);
  checkConfirmPassword(confirmPassword, 3);
});

form.addEventListener('input', (e) => {
  switch (e.target.id) {
    case 'first-name':
      checkRequired(firstName, 0, 'Please enter your name');
      break;
    case 'password':
      checkPassword(password, 2);
      break;
    case 'confirm-password':
      checkConfirmPassword(confirmPassword, 3);
      break;
  }
});
