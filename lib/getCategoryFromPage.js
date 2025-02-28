export const getCategoryFromPage = () => {
	const path = window.location.pathname;

	if (path.includes('sports')) {
		return 'sports';
	} else if (path.includes('science')) {
		return 'science';
	} else if (path.includes('health')) {
		return 'health';
	} else if (path.includes('business')) {
		return 'business';
	} else if (path.includes('technology')) {
		return 'technology';
	} else {
		return 'home';
	}
};
