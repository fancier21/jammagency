/* Слайдер
------------------------------------------------------- */
export function Slider(options) {
  let config = Object.assign(
    {},
    {
      container: "", //слайдер
      desktopWidth: 1440, //мінімальна ширина desktop екрана
      items: 1, //показувати слайдів
      duration: 500, //тривалість анімації
      margin: 0, //відступ між слайдами
      gallery: false,
      padding: 0, //внутрішній відступ в галереї
      dots: false, //перемикачі на конкретний слайд,
      dotsText: false, //текст в пункті перемикача
      dotsImg: false, //міниатюра зображення в пункті перемикача
      dotsProgress: false, //прогрес зміни слайда
      imgLinear: false, //ефект зміни зображення в слайді
      autoplay: false, //true - автозаміна слайда
      center: false, //слайдер по центру
      fixedWidth: 0,
      responsive: {
        480: {
          items: 1,
        },
        768: {
          items: 1,
        },
        1024: {
          items: 1,
        },
        1280: {
          items: 1,
        },
        1440: {
          items: 1,
        },
      },
    },
    options,
  );

  let self = this;
  const el = document.querySelector(config.container);
  const wrapEl = el.closest(".js-wrap-slider") ?? el;
  const slider_inside = el.querySelector(".js-slider-inside"); //контейнер із слайдами
  const btnPrev = wrapEl.querySelector(".js-prev-slide"); //кнопка назад
  const btnNext = wrapEl.querySelector(".js-next-slide"); //кнопка вперед
  const infoActive = el.querySelector(".js-infoActive"); //для виводу інформації номер активного слайда
  const infoTotal = el.querySelector(".js-infoTotal"); //для виводу інформації всього слайдів
  const progressLine = wrapEl.querySelector(".js-progress-line"); //прогрес прокручування слайда
  let $items = config.items; //показувати слайдів
  let $margin = config.margin; //відступ між слайдами
  let $dots = config.dots; //перемикачі на конкретний слайд
  let $slides = el.querySelectorAll(".js-slide"); //слайди
  let $length0 = $slides.length; // кількість унікальних слайдів
  let $length = $length0; // кількість слайдів всього разом із клонами
  let $slide_width = 0; //ширина слайда
  let $fixedWidth = config.fixedWidth; //фіксована ширина слайда
  let $move = false; //true - слайдер рухається
  let $clones = 0; //кількість клонованих слайдів з кожного боку
  let slideIndex = 0; //індекс поточного слайда
  let posInit = 0;
  let posX1 = 0;
  let posX2 = 0;
  let posY1 = 0;
  let posY2 = 0;
  let posFinal = 0;
  let isSwipe = false;
  let isScroll = false;
  let allowSwipe = true;
  let posThreshold = 0; //поріг для переключення слайда
  let trfRegExp = /([-0-9.]+(?=px))/;
  let indexLast = 0; // номер останньої активної точки
  let win_width = 0; //ширина вікна
  let allowInit = true; //true - дозволити ініціалізацію слайдера
  let timer;
  let progressTimer;
  let sliderProgressWidth = 0; //ширина контейнера прогрес лінії
  let progressWidth = 0; //ширина прогрес лінії

  //слайдер по центру
  let $center = config.center;
  let sliderPadding = 0;

  if (infoTotal) {
    infoTotal.textContent = $length0;
  }

  this.init = function (indexInit) {
    win_width = window.innerWidth; //ширина вікна
    let slider_width = el.offsetWidth; //ширина слайдера
    //slider_width = config.gallery ? win_width - config.padding : slider_width;

    if (!isEmpty(config.responsive)) {
      for (let key in config.responsive) {
        let responsive = config.responsive[key];

        if (win_width <= key) {
          $items =
            responsive.items !== undefined ? responsive.items : config.items;
          $margin =
            responsive.margin !== undefined ? responsive.margin : config.margin;
          $dots = responsive.dots !== undefined ? responsive.dots : config.dots;
          $fixedWidth =
            responsive.fixedWidth !== undefined
              ? responsive.fixedWidth
              : config.fixedWidth;
          $center =
            responsive.center !== undefined ? responsive.center : config.center;
          break;
        }
      }
    }

    if (win_width > config.desktopWidth) {
      $items = config.items;
      $margin = config.margin;
      $dots = config.dots;
      $fixedWidth = config.fixedWidth;
      $center = config.center;
    }

    $clones = $items - 1; //кількість клонованих слайдів з кожного боку

    if ($items == 1) {
      $clones = 1;
    } else if ($items == 2) {
      $clones = 2;
    }

    slideIndex = indexInit ? indexInit : $clones; //крок слайдера

    $slide_width = (slider_width - $margin * ($items - 1)) / $items;
    $slide_width = $fixedWidth > 0 ? $fixedWidth : $slide_width;
    //$slide_width = config.gallery ? slider_width : $slide_width;
    posThreshold = $slide_width * 0.2;

    //слайдер по центру
    if ($center) {
      let slideWidthMargin = $slide_width + $margin;
      sliderPadding =
        (document.documentElement.clientWidth - slideWidthMargin) / 2;
      el.style.paddingLeft = sliderPadding + "px";
    } else {
      el.style.paddingLeft = 0;
    }

    //прогрес
    if (progressLine) {
      let sliderProgress = wrapEl.querySelector(".slider-progress");
      sliderProgressWidth = sliderProgress.offsetWidth; //ширина контейнера прогрес лінії
      progressWidth = sliderProgressWidth / $length0; //ширина прогрес лінії
      progressLine.style.width = progressWidth + "px";
    }

    el.querySelectorAll(".js-clone, .js-clone0").forEach(function (item) {
      item.remove();
    });

    //якщо не вистачає слайдів
    if ($length0 < $items) {
      let $n = $items - $length0; // скільки не вистачає слайдів

      while ($n > 0) {
        $slides.forEach(function (item) {
          if ($n > 0) {
            //додаємо клоновані слайди зправа
            let clone = item.cloneNode(true);
            clone.classList.add("js-clone0");
            let slides2 = el.querySelectorAll(".js-slide");
            slides2[slides2.length - 1].after(clone);
          }

          $n--;
        });
      }

      $slides = el.querySelectorAll(".js-slide"); //слайди
      $length0 = $items;
    }

    //з якого номера додавати клони вліво
    let $index_left = $length0 - $clones;

    $slides.forEach(function (item, index) {
      item.style.removeProperty("display");
      item.style.width = "";
      item.style.width = $slide_width + "px";
      item.dataset.index = index;

      if (index + 1 > $index_left || index < $clones) {
        if (index < $clones) {
          //додаємо клоновані слайди зправа
          let clone = item.cloneNode(true);
          clone.classList.add("js-clone");
          let slides2 = el.querySelectorAll(".js-slide");
          slides2[slides2.length - 1].after(clone);
        }

        if (index + 1 > $index_left) {
          //додаємо клоновані слайди зліва
          let clone = item.cloneNode(true);
          clone.classList.add("js-clone");
          $slides[0].before(clone);
        }
      }
    });

    $length = el.querySelectorAll(".js-slide").length;
    slider_inside.style.width = ($slide_width + $margin) * $length + "px";

    let dots_box = wrapEl.querySelector(".slider-dots");

    if ($dots) {
      if (dots_box) {
        dots_box.classList.remove("hidden");
      } else {
        dots(); //додаємо точки
      }
    } else {
      if (dots_box) {
        dots_box.classList.add("hidden");
      }
    }

    moveSlider(false);
  };

  self.init();

  window.addEventListener("resize", function () {
    if (win_width != window.innerWidth && allowInit) {
      self.init();
    }
  });

  // додаємо точки
  function dots() {
    let $wrapper = document.createElement("ul");
    $wrapper.className = "slider-dots";

    if ($center) {
      $wrapper.style.marginLeft = -(sliderPadding / 2) + "px";
    }

    for (let i = 0; i < $slides.length; i++) {
      let $class_active = i == 0 ? "active" : "";
      let $item = document.createElement("li");
      $item.className = "slider-dots-item " + $class_active + " js-dot";
      $item.dataset.index = i;

      if (config.dotsText) {
        $item.textContent = $slides[i].dataset.dotText;
      }

      if (config.dotsImg) {
        let img = document.createElement("img");
        img.src = $slides[i].dataset.thumbnail;
        $item.append(img);
      }

      if (config.dotsProgress) {
        $item.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="slider-dots-item-progress">
					<circle class="slider-dots-item-progressBg js-dot-progress" fill="none" stroke-linecap="round" cx="15" cy="15" r="14" />
				</svg>`;
      }

      $item.addEventListener("click", dotClick);
      $wrapper.appendChild($item);
    }

    if (config.dotsText) {
      let div = document.createElement("div");
      div.className = "wrap-slider-dots wrap";
      div.prepend($wrapper);
      wrapEl.prepend(div);
    } else {
      wrapEl.append($wrapper);
    }
  }

  function dotClick(e) {
    let $target = e.target;
    let index = parseInt($target.dataset.index);

    if ($move) {
      return false;
    }

    let slideIndex2 = $clones + index;

    if (slideIndex2 > slideIndex && index < indexLast) {
      slideIndex = $length - $items;
      let $offset = ($slide_width + $margin) * slideIndex;
      sliderCSS($offset, "");
      slideIndex = slideIndex2;
      setTimeout(moveSlider, 1);
    } else {
      slideIndex = slideIndex2;
      moveSlider();
    }
  }

  if (btnPrev) {
    btnPrev.addEventListener("click", btnPrevHandler);
  }

  function btnPrevHandler(e) {
    e.preventDefault();

    if ($move) {
      return false;
    }

    slideIndex--;
    moveSlider();
  }

  if (btnNext) {
    btnNext.addEventListener("click", btnNextHandler);
  }

  function btnNextHandler(e) {
    e.preventDefault();

    if ($move) {
      return false;
    }

    slideIndex++;
    moveSlider();
  }

  function moveSlider($animation = true) {
    $move = true;
    let $transition_none = false;
    let $transition = "none";

    if ($animation) {
      $transition = "all ease " + config.duration + "ms";
    }

    let $offset = ($slide_width + $margin) * slideIndex;
    sliderCSS($offset, $transition);

    if (slideIndex == 0) {
      //якщо листаємо назад і більше одного видимого слайда
      $transition_none = true;
      slideIndex = $length0;
    } else if (slideIndex == $length - $items) {
      //якщо листаємо вперед
      $transition_none = true;
      slideIndex = $clones - 1;

      if (slideIndex == 0 && $items == 1) {
        slideIndex = 1;
      }

      if (slideIndex == 1 && $items == 2) {
        slideIndex = 2;
      }
    }

    if ($transition_none) {
      $offset = ($slide_width + $margin) * slideIndex;

      setTimeout(function () {
        sliderCSS($offset, "");
      }, config.duration);
    }

    //точки
    let dots = wrapEl.querySelectorAll(".js-dot");
    indexLast = slideIndex - $clones;

    if (indexLast < 0) {
      indexLast = $length0 + indexLast;
    }

    if (dots.length) {
      dots.forEach(function (item) {
        item.classList.remove("active");
      });

      dots[indexLast].classList.add("active");

      if (config.dotsText) {
        wrapEl.querySelector(".wrap-slider-dots").scrollTo({
          top: 0,
          left: dots[indexLast].offsetLeft,
          behavior: "smooth",
        });
      }
    }

    //клас видимих слайдів
    el.querySelectorAll(".js-slide").forEach(function (item) {
      item.classList.remove("active", "prevSlide");
    });

    let currentAll = el.querySelectorAll(
      '.js-slide[data-index="' + indexLast + '"]',
    );
    let currentItem = slideIndex > $length0 - 1 ? currentAll[1] : currentAll[0];
    currentItem.classList.add("active");

    let prevSlide = currentItem.previousElementSibling;

    for (let i = 0; i < $items - 1; i++) {
      currentItem = currentItem.nextElementSibling;
      currentItem.classList.add("active");
    }

    //клас попередніх слайдів
    prevSlideClass(prevSlide);
    function prevSlideClass(prevEl) {
      if (!prevEl) {
        return false;
      }

      prevEl.classList.add("prevSlide");
      let prevEl2 = prevEl.previousElementSibling;
      prevSlideClass(prevEl2);
    }

    //вивід інформації номер активного слайда
    if (infoActive) {
      let n = parseInt(currentItem.dataset.index) + 1;
      infoActive.textContent = n;
    }

    //прогрес
    if (progressLine) {
      let progressPos =
        ((sliderProgressWidth - progressWidth) / ($length0 - 1)) * indexLast; //поциціонування прогрес лінії
      progressLine.style.left = progressPos + "px";
      progressLine.style.transition = $transition;
    }

    //лінійний ефект зміни зображення в слайді
    if (config.imgLinear) {
      document.querySelector("#js-imgBig").src = currentItem.dataset.img;
    }

    setTimeout(function () {
      $move = false;
      allowSwipe = true;

      if (config.autoplay) {
        if (timer) {
          clearInterval(timer);
        }

        timer = setInterval(() => {
          if ($move) {
            return false;
          }

          slideIndex++;
          moveSlider();
        }, 5000);
      }
    }, config.duration);
  }

  function sliderCSS(offset, transition) {
    slider_inside.style.transform = "translate3d(-" + offset + "px, 0px, 0px)";
    slider_inside.style.transition = transition;
  }

  let swipeStart = function () {
    let evt = getEvent();

    if (allowSwipe) {
      posInit = posX1 = evt.clientX;
      posY1 = evt.clientY;
      slider_inside.style.transition = "";
      slider_inside.classList.add("grabbing");
      document.addEventListener("touchmove", swipeAction);
      document.addEventListener("mousemove", swipeAction);
      document.addEventListener("touchend", swipeEnd);
      document.addEventListener("mouseup", swipeEnd);
    }
  };

  let swipeAction = function () {
    let evt = getEvent();
    let style = slider_inside.style.transform;
    let transform = +style.match(trfRegExp)[0];

    posX2 = posX1 - evt.clientX;
    posX1 = evt.clientX;

    posY2 = posY1 - evt.clientY;
    posY1 = evt.clientY;

    // визначаємо дію свайп чи скролл
    if (!isSwipe && !isScroll) {
      let posY = Math.abs(posY2);
      if (posY > 7 || posX2 === 0) {
        isScroll = true;
        allowSwipe = false;
      } else if (posY < 7) {
        isSwipe = true;
      }
    }

    if (isSwipe) {
      // рухаємо слайд
      slider_inside.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
    }
  };

  let swipeEnd = function (e) {
    posFinal = posInit - posX1;
    isScroll = false;
    isSwipe = false;
    e = e || window.event;

    if (posFinal != 0 && e.target.closest(".js-slide")) {
      e.target.addEventListener(
        "click",
        (e) => {
          e.stopPropagation();
          e.preventDefault();
        },
        { once: true },
      );
    }

    document.removeEventListener("touchmove", swipeAction);
    document.removeEventListener("mousemove", swipeAction);
    document.removeEventListener("touchend", swipeEnd);
    document.removeEventListener("mouseup", swipeEnd);
    slider_inside.classList.remove("grabbing");

    if (allowSwipe) {
      if (Math.abs(posFinal) > posThreshold) {
        if (posInit < posX1) {
          slideIndex--;
        } else if (posInit > posX1) {
          slideIndex++;
        }
      }

      if (posInit !== posX1) {
        allowSwipe = false;
        moveSlider();
      } else {
        allowSwipe = true;
      }
    } else {
      allowSwipe = true;
    }
  };

  slider_inside.addEventListener("touchstart", swipeStart);
  slider_inside.addEventListener("mousedown", (e) => {
    e.preventDefault();
    swipeStart();
  });

  //знищити слайдер
  this.destroy = function () {
    allowInit = false;
    slider_inside.removeEventListener("touchstart", swipeStart);
    slider_inside.removeEventListener("mousedown", swipeStart);
    slider_inside.removeAttribute("style");
    slider_inside.innerHTML = "";

    if (btnPrev) {
      btnPrev.removeEventListener("click", btnPrevHandler);
    }

    if (btnNext) {
      btnNext.removeEventListener("click", btnNextHandler);
    }

    if ($dots) {
      let dotsTemp = wrapEl.querySelector(".slider-dots");

      if (dotsTemp) {
        dotsTemp.remove();
      }
    }
  };

  //перевірка об'єкта на пустоту
  function isEmpty(obj) {
    for (let key in obj) {
      return false;
    }
    return true;
  }

  let getEvent = function () {
    return event.type.search("touch") !== -1 ? event.touches[0] : event;
  };
}
