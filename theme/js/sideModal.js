/* Бокове модальне вікно
------------------------------------------------------- */
export function SideModal() {
  const page = document.querySelector("body");
  let self = this;

  // відкрити / закрити модальне вікно
  page.addEventListener("click", (e) => {
    let modalToggle = e.target.closest(".js-sideModal-toggle");

    if (!modalToggle) {
      return;
    }

    e.preventDefault();

    if (modalToggle.classList.contains("open")) {
      modalToggle.classList.remove("open");
      let sideModal = document.querySelector(modalToggle.dataset.id);
      self.closeSideModal(sideModal); // закриваємо модальне вікно
    } else {
      modalToggle.classList.add("open");
      self.openSideModal(modalToggle.dataset);
    }
  });

  // відкрити модальне вікно
  page.addEventListener("click", (e) => {
    let modalOpen = e.target.closest(".js-sideModal-open");

    if (!modalOpen) {
      return;
    }

    e.preventDefault();
    self.openSideModal(modalOpen.dataset);
  });

  // закрити модальне вікно
  page.addEventListener("click", (e) => {
    let modalClose = e.target.closest(".js-sideModal-close");

    if (!modalClose) {
      return;
    }

    e.preventDefault();
    let sideModal = document.querySelector(modalClose.dataset.id);
    self.closeSideModal(sideModal); // закриваємо модальне вікно
  });

  /* Закрити модальне вікно по клику на документ
	------------------------------------------------------- */
  document.addEventListener("click", outsideSideModal);
  document.addEventListener("touchstart", outsideSideModal);

  function outsideSideModal(e) {
    const modal = document.querySelector(".js-sideModal.open");

    if (!modal) {
      return;
    }

    if (e.target.closest(".js-sideModal.open")) {
      return;
    }
    if (e.target.closest(".js-sideModal-open")) {
      return;
    }
    if (e.target.closest(".js-sideModal-toggle")) {
      return;
    }
    if (e.target.closest(".js-video")) {
      return;
    }

    if (modal) {
      self.closeSideModal(modal); // закриваємо модальне вікно
    }

    e.stopPropagation();
  }

  /* Закрити модальне вікно по клику на клавішу "Esc"
	------------------------------------------------------- */
  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      let $modalOpen = document.querySelector(".js-sideModal.open");
      self.closeSideModal($modalOpen); //закриваємо модальне вікно
    }
  });

  self.openSideModal = (data) => {
    let $modalOpen2 = document.querySelector(".modal-box.open");
    if ($modalOpen2) {
      $modalOpen2.classList.replace("zoomIn", "zoomOut");
      setTimeout(function () {
        $modalOpen2.classList.remove("open");
      }, 300);
      page.classList.remove("form-open");
    }

    let $modalOpen = document.querySelector(".js-sideModal.open");
    if ($modalOpen) {
      self.closeSideModal($modalOpen); //закриваємо модальне вікно
    }

    widthScrollOpenModal(); //додаємо ширину скролла при відкритті модального вікна
    document.querySelector(data.id).classList.add("open");
    const maskClass = data.side === "menu" ? "menu-open" : "modal-open";
    page.classList.add(maskClass);
  };

  /* Закрити модальне вікно
	------------------------------------------------------- */
  self.closeSideModal = ($modal) => {
    widthScrollCloseModal(); //забираємо ширину скролла при закритті модального вікна
    page.classList.remove("modal-open", "menu-open");
    $modal.classList.remove("open");

    document.querySelectorAll(".js-sideModal-toggle").forEach((item) => {
      item.classList.remove("open");
    });
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

  /* Визначаємо ширину скролла
	------------------------------------------------------- */
  //створимо елемент з прокруткою
  let div = document.createElement("div");

  div.style.overflowY = "scroll";
  div.style.width = "50px";
  div.style.height = "50px";

  //потрібно вставити елемент в документ, інакше розміри будуть рівні 0
  page.appendChild(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();

  return self;
}
