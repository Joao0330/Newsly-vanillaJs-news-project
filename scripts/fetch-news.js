const apiKey = 'b9dd818f885941bda30e6df5ede540b5';
const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

// DOM Elements
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero__title');
const heroFeatured = document.querySelector('.hero__featured ul');
const newsCards = document.querySelector('.news__content-cards');
const sideNews = document.querySelector('.news__side-cards');

// Fetch news data
const fetchNews = async () => {
	try {
		const response = await fetch(apiUrl);

		if (!response.ok) {
			throw new Error('Could not fetch resource');
		}

		const data = await response.json();
		return data.articles;
	} catch (error) {
		console.error('Error fetching news:', error);
		return []; // Return an empty array in case of error
	}
};

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
            <a href="${url}" target="_blank">Read more</a>
        `;
	}

	if (type === 'featured') {
		return `
            <li data-author="${authorName}">
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

	if (type === 'side') {
		return `
			<article>
				<img src="${imageUrl}" alt=${title} class="img-fluid" />

				<div>
					<a href=${url} target="_blank">
						<h5>${title}</h5>
					</a>

					<span>${date}</span>
				</div>
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
	const news = await fetchNews();

	if (news.length === 0) {
		console.error('No news articles found.');
		return;
	}

	// Clear existing content
	heroContent.innerHTML = '';
	heroFeatured.innerHTML = '';
	newsCards.innerHTML = '';
	sideNews.innerHTML = '';

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

	// News cards (next 9 articles)
	const newsArticles = news.slice(4, 13);
	newsArticles.forEach(article => {
		newsCards.innerHTML += createArticleHTML(article);
	});

	// Side news (next 5 articles)
	const sideArticles = news.slice(13, 18);
	sideArticles.forEach(article => {
		sideNews.innerHTML += createArticleHTML(article, 'side');
	});
};

// Initialize on page load
window.addEventListener('load', displayNews);
