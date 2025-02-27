export const heroTemplate = ({ url, title, authorName, date }) => `
    <h2>
        <a href="${url}" target="_blank">${title}</a>
    </h2>
    <div>
        <strong>${authorName}</strong>
        <span>${date}</span>
    </div>
    <a href="${url}" target="_blank" id="readMore">Read more</a>
`;

export const heroFeaturedTemplate = ({ url, imageUrl, title, authorName, date }) => `
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

export const sideTemplate = ({ url, imageUrl, title, date }) => `
    <article>
        <img src="${imageUrl}" alt=${title} class="img-fluid" />
        <div>
            <a href=${url} target="_blank">
                <h5>${title.slice(0, 80) + ' ...'}</h5>
            </a>
            <span>${date}</span>
        </div>
    </article>
`;

export const topTemplate = ({ url, imageUrl, title, authorName, date }) => `
    <article>
        <a href=${url} target="_blank">
            <img class="img-fluid" src="${imageUrl}" alt="${title}" />
            <div>
                <a href="${url}" target="_blank">
                    <h3>${title}</h3>
                </a>
                <span>${date}</span>
                <address>${authorName}</address>
            </div>
        </a>
    </article>
`;

export const defaultTemplate = ({ url, imageUrl, title, authorName, date }) => `
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
