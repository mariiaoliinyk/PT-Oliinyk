// Глобальний масив для збереження вибраного
const favorites = [];

// Компонент таблиці цитат
class QuotesTable extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const res = await fetch('https://dummyjson.com/quotes');
        const data = await res.json();
        this.quotes = data.quotes;
        this.render();
    }

    render() {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        thead.innerHTML = `<tr><th>Цитата</th><th>Автор</th></tr>`;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        this.quotes.forEach(quote => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${quote.quote}</td><td>${quote.author}</td>`;
            tr.addEventListener('click', () => openPopup(quote));
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(table);
    }
}
customElements.define('quotes-table', QuotesTable);

// Компонент вибраного
class FavoritesList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    render() {
        const list = document.createElement('ul');
        favorites.forEach(fav => {
            const li = document.createElement('li');
            li.textContent = `"${fav.quote}" — ${fav.author}`;
            list.appendChild(li);
        });
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(list);
    }
}
customElements.define('favorites-list', FavoritesList);

// Попап
const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');
const popupContent = document.getElementById('popup-content');
const addFavoriteBtn = document.getElementById('add-favorite');
const closePopupBtn = document.getElementById('close-popup');

let currentQuote = null;

function openPopup(quote) {
    currentQuote = quote;
    popupContent.textContent = `"${quote.quote}" — ${quote.author}`;
    popup.style.display = 'block';
    overlay.style.display = 'block';
}

addFavoriteBtn.addEventListener('click', () => {
    if (currentQuote && !favorites.includes(currentQuote)) {
        favorites.push(currentQuote);
        document.querySelector('favorites-list').render();
    }
    closePopup();
});

closePopupBtn.addEventListener('click', closePopup);
overlay.addEventListener('click', closePopup);

function closePopup() {
    popup.style.display = 'none';
    overlay.style.display = 'none';
    currentQuote = null;
}
