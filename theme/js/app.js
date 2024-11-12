import { Slider } from "./slider.js"; // слайдер
import { SideModal } from "./sideModal.js"; // бокове модальне вікно
import "./send.js";
import "./hero.js";

document.addEventListener("DOMContentLoaded", function () {
  const modalSide = new SideModal();

  // LazyLoadVideo();

  /* Слайдер
	------------------------------------------------------- */
  if (document.querySelector("#js-sliderIntro")) {
    new Slider({
      container: "#js-sliderIntro",
      margin: 0,
      item: 1,
      autoplay: true,
    });
  }
});

(function init100vh() {
  function setHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  setHeight();
  window.addEventListener("resize", setHeight);
})();

// function LazyLoadVideo() {
// 	const videos = [...document.querySelectorAll('.js-video.lazy')];

// 	const observer = new IntersectionObserver((entries) => {
// 		entries.forEach((entry) => {
// 			if (entry.isIntersecting) {
// 				const video = entry.target;
// 				video.src = video.dataset.src;
// 				video.classList.remove('lazy');
// 				video.addEventListener('canplaythrough', () => {
// 					video.click();
// 				});
// 				video.addEventListener('click', videoPlay);
// 				observer.unobserve(video);
// 			}
// 		});
// 	});

// 	videos.forEach(video => {
// 		observer.observe(video);
// 	});
// }

// /* Відтворити відео
// ------------------------------------------------------- */
// function videoPlay(event) {
// 	const video = event.target;

// 	if (video.paused) {
// 		video.play();
// 	}
// }

/* checkbox
------------------------------------------------------- */
(function checkbox() {
  const checkbox = document.querySelectorAll(".js-checkbox");
  checkbox.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      if (item.classList.contains("checked")) {
        item.classList.remove("checked");
      } else {
        item.classList.add("checked");
      }
    });
  });
})();
