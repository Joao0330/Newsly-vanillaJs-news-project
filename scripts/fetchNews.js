import { fetchNews } from '../lib/api.js';
import { apiKey } from '../lib/config.js';
import { getCategoryFromPage } from '../lib/getCategoryFromPage.js';
import { defaultTemplate, heroFeaturedTemplate, heroTemplate, sideTemplate, topTemplate } from '../lib/newsContentTemplates.js';
import { initializeHeroSlider } from './slider.js';

// DOM Elements
const loader = document.querySelector('.loader');
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero__title');
const heroFeatured = document.querySelector('.hero__featured ul');
const newsCards = document.querySelector('.news__content-cards');

const pageLoader = () => {
	loader.classList.remove('hidden');
	document.body.style.overflow = 'hidden';
};

// Generate HTML for a single article
const createArticleHTML = (article, type = 'default') => {
	const { url, urlToImage, title, author, publishedAt } = article;
	const imageUrl = urlToImage || '../../assets/news-placeholder.png';
	const authorName = author || 'Unknown Author';
	const date = new Date(publishedAt).toLocaleDateString();

	const templateData = { url, imageUrl, title, authorName, date };

	switch (type) {
		case 'hero':
			return heroTemplate(templateData);
		case 'featured':
			return heroFeaturedTemplate(templateData);
		case 'side':
			return sideTemplate(templateData);
		case 'top':
			return topTemplate(templateData);
		default:
			return defaultTemplate(templateData);
	}
};

// Display news on the page
const displayNews = async (type = 'home') => {
	let apiUrl;
	let altNews;

	pageLoader();

	if (type === 'home') {
		apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
		altNews = document.querySelector('.news__side-cards');
	} else {
		apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${type}&apiKey=${apiKey}`;
		altNews = document.querySelectorAll('.newsAlt__top div');
	}

	try {
		const news = await fetchNews(apiUrl);

		if (news.length === 0) {
			console.error('No news articles found.');
			return;
		}

		// Clear existing content
		heroContent.innerHTML = '';
		heroFeatured.innerHTML = '';
		newsCards.innerHTML = '';
		if (altNews) {
			if (type === 'home') {
				altNews.innerHTML = '';
			} else {
				altNews.forEach(card => (card.innerHTML = ''));
			}
		}

		// Hero section (first article)
		const heroArticle = news[0];
		hero.style.backgroundImage = `url(${heroArticle.urlToImage || '../../assets/news-placeholder.png'})`;
		heroContent.innerHTML = createArticleHTML(heroArticle, 'hero');

		// Featured articles (first 4 articles)
		const featuredArticles = news.slice(0, 4);
		featuredArticles.forEach(article => {
			heroFeatured.innerHTML += createArticleHTML(article, 'featured');
			heroFeatured.firstElementChild.classList.add('active');
		});

		// News cards (next 9 articles)
		const newsArticles = news.slice(4, 13);
		newsArticles.forEach(article => {
			newsCards.innerHTML += createArticleHTML(article);
		});

		// Side news (home page) or Top news (category pages)
		const altArticles = news.slice(13, 18);
		if (type === 'home') {
			altArticles.forEach(article => {
				altNews.innerHTML += createArticleHTML(article, 'side');
			});
		} else {
			// Top news big card
			const topArticle = news.slice(13, 14);
			altNews[0].innerHTML += createArticleHTML(topArticle[0], 'top');

			// Top news small cards
			const topArticleCards = news.slice(14, 18);
			topArticleCards.forEach(article => {
				altNews[1].innerHTML += createArticleHTML(article, 'top');
			});
		}
	} finally {
		loader.classList.add('hidden');
		document.body.style.overflow = 'auto';
	}

	initializeHeroSlider();
};

// Initialize on page load
window.addEventListener('load', () => {
	const category = getCategoryFromPage();
	displayNews(category);
});
