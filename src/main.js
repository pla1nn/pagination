import NewsApiService from './js/news-service';

const form = document.querySelector('.form');
const loadButton = document.querySelector('.load_button');
const list = document.querySelector('.list');

const newsApiService = new NewsApiService();

form.addEventListener('submit', onSearch);
loadButton.addEventListener('click', loadMore);

function onSearch(e) {
  e.preventDefault();

  clearList();

  newsApiService.query = e.currentTarget.elements.query.value;

  newsApiService.resetPage();

  newsApiService.fetchArticles().then(renderNews);
}

function loadMore() {
  newsApiService.fetchArticles().then(renderNews);
}

function renderNews(articles) {
  const markUp = articles.map(article => {
    return `<li class="item">
        <a href="${article.url}" target="_blank" rel="noopener noreferrer">
        <article>
        <img src="${article.urlToImage}" alt="" width="480">
        <div class="item_box">
        <h2 class="article_title">${article.title}</h2>
        <p>Posted by: ${article.author}</p>
        <p>${article.description}</p>
        </div>
        </article>
        </a>
        </li>`;
  }).join('');
  list.insertAdjacentHTML('beforeend', markUp)
}

function clearList() {
  list.innerHTML = '';
}