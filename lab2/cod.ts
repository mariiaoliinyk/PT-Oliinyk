// 2.1. Визначення інтерфейсу 

// Тип функції для нагород
interface PrizeLogger {
    (prize: string): void; // приймає рядок, нічого не повертає
}

// Інтерфейс для опису працівника
interface MyWorker {
    id: number;           
    name: string;         
    surname: string;      
    available: boolean;   
    salary: number;       
    markPrize?: PrizeLogger; 
}

// Масив працівників
const workers: MyWorker[] = [
    { id: 1, name: "Neil", surname: "Josten", available: true, salary: 15000 },
    { id: 2, name: "Aaron", surname: "Minyard", available: false, salary: 14000 },
    { id: 3, name: "Andrew", surname: "Minyard", available: true, salary: 14500 }
];

// Функція для отримання всіх працівників
function getAllWorkers(): MyWorker[] {
    return workers;
}

// Функція для пошуку працівника по ID
function getWorkerByID(id: number): MyWorker | undefined {
    return workers.find(worker => worker.id === id);
}

// Функція для виведення інформації про працівника
function printWorker(worker: MyWorker): void {
    console.log(`${worker.name} ${worker.surname} got salary ${worker.salary}`);
}

// Виклик прикладу
const worker1 = getWorkerByID(1);
if (worker1) printWorker(worker1);

// Присвоєння функції markPrize працівнику
workers[0].markPrize = (prize: string) => {
    console.log(`${workers[0].name} received a prize: ${prize}`);
}

// Виклик
workers[0].markPrize("Employee of the Month");

// 2.3. Розширення інтерфейсів 

interface Person {
    name: string;
    email: string;
}

interface Author extends Person {
    numBooksPublished: number;
}

interface Librarian extends Person {
    department: string;
    assistCustomer(custName: string): void;
}

// Приклади об'єктів
const favoriteAuthor: Author = {
    name: "J.K. Rowling",
    email: "jk@example.com",
    numBooksPublished: 7
};

const favoriteLibrarian: Librarian = {
    name: "Emma Watson",
    email: "emma@example.com",
    department: "Fiction",
    assistCustomer: (custName: string) => {
        console.log(`Assisting ${custName}`);
    }
};

// 2.4. Інтерфейси для класів 

class UniversityLibrarian implements Librarian {
    name: string = "";
    email: string = "";
    department: string = "";

    assistCustomer(custName: string): void {
        console.log(`${this.name} is assisting ${custName}`);
    }
}

// Використання класу
const uniLibrarian = new UniversityLibrarian();
uniLibrarian.name = "John";
uniLibrarian.assistCustomer("Alice");

// 2.5. Створення та використання класів 

abstract class ReferenceItem {
    private _publisher: string = "";

    static department: string = "General";

    constructor(public title: string, protected year: number) {
        console.log("Creating a new ReferenceItem ...");
    }

    printItem(): void {
        console.log(`${this.title} was published in ${this.year}`);
        console.log(`Department: ${ReferenceItem.department}`);
    }

    get publisher(): string {
        return this._publisher.toUpperCase();
    }

    set publisher(newPublisher: string) {
        this._publisher = newPublisher;
    }

    abstract printCitation(): void;
}

// 2.6. Розширення класів

class Encyclopedia extends ReferenceItem {
    constructor(title: string, year: number, public edition: number) {
        super(title, year);
    }

    printItem(): void {
        super.printItem();
        console.log(`Edition: ${this.edition} (${this.year})`);
    }

    printCitation(): void {
        console.log(`${this.title} - ${this.year}`);
    }
}

// Створення об'єкта Encyclopedia
const refBook = new Encyclopedia("Encyclopedia of TS", 2025, 2);
refBook.printItem();

// Використання getter/setter
refBook.publisher = "tech books";
console.log(refBook.publisher);
refBook.printCitation();
