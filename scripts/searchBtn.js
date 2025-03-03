const searchBtn = document.querySelector('#search-toggle');
const searchCloseBtn = document.querySelector('#search-closeBtn');
const form = document.querySelector('form');

searchBtn.addEventListener('click', () => {
	form.classList.add('active');
	searchBtn.classList.add('active');

	if (window.innerWidth <= 991) {
		document.body.style.overflow = 'hidden';
	}
});

searchCloseBtn.addEventListener('click', e => {
	e.preventDefault();
	form.classList.remove('active');
	searchBtn.classList.remove('active');

	document.body.style.overflow = 'auto';
});
