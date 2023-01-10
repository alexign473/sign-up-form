const select = (selector) => document.querySelector(selector);

const form = select('#sign-up-form');

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

const options = [
  {
    attribute: 'required',
    invalid: (input) => input.value.trim() === '',
    errorMessage: (input) => {
      const { id } = input;
      switch (id) {
        case 'first-name':
          return 'Please enter your name';
        case 'email':
          return 'Please enter an email address';
        case 'password':
          return 'Please enter a password';
        case 'confirm-password':
          return 'Please confirm your password';
        default:
          return 'This field is required';
      }
    },
  },
  {
    attribute: 'minlength',
    invalid: (input) => input.value && input.value.length < +input.minLength,
    errorMessage: (input) =>
      `This field must be at least ${input.minLength} characters.`,
  },
];

const validations = {
  email: {
    isValid: (input) => input.checkValidity(),
    errorMessage: 'Please enter a valid email',
  },
  password: {
    isValid: (input) => {
      const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
      return re.test(input.value);
    },
    errorMessage:
      'Password must has at least 8 characters that include at least 1 uppercase character, 1 lowercase character and 1 number',
  },
  'confirm-password': {
    isValid: (input) => {
      const matchSelector = input.dataset.match;
      const matchedElem = document.querySelector(`#${matchSelector}`);
      return matchedElem && matchedElem.value === input.value;
    },
    errorMessage: 'Passwords do not match',
  },
};

const validateOptions = (input) => {
  let isValid = true;

  for (option of options) {
    if (input.hasAttribute(option.attribute) && option.invalid(input)) {
      const errorMessage = option.errorMessage(input);
      showError(input, errorMessage);
      isValid = false;
    }
  }
  if (isValid) {
    showSuccess(input);
  }
  return isValid;
};

const validateSingleInput = (input) => {
  const { id } = input;
  let isValid = true;

  let isOptionsValid = validateOptions(input);
  if (!isOptionsValid) {
    return;
  }
  if (validations[id]?.isValid) {
    isValid = validations[id].isValid(input);
    if (!isValid) {
      showError(input, validations[id].errorMessage);
    } else {
      showSuccess(input);
    }
  }

  return isValid;
};

// const isPhoneNumbers = (number) => {
//   const re = /^[0-9]{10}$/;
//   return re.test(+number);
// };

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

const sendToAPI = (formEl) => {
  const formObject = Array.from(formEl.elements)
    .filter((el) => !el.matches('button'))
    .reduce((acc, el) => ({ ...acc, [el.id]: el.value }), {});
  alert(JSON.stringify(formObject, null, 4));
};

const validateForm = (formEl) => {
  const formInputs = [...formEl.querySelectorAll('.form-group input')];
  return formInputs.every((input) => validateSingleInput(input));
};

const submitForm = (e) => {
  e.preventDefault();
  const { target } = e;
  const isFormValid = validateForm(target);

  if (isFormValid) {
    sendToAPI(target);
  }
};

const handleInput = (e) => {
  const { target } = e;
  validateSingleInput(target);
};

form.setAttribute('novalidate', '');
form.addEventListener('submit', submitForm);
form.addEventListener('input', debounce(handleInput));
