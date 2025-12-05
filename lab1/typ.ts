// замість enum використовуємо об'єкт
const Category = {
    BusinessAnalyst: "BusinessAnalyst",
    Developer: "Developer",
    Designer: "Designer",
    QA: "QA",
    ScrumMaster: "ScrumMaster"
} as const;

// тип для категорії
type Category = typeof Category[keyof typeof Category];

// інтерфейс для робітника
interface MyWorker {
    id: number;
    name: string;
    surname: string;
    available: boolean;
    salary: number;
    category: Category;
}

// функція для отримання всіх робітників
function getAllWorkers(): MyWorker[] {
    return [
        { id: 1, name: "Neil", surname: "Josten", available: true, salary: 15000, category: Category.Developer },
        { id: 2, name: "Aaron", surname: "Minyard", available: false, salary: 14000, category: Category.Designer },
        { id: 3, name: "Andrew", surname: "Minyard", available: true, salary: 16000, category: Category.QA },
        { id: 4, name: "Kevin", surname: "Day", available: true, salary: 18000, category: Category.ScrumMaster },
        { id: 5, name: "Renee", surname: "Walker", available: false, salary: 17000, category: Category.BusinessAnalyst }
    ];
}

// функція для виводу першого доступного робітника
function logFirstAvailable(workers: MyWorker[] = getAllWorkers()): void {
    console.log(`Кількість робітників: ${workers.length}`); // скільки всього
    for (const worker of workers) {
        if (worker.available) { // шукаємо першого доступного
            console.log(`Перший доступний: ${worker.name} ${worker.surname}`);
            break; // зупиняємося на першому
        }
    }
}

logFirstAvailable(); // виклик функції

// функція, що повертає прізвища робітників певної категорії
function getWorkersSurnamesByCategory(category: Category = Category.Designer): string[] {
    return getAllWorkers()
        .filter(worker => worker.category === category) // відбираємо по категорії
        .map(worker => worker.surname); // беремо тільки прізвище
}

// функція для виводу масиву прізвищ у консоль
function logWorkersNames(names: string[]): void {
    console.log("Працівники:");
    names.forEach(name => console.log(name));
}

// приклади використання
logWorkersNames(getWorkersSurnamesByCategory(Category.Developer)); // Developer
logWorkersNames(getWorkersSurnamesByCategory()); // за замовчуванням Designer

// вивід Developer через forEach та стрілочну функцію
getAllWorkers()
    .filter(worker => worker.category === Category.Developer)
    .forEach(worker => console.log(`${worker.name} ${worker.surname}`));

// функція для пошуку робітника за ID
const getWorkerByID = (id: number): MyWorker | undefined => {
    return getAllWorkers().find(worker => worker.id === id);
};

// приклад використання
const foundWorker = getWorkerByID(3);
if (foundWorker) {
    console.log(`${foundWorker.name} ${foundWorker.surname} - ${foundWorker.salary}`);
}

// функція для створення ID замовника
function createCustomerID(name: string, id: number): string {
    return `${name}-${id}`;
}

// виклик функції
let myID: string = createCustomerID("Masha", 7);
console.log(myID);

// оголошуємо змінну з типом функції
let idGenerator: (name: string, id: number) => string;

// стрілочна функція
idGenerator = (name: string, id: number) => `${name}-${id}`;

// присвоєння звичайної функції
idGenerator = createCustomerID;
console.log(idGenerator("Masha", 7));

// функція з обов’язковим і необов’язковими параметрами
function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`Ім'я замовника: ${name}`);
    if (age !== undefined) console.log(`Вік: ${age}`);
    if (city !== undefined) console.log(`Місто: ${city}`);
}

// приклади виклику
createCustomer("Masha");
createCustomer("Masha", 19);
createCustomer("Masha", 19, "Kyiv");

// функція для перевірки доступності робітників
function checkoutWorkers(customer: string, ...workerIDs: number[]): string[] {
    console.log(`Замовник: ${customer}`);
    const availableWorkers: string[] = [];
    workerIDs.forEach(id => {
        const worker = getWorkerByID(id);
        if (worker && worker.available) { // додаємо лише доступних
            availableWorkers.push(`${worker.name} ${worker.surname}`);
        }
    });
    return availableWorkers;
}

// збереження результату виклику у змінну
let myWorkers: string[] = checkoutWorkers("Masha", 1, 2, 3, 4);

// вивід імен та прізвищ доступних робітників
myWorkers.forEach(worker => console.log(worker));
