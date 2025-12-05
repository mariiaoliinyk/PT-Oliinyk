class QuotesTable extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    await this.waitStore();
    const resp = await axios.get("https://dummyjson.com/quotes");
    this.quotes = resp.data.quotes;
    this.render();
  }

  waitStore() {
    return new Promise(resolve => {
      const t = setInterval(() => {
        if (window.appStorage) {
          clearInterval(t);
          resolve();
        }
      }, 50);
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        table { width:100%; border-collapse: collapse; }
        td, th { border:1px solid #ddd; padding:8px; }
        tr:hover { background:#eee; cursor:pointer; }
      </style>

      <h2>Цитати</h2>
      <table>
        <tr>
          <th>Цитата</th><th>Автор</th><th>Додати</th>
        </tr>
        ${this.quotes.map(q => `
            <tr data-id="${q.id}">
              <td>${q.quote}</td>
              <td>${q.author}</td>
              <td><button class="add" data-id="${q.id}">★</button></td>
            </tr>
        `).join("")}
      </table>
    `;

    this.shadowRoot.querySelectorAll("tr[data-id]").forEach(row => {
      row.addEventListener("click", e => {
        if (e.target.tagName === "BUTTON") return;
        const id = row.getAttribute("data-id");
        const q = this.quotes.find(q => q.id == id);
        const pop = document.createElement("quote-popup");
        pop.quote = q;
        document.body.appendChild(pop);
      });
    });

    this.shadowRoot.querySelectorAll(".add").forEach(btn => {
      btn.addEventListener("click", async e => {
        const id = btn.getAttribute("data-id");
        const q = this.quotes.find(q => q.id == id);

        let favs = (await window.appStorage.get("favorites")) || [];
        favs.push(q);
        await window.appStorage.set("favorites", favs);

        document.querySelector("favorites-list").reload();
      });
    });
  }
}

customElements.define("quotes-table", QuotesTable);
