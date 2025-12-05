class MyComponent extends HTMLElement {
  constructor() {
    super();
    this._message = 'Привіт';

    this.attachShadow({ mode: 'open' });
    this.span = document.createElement('span');
    this.span.textContent = this._message;
    this.shadowRoot.appendChild(this.span);
  }

  // Властивість message
  get message() {
    return this._message;
  }

  set message(val) {
    this._message = String(val);
    this.setAttribute('message', this._message);
    this._updateDOM();
    // Подія 'text-changed' з даними
    this.dispatchEvent(new CustomEvent('text-changed', { detail: { value: val } }));
  }

  // Атрибут
  static get observedAttributes() { return ['message']; }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'message') {
      this._message = newVal || '';
      this._updateDOM();
    }
  }

  // Методи
  changeText(text) {
    this.message = text;
  }

  resetText() {
    this.message = 'Привіт';
  }

  appendText(text) {
    this.message = this.message + text;
  }

  clearText() {
    this.message = '';
  }

  toggleUpperCase() {
    this.message = this.message.toUpperCase();
  }

  async changeTextAsync(text) {
    this.message = text;
  }

  async changeTextAsyncTimeout(text, delay = 10) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.message = text;
        resolve();
      }, delay);
    });
  }

  async fetchData(url = '') {
    return Promise.resolve({ result: 'success' });
  }

  connectedCallback() {
    if (this.span) {
      this.span.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('clicked'));
      });
    }
  }

  // Оновлення Shadow DOM
  _updateDOM() {
    if (this.shadowRoot) {
      if (!this.span) {
        this.span = document.createElement('span');
        this.shadowRoot.appendChild(this.span);
      }
      this.span.textContent = this._message;
    }
  }
}

// Реєстрація компонента
customElements.define('my-component', MyComponent);

export default MyComponent;
