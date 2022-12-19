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

const engine = (input, index, message) => {
  if (input.value.trim() === '') {
    errorMsg[index].textContent = message;
    input.style.border = '2px solid var(--c-border-error)';
    // icons
    failureIcon[index].style.opacity = '1';
    successIcon[index].style.opacity = '0';
  } else {
    errorMsg[index].textContent = '';
    input.style.border = '2px solid green';
    // icons
    failureIcon[index].style.opacity = '0';
    successIcon[index].style.opacity = '1';
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  engine(firstName, 0, 'Please enter your name');
  engine(email, 1, 'Please enter an email address');
  engine(password, 2, 'Please enter a password');
  engine(confirmPassword, 3, 'Please enter a password');
});
