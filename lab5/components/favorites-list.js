class FavoritesList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    await this.reload();
  }

  async reload() {
    this.favs = (await window.appStorage.get("favorites")) || [];
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <h2>Вибране</h2>
      <ul>
        ${this.favs.map(f => `<li>"${f.quote}" — ${f.author}</li>`).join("")}
      </ul>
    `;
  }
}

customElements.define("favorites-list", FavoritesList);
