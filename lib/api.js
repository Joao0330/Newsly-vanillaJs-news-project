export const fetchNews = async apiUrl => {
	try {
		const response = await fetch(apiUrl);

		if (!response.ok) {
			throw new Error('Could not fetch resource');
		}

		const data = await response.json();
		return data.articles;
	} catch (error) {
		console.error('Error fetching news:', error);
		return [];
	}
};
