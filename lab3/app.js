var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Власний Web Component
var ReverseTextComponent = /** @class */ (function (_super) {
    __extends(ReverseTextComponent, _super);
    function ReverseTextComponent() {
        var _this = _super.call(this) || this;
        // Створюємо Shadow DOM
        _this.shadow = _this.attachShadow({ mode: "open" });
        return _this;
    }
    // Життєвий цикл компонента
    ReverseTextComponent.prototype.connectedCallback = function () {
        var _this = this;
        // Розмітка і стилі
        this.shadow.innerHTML = "\n            <style>\n                :host {\n                    display: block;\n                    max-width: 400px;\n                    margin: 20px 0;\n                    font-family: Arial, sans-serif;\n                }\n                input {\n                    width: 100%;\n                    padding: 8px;\n                    font-size: 16px;\n                    box-sizing: border-box;\n                    border: 2px solid #ccc;\n                    border-radius: 4px;\n                    transition: border-color 0.3s;\n                }\n                input:focus {\n                    border-color: #007BFF;\n                    outline: none;\n                }\n                .output {\n                    margin-top: 10px;\n                    font-weight: bold;\n                    color: green;\n                }\n                .error {\n                    margin-top: 5px;\n                    color: red;\n                    font-size: 14px;\n                    display: none;\n                }\n                button {\n                    margin-top: 10px;\n                    padding: 6px 12px;\n                    font-size: 14px;\n                    cursor: pointer;\n                }\n            </style>\n\n            <input type=\"text\" placeholder=\"\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u0442\u0435\u043A\u0441\u0442\">\n            <button>\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u0438</button>\n            <div class=\"output\"></div>\n            <div class=\"error\">\u041F\u043E\u043B\u0435 \u043D\u0435 \u043C\u043E\u0436\u0435 \u0431\u0443\u0442\u0438 \u043F\u043E\u0440\u043E\u0436\u043D\u0456\u043C!</div>\n        ";
        // Отримуємо елементи
        this.inputEl = this.shadow.querySelector("input");
        this.outputEl = this.shadow.querySelector(".output");
        this.errorEl = this.shadow.querySelector(".error");
        var buttonEl = this.shadow.querySelector("button");
        // Обробник введення тексту
        this.inputEl.addEventListener("input", function () { return _this.updateText(); });
        // Обробник кнопки очищення
        buttonEl.addEventListener("click", function () { return _this.clearText(); });
    };
    // Оновлення виводу
    ReverseTextComponent.prototype.updateText = function () {
        var text = this.inputEl.value.trim();
        if (text === "") {
            this.outputEl.textContent = "";
            this.errorEl.style.display = "block";
        }
        else {
            this.errorEl.style.display = "none";
            var data = {
                original: text,
                reversed: text.split("").reverse().join("")
            };
            this.outputEl.textContent = data.reversed;
        }
    };
    // Очищення поля та виводу
    ReverseTextComponent.prototype.clearText = function () {
        this.inputEl.value = "";
        this.outputEl.textContent = "";
        this.errorEl.style.display = "none";
        this.inputEl.focus();
    };
    return ReverseTextComponent;
}(HTMLElement));
// Реєстрація Web Component
customElements.define("reverse-text", ReverseTextComponent);
