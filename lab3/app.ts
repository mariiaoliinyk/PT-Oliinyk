// Інтерфейс для даних компонента
interface ReverseTextData {
    original: string;
    reversed: string;
}

// Власний Web Component
class ReverseTextComponent extends HTMLElement {
    private shadow: ShadowRoot;           // Shadow DOM для інкапсуляції
    private inputEl!: HTMLInputElement;   // Поле вводу
    private outputEl!: HTMLDivElement;    // Блок для виводу тексту
    private errorEl!: HTMLDivElement;     // Блок для помилки

    constructor() {
        super();
        // Створюємо Shadow DOM
        this.shadow = this.attachShadow({ mode: "open" });
    }

    // Життєвий цикл компонента
    connectedCallback() {
        // Розмітка і стилі
        this.shadow.innerHTML = `
            <style>
                :host {
                    display: block;
                    max-width: 400px;
                    margin: 20px 0;
                    font-family: Arial, sans-serif;
                }
                input {
                    width: 100%;
                    padding: 8px;
                    font-size: 16px;
                    box-sizing: border-box;
                    border: 2px solid #ccc;
                    border-radius: 4px;
                    transition: border-color 0.3s;
                }
                input:focus {
                    border-color: #007BFF;
                    outline: none;
                }
                .output {
                    margin-top: 10px;
                    font-weight: bold;
                    color: green;
                }
                .error {
                    margin-top: 5px;
                    color: red;
                    font-size: 14px;
                    display: none;
                }
                button {
                    margin-top: 10px;
                    padding: 6px 12px;
                    font-size: 14px;
                    cursor: pointer;
                }
            </style>

            <input type="text" placeholder="Введіть текст">
            <button>Очистити</button>
            <div class="output"></div>
            <div class="error">Поле не може бути порожнім!</div>
        `;

        // Отримуємо елементи
        this.inputEl = this.shadow.querySelector("input") as HTMLInputElement;
        this.outputEl = this.shadow.querySelector(".output") as HTMLDivElement;
        this.errorEl = this.shadow.querySelector(".error") as HTMLDivElement;
        const buttonEl = this.shadow.querySelector("button") as HTMLButtonElement;

        // Обробник введення тексту
        this.inputEl.addEventListener("input", () => this.updateText());

        // Обробник кнопки очищення
        buttonEl.addEventListener("click", () => this.clearText());
    }

    // Оновлення виводу
    private updateText() {
        const text: string = this.inputEl.value.trim();

        if (text === "") {
            this.outputEl.textContent = "";
            this.errorEl.style.display = "block";
        } else {
            this.errorEl.style.display = "none";

            const data: ReverseTextData = {
                original: text,
                reversed: text.split("").reverse().join("")
            };

            this.outputEl.textContent = data.reversed;
        }
    }

    // Очищення поля та виводу
    private clearText() {
        this.inputEl.value = "";
        this.outputEl.textContent = "";
        this.errorEl.style.display = "none";
        this.inputEl.focus();
    }
}

// Реєстрація Web Component
customElements.define("reverse-text", ReverseTextComponent);
