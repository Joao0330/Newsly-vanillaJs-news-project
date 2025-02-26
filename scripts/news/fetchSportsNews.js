import { fetchNews } from '../../lib/api.js';
import { apiKey } from '../../lib/config.js';
import { initializeHeroSlider } from '../slider.js';

const apiUrl = `https://newsapi.org/v2/top-headlines?category=sports&apiKey=${apiKey}`;

// DOM Elements
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero__title');
const heroFeatured = document.querySelector('.hero__featured ul');
const newsTop = document.querySelectorAll('.newsAlt__top div');

// Generate HTML for a single article
const createArticleHTML = (article, type = 'default') => {
	const { url, urlToImage, title, author, publishedAt } = article;
	const imageUrl = urlToImage || '../assets/news-placeholder.png';
	const authorName = author || 'Unknown Author';
	const date = new Date(publishedAt).toLocaleDateString();

	if (type === 'hero') {
		return `
            <h2>
                <a href="${url}" target="_blank">${title}</a>
            </h2>
            <div>
                <strong>${authorName}</strong>
                <span>${date}</span>
            </div>
            <a href="${url}" target="_blank" id="readMore">Read more</a>
        `;
	}

	if (type === 'featured') {
		return `
            <li data-author="${authorName}" data-url="${url}">
                <div class="hero__featured-cards">
                    <img src="${imageUrl}" alt="${title}" class="img-fluid" />
                    <div>
                        <strong>${title}</strong>
                        <span>${date}</span>
                    </div>
                </div>
            </li>
        `;
	}

	if (type === 'top') {
		return `
			
				<article>
					<a href=${url}>
						<img class="img-fluid" src="${imageUrl}" alt="${title}" />
						<div>
							<a href="${url}">
								<h3>${title}</h3>
							</a>

							<span>${date}</span>
							<address>${authorName}</address>
						</div>
					</a>
				</article>
			
		`;
	}

	return `
        <article>
            <a href="${url}" target="_blank">
                <img src="${imageUrl}" alt="${title}" class="img-fluid" />
                <div class="news__content-cards-text">
                    <h3>${title}</h3>
                    <div>
                        <span>${date}</span>
                    </div>
                    <div>
                        <address>${authorName}</address>
                    </div>
                </div>
            </a>
        </article>
    `;
};

// Display news on the page
const displayNews = async () => {
	const news = await fetchNews(apiUrl);

	if (news.length === 0) {
		console.error('No news articles found.');
		return;
	}

	// Clear existing content
	heroContent.innerHTML = '';
	heroFeatured.innerHTML = '';
	newsTop.forEach(card => (card.innerHTML = ''));

	// Hero section (first article)
	const heroArticle = news[0];
	hero.style.backgroundImage = `url(${heroArticle.urlToImage || '../assets/news-placeholder.png'})`;
	heroContent.innerHTML = createArticleHTML(heroArticle, 'hero');

	// Featured articles (first 4 articles)
	const featuredArticles = news.slice(0, 4);
	featuredArticles.forEach(article => {
		heroFeatured.innerHTML += createArticleHTML(article, 'featured');
		heroFeatured.firstElementChild.classList.add('active');
	});

	// Top news big card
	const topArticle = news.slice(4, 5);
	newsTop[0].innerHTML += createArticleHTML(topArticle[0], 'top');

	// Top news small cards
	const topArticleCards = news.slice(5, 9);
	topArticleCards.forEach(article => {
		newsTop[1].innerHTML += createArticleHTML(article, 'top');
	});

	initializeHeroSlider();
};

// Initialize on page load
window.addEventListener('load', () => {
	displayNews();
});
