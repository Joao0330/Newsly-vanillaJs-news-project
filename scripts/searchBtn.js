const searchBtn = document.querySelector('#search-toggle');
const searchCloseBtn = document.querySelector('#search-closeBtn');
const form = document.querySelector('form');

searchBtn.addEventListener('click', () => {
	form.classList.add('active');
	searchBtn.classList.add('active');
});

searchCloseBtn.addEventListener('click', e => {
	e.preventDefault();
	form.classList.remove('active');
	searchBtn.classList.remove('active');
});
