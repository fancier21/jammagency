/* Модальне вікно
------------------------------------------------------- */
export function ModalWindow() {
  const page = document.querySelector("body");
  let self = this;

  // відкрити модальне вікно
  page.addEventListener("click", (e) => {
    let modalOpen = e.target.closest(".js-modal-open");

    if (!modalOpen) {
      return;
    }

    e.preventDefault();

    let modalWindow = document.querySelector(modalOpen.dataset.id);
    self.openModalWindow(modalWindow);
  });

  // закрити модальне вікно
  page.addEventListener("click", (e) => {
    let modalClose = e.target.closest(".js-modal-close");

    if (!modalClose) {
      return;
    }

    e.preventDefault();

    let modalWindow = document.querySelector(modalClose.dataset.id);
    self.closeModalWindow(modalWindow); // закриваємо модальне вікно
  });

  /* Закрити модальне вікно по клику на документ
	------------------------------------------------------- */
  document.addEventListener("click", outsideModalWindow);
  document.addEventListener("touchstart", outsideModalWindow);

  function outsideModalWindow(e) {
    if (!e.target.closest(".modal-box")) {
      return;
    }
    if (e.target.closest(".js-modal")) {
      return;
    }
    let modal = document.querySelector(".modal-box.open");
    self.closeModalWindow(modal); // закриваємо модальне вікно
    e.stopPropagation();
  }

  /* Закрити модальне вікно по клику на клавішу "Esc"
	------------------------------------------------------- */
  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      let modal = document.querySelector(".modal-box.open");
      self.closeModalWindow(modal); //закриваємо модальне вікно
    }
  });

  self.openModalWindow = ($modal) => {
    let $modalOpen = document.querySelector(".modal-box.open");

    if ($modalOpen) {
      $modalOpen.classList.replace("zoomIn", "zoomOut");

      setTimeout(function () {
        $modalOpen.classList.remove("open");
        $modal.classList.remove("zoomOut");
        $modal.classList.add("open", "zoomIn");
      }, 300);
    } else {
      widthScrollOpenModal(); //додаємо ширину скролла при відкритті модального вікна
      page.classList.add("modal-open");
      $modal.classList.remove("zoomOut");
      $modal.classList.add("open", "zoomIn");
    }
  };

  /* Закрити модальне вікно
	------------------------------------------------------- */
  self.closeModalWindow = ($modal) => {
    widthScrollCloseModal(); //забираємо ширину скролла при закритті модального вікна
    helperSlider(); // при закритті вікна очищаємо слайдер від слайдів
    page.classList.remove("modal-open");
    $modal.classList.replace("zoomIn", "zoomOut");

    setTimeout(function () {
      $modal.classList.remove("open");
    }, 300);
  };

  /* Додаємо ширину скролла при відкритті модального вікна
	------------------------------------------------------- */
  function widthScrollOpenModal() {
    let winWidth = window.innerWidth;
    let pageWidth = document.documentElement.clientWidth;

    if (winWidth > pageWidth) {
      page.style.paddingRight = scrollWidth + "px";
    }
  }

  /* Забираємо ширину скролла при закритті модального вікна
	------------------------------------------------------- */
  function widthScrollCloseModal() {
    page.style.paddingRight = 0;
  }

  /* При закритті вікна очищаємо слайдер від слайдів
	------------------------------------------------------- */
  function helperSlider() {
    const sliderMediaEl = document.querySelector("#js-sliderMedia");

    if (!sliderMediaEl) {
      return;
    }

    sliderMediaEl.querySelector(".js-slider-inside").innerHTML = "";
  }

  /* Визначаємо ширину скролла
	------------------------------------------------------- */
  //створимо елемент з прокруткою
  let div = document.createElement("div");

  div.style.overflowY = "scroll";
  div.style.width = "50px";
  div.style.height = "50px";

  //ми повинні вставити елемент в документ, інакше розміри будуть рівні 0
  page.appendChild(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();

  return self;
}
