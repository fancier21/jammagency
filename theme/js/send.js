import { popupInfo } from "./popupinfo.js"; // інформаційне модальне вікно
import { ModalWindow } from "./modal.js"; // модальне вікно

const errMessages = {
  emptyField: "Fill in the field",
  emptySelect: "Choose a value",
  emptyPhoto: "error.empty_photo",
  emptyBirthday: "error.empty_birthday",
  invalidTel: "Invalid phone number",
  invalidEmail: "Invalid E-mail",
};

const modal = new ModalWindow();

/* Відправка форми
------------------------------------------------------- */
function sendForm() {
  const btn = document.querySelectorAll(".js-send");

  if (!btn.length) {
    return false;
  }

  btn.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      let params = Object.assign({}, item.dataset);
      send(item, params);
    });
  });
}

sendForm();

function send(btn, params) {
  doubleClick(); // заборона відправки форми по двойному клику
  let request = {};
  const form = btn.closest(".js-form");
  const token = document.querySelector("#page").dataset.token;
  let errorForm = false; //true - заборона відправки форми
  let inputsError = document.querySelectorAll(".input-error"); //тексти помилок

  if (inputsError.length) {
    inputsError.forEach((item) => {
      item.remove();
    });
  }

  // текстові поля
  const inputs = form.querySelectorAll("input, textarea");
  if (inputs.length) {
    inputs.forEach((item) => {
      request[item.name] = item.value;

      if (!item.classList.contains("js-text")) {
        request[item.name] = item.value;
        if (emptyError(item, errMessages.emptyField, "field")) {
          return;
        }
      } else {
        // редактор тексту
        const content = tinyMCE.get("js-editor").getContent();

        if (
          item.classList.contains("js-required") &&
          removeHtmlTags(content) === ""
        ) {
          errorText(item, errMessages.emptyField);
          errorForm = true;
          return errorForm;
        }

        request[item.name] = content;
      }
    });
  }

  // випадаючі списки
  const selects = form.querySelectorAll(".js-select");
  if (selects.length) {
    selects.forEach((item) => {
      request[item.dataset.name] = item.dataset.value;

      if (emptyError(item, errMessages.emptySelect)) {
        return;
      }
    });
  }

  // радіо кнопки
  const radio = form.querySelectorAll(".js-radio-group");
  if (radio.length) {
    radio.forEach((item) => {
      request[item.dataset.name] =
        item.querySelector(".js-radio.checked").dataset.value;
    });
  }

  //зображення
  const img = form.querySelectorAll(".js-img");
  if (img.length) {
    img.forEach((item) => {
      request[item.dataset.name] = item.dataset.value;

      if (emptyError(item, errMessages.emptyImage)) {
        return;
      }
    });
  }

  // checkbox обробка персональних даних
  const personalData = form.querySelector(".js-personalData");
  if (personalData) {
    personalData.classList.remove("error");
    if (!personalData.classList.contains("checked")) {
      personalData.classList.add("error");
      errorText(personalData, errMessages.acceptTerms);
      errorForm = true;
    }
  }

  if (errorForm) {
    return false;
  }

  btn.classList.add("btn-loading");

  fetch(params.route, {
    method: "method" in params ? params.method : "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": token,
    },
    body: JSON.stringify(request),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      btn.classList.remove("btn-loading");

      if (data.status === "success") {
        // показати модальне вікно
        if (data.modalShow) {
          const modalId = "modalId" in data ? data.modalId : "js-modalSuccess";
          modal.openModalWindow(document.querySelector(`#${modalId}`));

          // показати email в модальному вікні
          if ("email" in data) {
            modalEmailShow(data.email);
          }
        }

        // показати сповіщення
        if (data.messageShow) {
          new popupInfo(data.message);
        }

        // очистка текстових полів форми
        if (!data.inputsSaved) {
          inputs.forEach((item) => {
            if (!item.classList.contains("js-hidden")) {
              item.value = "";
            }
          });
        }

        // редірект на іншу сторінку
        if (data.redirect) {
          window.location.href = data.route;
        }

        // відправка даних по API
        if (data.sendDataAPI) {
          const formStorage = document.querySelector("#js-formStorage");
          formStorage.innerHTML = data.form;
          formStorage.querySelector("form").submit();
        }

        // додати коментар
        if ("comment" in data) {
          commentAdd(Object.assign(data.comment, request));
        }

        // заміна маршруту при зміні імені
        if ("userRoute" in data) {
          changeUsername(data.userRoute);
        }
      } else if (data.status === "error") {
        new popupInfo(data.message, true);
      }
    });

  /* Заборона відправки форми по двойному клику
	------------------------------------------------------- */
  function doubleClick() {
    btn.disabled = true;

    setTimeout(() => {
      btn.disabled = false;
    }, 1000);
  }

  /* Перевірка на заповненість поля
	------------------------------------------------------- */
  function emptyError(item, text, type = "dataset") {
    /*
			dataset
			field
			checkbox
		*/

    item.classList.remove("error");

    let value;

    if (type === "dataset") {
      value = item.dataset.value;
    } else if (type === "field") {
      value = item.value;
    } else {
      value = item.dataset.value;
    }

    if (item.classList.contains("js-required") && value === "") {
      errorText(item, text);
      errorForm = true;
      return errorForm;
    }

    // перевірка email
    let pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;

    if (item.classList.contains("js-email") && !pattern.test(value)) {
      errorText(item, errMessages.invalidEmail);
      errorForm = true;
      return errorForm;
    }
  }

  /* Текст помилки
	------------------------------------------------------- */
  function errorText(input, text) {
    let el = document.createElement("div");
    el.className = "input-error";
    el.textContent = text;
    input.closest(".js-input").append(el);
    input.classList.add("error");
  }
}
