const btn = document.querySelector('#scrollToTop');

window.addEventListener('scroll', () => {
	const scrollPosition = window.scrollY;
	if (scrollPosition > 200) {
		btn.classList.add('active');
	} else {
		btn.classList.remove('active');
	}
});

btn.addEventListener('click', () => {
	window.scrollTo(0, 0);
});
