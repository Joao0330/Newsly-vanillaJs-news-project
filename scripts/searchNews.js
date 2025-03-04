import { fetchNews } from '../lib/api.js';
import { apiKey } from '../lib/config.js';
import { defaultTemplate } from '../lib/newsContentTemplates.js';

const loader = document.querySelector('.loader');
const searchForm = document.querySelector('#searchNewsForm');
const searchInput = document.querySelector('form input');
const newsLanguage = document.querySelector('#languageNews');
const newsSort = document.querySelector('#sortNews');
const topicTitle = document.querySelector('.searchNews__empty p');
const newsCards = document.querySelector('.news__content-cards');

const pageLoader = () => {
	loader.classList.remove('hidden');
	document.body.style.overflow = 'hidden';
};

const createArticleHTML = article => {
	const { url, urlToImage, title, author, publishedAt } = article;
	const imageUrl = urlToImage || '../../assets/news-placeholder.png';
	const authorName = author || 'Unknown Author';
	const date = new Date(publishedAt).toLocaleDateString();

	const templateData = { url, imageUrl, title, authorName, date };

	return defaultTemplate(templateData);
};

export const searchNews = async query => {
	let apiUrl = `https://newsapi.org/v2/everything?q="${encodeURIComponent(query)}"&apiKey=${apiKey}`;

	pageLoader();

	// Sort news by publishedAt, relevance, or popularity
	switch (newsSort.value) {
		case 'publishedAt':
			apiUrl += '&sortBy=publishedAt';
			break;
		case 'relevance':
			apiUrl += '&sortBy=relevance';
			break;
		case 'popularity':
			apiUrl += '&sortBy=popularity';
			break;
		default:
			break;
	}

	// Sort news by language
	switch (newsLanguage.value) {
		case 'en':
			apiUrl += '&language=en';
			break;
		case 'pt':
			apiUrl += '&language=pt';
			break;
		case 'es':
			apiUrl += '&language=es';
			break;
		case 'fr':
			apiUrl += '&language=fr';
			break;
		case 'it':
			apiUrl += '&language=it';
			break;
		case 'de':
			apiUrl += '&language=de';
			break;
		case 'nl':
			apiUrl += '&language=nl';
			break;
		case 'no':
			apiUrl += '&language=no';
			break;
		case 'sv':
			apiUrl += '&language=sv';
			break;
		case 'ru':
			apiUrl += '&language=ru';
			break;
		default:
			break;
	}

	try {
		const news = await fetchNews(apiUrl);

		if (news.length === 0) {
			console.error('No news articles found.');
			return;
		}

		newsCards.innerHTML = '';

		/* const newsArticles = news.slice(0, 13); */
		news.forEach(article => {
			newsCards.innerHTML += createArticleHTML(article);
		});

		topicTitle.textContent = `Search results for: "${query}"`;

		console.log(news);
	} finally {
		loader.classList.add('hidden');
		document.body.style.overflow = 'auto';
	}
};

searchForm.addEventListener('submit', e => {
	e.preventDefault();
	const query = searchInput.value.trim();
	if (query) {
		searchNews(query);
	}
});

/* setTimeout(() => {
	loader.classList.add('hidden');
	document.body.style.overflow = 'auto';
}, 3000); */
