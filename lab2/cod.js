"use strict";
// 2.1. Визначення інтерфейсу 
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
// Масив працівників
var workers = [
    { id: 1, name: "Neil", surname: "Josten", available: true, salary: 15000 },
    { id: 2, name: "Aaron", surname: "Minyard", available: false, salary: 14000 },
    { id: 3, name: "Andrew", surname: "Minyard", available: true, salary: 14500 }
];
// Функція для отримання всіх працівників
function getAllWorkers() {
    return workers;
}
// Функція для пошуку працівника по ID
function getWorkerByID(id) {
    return workers.find(function (worker) { return worker.id === id; });
}
// Функція для виведення інформації про працівника
function printWorker(worker) {
    console.log("".concat(worker.name, " ").concat(worker.surname, " got salary ").concat(worker.salary));
}
// Виклик прикладу
var worker1 = getWorkerByID(1);
if (worker1)
    printWorker(worker1);
// Присвоєння функції markPrize працівнику
workers[0].markPrize = function (prize) {
    console.log("".concat(workers[0].name, " received a prize: ").concat(prize));
};
// Виклик
workers[0].markPrize("Employee of the Month");
// Приклади об'єктів
var favoriteAuthor = {
    name: "J.K. Rowling",
    email: "jk@example.com",
    numBooksPublished: 7
};
var favoriteLibrarian = {
    name: "Emma Watson",
    email: "emma@example.com",
    department: "Fiction",
    assistCustomer: function (custName) {
        console.log("Assisting ".concat(custName));
    }
};
// 2.4. Інтерфейси для класів 
var UniversityLibrarian = /** @class */ (function () {
    function UniversityLibrarian() {
        this.name = "";
        this.email = "";
        this.department = "";
    }
    UniversityLibrarian.prototype.assistCustomer = function (custName) {
        console.log("".concat(this.name, " is assisting ").concat(custName));
    };
    return UniversityLibrarian;
}());
// Використання класу
var uniLibrarian = new UniversityLibrarian();
uniLibrarian.name = "John";
uniLibrarian.assistCustomer("Alice");
// 2.5. Створення та використання класів 
var ReferenceItem = /** @class */ (function () {
    function ReferenceItem(title, year) {
        this.title = title;
        this.year = year;
        this._publisher = "";
        console.log("Creating a new ReferenceItem ...");
    }
    ReferenceItem.prototype.printItem = function () {
        console.log("".concat(this.title, " was published in ").concat(this.year));
        console.log("Department: ".concat(ReferenceItem.department));
    };
    Object.defineProperty(ReferenceItem.prototype, "publisher", {
        get: function () {
            return this._publisher.toUpperCase();
        },
        set: function (newPublisher) {
            this._publisher = newPublisher;
        },
        enumerable: false,
        configurable: true
    });
    ReferenceItem.department = "General";
    return ReferenceItem;
}());
// 2.6. Розширення класів
var Encyclopedia = /** @class */ (function (_super) {
    __extends(Encyclopedia, _super);
    function Encyclopedia(title, year, edition) {
        var _this = _super.call(this, title, year) || this;
        _this.edition = edition;
        return _this;
    }
    Encyclopedia.prototype.printItem = function () {
        _super.prototype.printItem.call(this);
        console.log("Edition: ".concat(this.edition, " (").concat(this.year, ")"));
    };
    Encyclopedia.prototype.printCitation = function () {
        console.log("".concat(this.title, " - ").concat(this.year));
    };
    return Encyclopedia;
}(ReferenceItem));
// Створення об'єкта Encyclopedia
var refBook = new Encyclopedia("Encyclopedia of TS", 2025, 2);
refBook.printItem();
// Використання getter/setter
refBook.publisher = "tech books";
console.log(refBook.publisher);
refBook.printCitation();
