const hamburgerBtn = document.querySelector('.navbar__hamburger');
const closeBtn = document.querySelector('#mobile-closeBtn');
const navbar = document.querySelector('nav');

hamburgerBtn.addEventListener('click', () => {
	navbar.classList.toggle('active');
});

closeBtn.addEventListener('click', () => {
	navbar.classList.remove('active');
});
