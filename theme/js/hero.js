document.addEventListener('DOMContentLoaded', () => {
	gsap.registerPlugin(ScrollTrigger);
	scBox();
});


function scBox() {
	if (! document.querySelector('#hero')) {
		return;
	}
	
	// Отримання елементів
	const mainSteps = document.querySelector('.mainSteps'); // екран із відео блоками
	const boxScroll = document.querySelector('.box-scroll');
	const images = boxScroll.querySelectorAll('img');
	const boxTitle = document.querySelector('.box-title');

	let loadedImages = 0;
	const totalImages = images.length;

	images.forEach(image => {
		if (image.complete) {
			loadedImages ++;

			if (loadedImages === totalImages) {
				// Всі зображення завантажено
				scrollAnimation();
			}
		} else {
			image.onload = () => {
				loadedImages ++;
				console.log('onload');

				if (loadedImages === totalImages) {
					// Всі зображення завантажено
					scrollAnimation();
				}
			};
		}
	});


	function scrollAnimation() {
		let img1 = () => {
			const tl = gsap.timeline();
			const el = images[0];
			const obj = templateBase(el, {});
			tl.to(el, obj)
			.to(el, {
				rotation: 20,
				scrollTrigger: {
					trigger: boxScroll,
					start: '132px',
					end: '+=50%',
					scrub: true,
				}
			})
			.to(el, {
				rotation: 0,
				scrollTrigger: {
					trigger: boxScroll,
					start: '+=50%',
					end: '+=80%',
					scrub: true,
				}
			});
			return tl;
		};
	
	
		let img2 = () => {
			const tl = gsap.timeline();
			const el = images[1];
			const obj = templateBase(el, {scale: 0.8});
			tl.to(el, obj)
			.to(el, {
				rotation: -20,
				scrollTrigger: {
					trigger: boxScroll,
					start: '132px',
					end: '+=50%',
					scrub: true,
				}
			})
			.to(el, {
				rotation: 10,
				scrollTrigger: {
					trigger: boxScroll,
					start: '+=50%',
					end: '+=80%',
					scrub: true,
				}
			});
			return tl;
		};
	
	
		let img3 = () => {
			const tl = gsap.timeline();
			const el = images[2];
			const obj = templateBase(el, {rotation: -30});
			tl.to(el, obj);
			return tl;
		};
	
	
		let img4 = () => {
			const tl = gsap.timeline();
			const el = images[3];
			const obj = templateBase(el, {scale: 0.8});
			tl.to(el, obj)
			.to(el, {
				rotation: -30,
				scrollTrigger: {
					trigger: boxScroll,
					start: '132px',
					end: '+=50%',
					scrub: true,
				}
			})
			.to(el, {
				rotation: -10,
				scrollTrigger: {
					trigger: boxScroll,
					start: '+=50%',
					end: '+=80%',
					scrub: true,
				}
			});
			return tl;
		};
	
	
		let img5 = () => {
			const tl = gsap.timeline();
			const el = images[4];
			const obj = templateBase(el, {});
			tl.to(el, obj)
			.to(el, {
				rotation: 30,
				scrollTrigger: {
					trigger: boxScroll,
					start: '132px',
					end: '+=50%',
					scrub: true,
				}
			})
			.to(el, {
				rotation: 10,
				scrollTrigger: {
					trigger: boxScroll,
					start: '+=50%',
					end: '+=80%',
					scrub: true,
				}
			});
			return tl;
		};
	
	
		let img6 = () => {
			const tl = gsap.timeline();
			const el = images[5];
			const obj = templateBase(el, {scale: 0.8});
			tl.to(el, obj)
			.to(el, {
				rotation: 30,
				scrollTrigger: {
					trigger: boxScroll,
					start: '132px',
					end: '+=50%',
					scrub: true,
				}
			})
			.to(el, {
				rotation: 10,
				scrollTrigger: {
					trigger: boxScroll,
					start: '+=50%',
					end: '+=80%',
					scrub: true,
				}
			});
			return tl;
		};
	
	
		let title = () => {
			return gsap.from(boxTitle, {
				x: '-90%',
				scrollTrigger: {
					trigger: boxScroll,
					start: '132px',
					end: '+=80%',
					scrub: true,
				}
			});
		};


		let stepsSection = () => {
			return gsap.from(mainSteps, {
				scrollTrigger: {
					trigger: mainSteps,
					start: "top 20%",
					end: "bottom +=90%",
					scrub: true,
					onToggle: self => {
						if (self.isActive) {
							gsap.to(mainSteps, {
								backgroundColor: "#fff"
							});
						} else {
							gsap.to(mainSteps, {
								backgroundColor: "#242424"
							});
						}
					}
				}
			});
		};
	
	
		const tlGsap = gsap.timeline();
		tlGsap.add(img1)
		.add(img2)
		.add(img3)
		.add(img4)
		.add(img5)
		.add(img6)
		.add(title)
		.add(stepsSection);
	}


	function templateBase(el, obj) {
		const base = {
			top: '50%',
			left: '50%',
			marginLeft: `-${el.offsetWidth / 2}px`,
			marginTop: `-${el.offsetHeight / 2}px`,
			scrollTrigger: {
				trigger: boxScroll, // Тригер для скролу
				start: '132px',
				end: '+=80%',
				scrub: true, // Плавний скрол
			},
		};
		return Object.assign(base, obj);
	}
}