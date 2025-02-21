const themeToggleBtn = document.querySelector('#theme-toggle');
const rootElement = document.documentElement;
const icon = document.querySelector('#theme-toggle i');

themeToggleBtn.addEventListener('click', () => {
	const currentTheme = rootElement.getAttribute('data-theme');
	if (currentTheme === 'dark') {
		rootElement.setAttribute('data-theme', 'light');
		icon.className = 'fa-solid fa-moon';
		localStorage.setItem('theme', 'light');
	} else {
		rootElement.setAttribute('data-theme', 'dark');
		icon.className = 'fa-solid fa-sun';
		localStorage.setItem('theme', 'dark');
	}
});

document.addEventListener('DOMContentLoaded', () => {
	const savedTheme = localStorage.getItem('theme') || 'light';

	savedTheme === 'dark' ? (icon.className = 'fa-solid fa-sun') : (icon.className = 'fa-solid fa-moon');

	rootElement.setAttribute('data-theme', savedTheme);
});
