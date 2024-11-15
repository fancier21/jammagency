import { ModalWindow } from "./modal.js";

const modal = new ModalWindow();

// Form and Element Selectors
const form = document.querySelector("#feedback-form");
const usernameEl = form.querySelector("#username");
const phoneEl = form.querySelector("#phone");
const emailEl = form.querySelector("#email");
const messageEl = form.querySelector("#message");
const submitButton = form.querySelector("#feedback-submit");
const responseMessage = document.getElementById("response-message");

// Validation Constants
const USERNAME_MIN = 3;
const USERNAME_MAX = 25;
const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let isSubmitting = false;

// Utility Functions
const isRequired = (value) => value.trim() !== "";
const isBetween = (length, min, max) => length >= min && length <= max;
const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove("success");
  formField.classList.add("error");
  formField.querySelector("small").textContent = message;
};
const showSuccess = (input) => {
  const formField = input.parentElement;
  formField.classList.remove("error");
  formField.classList.add("success");
  formField.querySelector("small").textContent = "";
};

// Field Validators
const validateField = (input, validator, message) => {
  const valid = validator(input.value.trim());
  valid ? showSuccess(input) : showError(input, message);
  return valid;
};
const validateUsername = () =>
  validateField(
    usernameEl,
    (value) =>
      isRequired(value) && isBetween(value.length, USERNAME_MIN, USERNAME_MAX),
    `Username must be between ${USERNAME_MIN} and ${USERNAME_MAX} characters.`,
  );
const validatePhone = () =>
  validateField(
    phoneEl,
    (value) => isRequired(value) && PHONE_REGEX.test(value),
    "Invalid phone number.",
  );
const validateEmail = () =>
  validateField(
    emailEl,
    (value) => isRequired(value) && EMAIL_REGEX.test(value),
    "Invalid email address.",
  );
const validateMessage = () =>
  validateField(messageEl, isRequired, "Message cannot be blank.");

// Handle Form Submission
const handleFormSubmit = async (e) => {
  e.preventDefault();

  if (isSubmitting) return;

  const isFormValid = [
    validateUsername(),
    validatePhone(),
    validateEmail(),
    validateMessage(),
  ].every((valid) => valid);

  if (!isFormValid) return;

  if (document.getElementById("honeypot").value) {
    responseMessage.innerHTML = "Spam detected!";
    return;
  }

  const formData = new FormData(form);
  formData.append("action", "send_feedback");

  try {
    isSubmitting = true;
    submitButton.disabled = true;

    const response = await fetch(feedbackFormAjax.ajax_url, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    responseMessage.innerHTML = data.data.message;

    modal.openModalWindow(document.querySelector("#js-modalSuccess"));

    if (data.success) {
      form.reset();
    }
  } catch (error) {
    responseMessage.innerHTML = "Network error. Please try again later.";
  } finally {
    submitButton.disabled = false;
    isSubmitting = false;
  }
};

// Event Listeners
form.addEventListener("submit", handleFormSubmit);
form.addEventListener(
  "input",
  debounce((e) => {
    switch (e.target.id) {
      case "username":
        validateUsername();
        break;
      case "phone":
        validatePhone();
        break;
      case "email":
        validateEmail();
        break;
      case "message":
        validateMessage();
        break;
    }
  }),
);

// Debounce Utility
function debounce(fn, delay = 500) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
