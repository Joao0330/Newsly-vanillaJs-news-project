export const getCategoryFromPage = () => {
	const path = window.location.pathname;

	if (path.includes('sports')) {
		return 'sports';
	} else if (path.includes('politics')) {
		return 'politics';
	} else if (path.includes('gaming')) {
		return 'gaming';
	} else if (path.includes('music')) {
		return 'music';
	} else if (path.includes('tech')) {
		return 'tech';
	} else {
		return 'home';
	}
};
