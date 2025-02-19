window.addEventListener('load', () => {
	setTimeout(initializeHeroSlider, 1000);
});

function initializeHeroSlider() {
	const hero = document.querySelector('.hero');
	const heroArticles = document.querySelectorAll('.hero__featured ul li');
	const nextBtn = document.querySelector('.hero__sliderBtn-next');
	const prevBtn = document.querySelector('.hero__sliderBtn-prev');

	const updateHeroContent = activeElement => {
		const heroImage = activeElement.querySelector('img').src;
		const title = activeElement.querySelector('strong').textContent;
		const author = activeElement.getAttribute('data-author');

		hero.style.backgroundImage = `url(${heroImage})`;
		document.querySelector('.hero__title h2 a').textContent = title;
		document.querySelector('.hero__title strong').textContent = author;
	};

	const changeSlide = direction => {
		const active = document.querySelector('.hero__featured ul li.active');
		active.classList.remove('active');

		let newActive;
		if (direction === 'next') {
			newActive = active.nextElementSibling || heroArticles[0];
		} else if (direction === 'prev') {
			newActive = active.previousElementSibling || heroArticles[heroArticles.length - 1];
		}

		if (newActive) {
			newActive.classList.add('active');
			updateHeroContent(newActive);
		}
	};

	const handleArticleClick = article => {
		const active = document.querySelector('.hero__featured ul li.active');
		active.classList.remove('active');
		article.classList.add('active');
		updateHeroContent(article);
	};

	heroArticles.forEach(article => {
		article.addEventListener('click', () => handleArticleClick(article));
	});

	nextBtn.addEventListener('click', () => changeSlide('next'));
	prevBtn.addEventListener('click', () => changeSlide('prev'));

	// Auto-slide every 5 seconds
	let autoSlideInterval = setInterval(() => changeSlide('next'), 5000);

	// Pause auto-slide on user interaction
	const pauseAutoSlide = () => {
		clearInterval(autoSlideInterval);
	};

	const resumeAutoSlide = () => {
		autoSlideInterval = setInterval(() => changeSlide('next'), 5000);
	};

	hero.addEventListener('mouseenter', pauseAutoSlide);
	hero.addEventListener('mouseleave', resumeAutoSlide);
	nextBtn.addEventListener('click', pauseAutoSlide);
	prevBtn.addEventListener('click', pauseAutoSlide);
}
