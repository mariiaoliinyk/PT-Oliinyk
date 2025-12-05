class QuotePopup extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .bg {
          position:fixed; inset:0;
          background:rgba(0,0,0,0.5);
          display:flex; justify-content:center; align-items:center;
        }
        .win {
          background:#fff; padding:20px; border-radius:8px;
        }
      </style>

      <div class="bg">
        <div class="win">
          <p><b>Цитата:</b> ${this.quote.quote}</p>
          <p><b>Автор:</b> ${this.quote.author}</p>
          <button id="close">Закрити</button>
        </div>
      </div>
    `;

    this.shadowRoot.getElementById("close").onclick = () => this.remove();
  }
}

customElements.define("quote-popup", QuotePopup);
