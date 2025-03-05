const loader = document.querySelector('.loader');

// prevents user from scrolling
document.body.style.overflow = 'hidden';

setTimeout(() => {
	loader.classList.add('hidden');
	document.body.style.overflow = 'auto';
}, 500);
