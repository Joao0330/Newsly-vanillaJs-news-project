import { fetchNews } from '../lib/api.js';
import { apiKey } from '../lib/config.js';
import { defaultTemplate } from '../lib/newsContentTemplates.js';

const searchInput = document.querySelector('form input');
const searchBtn = document.querySelector('#searchNewsBtn');
const newsCards = document.querySelector('.news__content-cards');

const createArticleHTML = article => {
	const { url, urlToImage, title, author, publishedAt } = article;
	const imageUrl = urlToImage || '../../assets/news-placeholder.png';
	const authorName = author || 'Unknown Author';
	const date = new Date(publishedAt).toLocaleDateString();

	const templateData = { url, imageUrl, title, authorName, date };

	return defaultTemplate(templateData);
};

export const searchNews = async query => {
	const apiUrl = `https://newsapi.org/v2/everything?q="${encodeURIComponent(query)}"&apiKey=${apiKey}`;

	const news = await fetchNews(apiUrl);

	if (news.length === 0) {
		console.error('No news articles found.');
		return;
	}

	newsCards.innerHTML = '';

	const newsArticles = news.slice(0, 13);
	newsArticles.forEach(article => {
		newsCards.innerHTML += createArticleHTML(article);
	});

	console.log(news);
};

searchBtn.addEventListener('click', () => {
	const query = searchInput.value.trim();
	if (query) {
		searchNews(query);
	}
});
