// ES5
// Переделать вызов родительского конструктора с call на apply
// Добавить в TopLevelWorker новый метод getSalary, важно не дать экземпляру класса TopLevelWorker вызвать getSalary из прототипа родительского класса 
// Создать новый класс BottomLevelWorker который тоже наследует класс Worker, у данного класса будет новое свойство experience (количество лет работы) и новый метод класса getLoyaltyLevel который будет проверять свойство experience: в зависимости от количества выводить сообщение - У ${User} уровень преданности ${LOYALTY_LEVEL}. LOYALTY_LEVEL может быть заранее заготовленным объектом констант

/*
  5. Создать класс Worker у которого есть 
  свойства name, surname, age, position, salary.
     У класса Worker есть метод getSalary.
     Создать класс TopLevelWorker у которого есть 
     свойство hierarchyLevel и который 
     наследует класс Worker, добавляя метод getHierarchyLevel
     Реализовать задачу с помощью ES5 прототипов и ES6 классов
*/

const HIERARCHY_LEVEL = {
  TOP: "top",
  BOTTOM: "bottom"
};

// ES5

const Worker = function (name, surname, age, position, salary) {
  this.name = name;
  this.surname = surname;
  this.age = age;
  this.position = position;
  this.salary = salary;
};

Worker.prototype.getSalary = function () {
  return this.salary;
};

const TopLevelWorker = function (
  args,
  hierarchyLevel
) {
  Worker.apply(this, args);
  this.hierarchyLevel = hierarchyLevel;
};

TopLevelWorker.prototype = Object.create(Worker.prototype);
TopLevelWorker.prototype.constructor = TopLevelWorker;
TopLevelWorker.prototype.getSalary = function() {
  return this.salary;
};

const worker1 = new TopLevelWorker(
  ["Ашот",
  "Осипян",
  27,
  "Developer",
  100],
  HIERARCHY_LEVEL.BOTTOM
);

// console.log(worker1.getSalary());

// console.log(worker1);

const LOYALTY_LEVEL = {
  HIGH: "high",
  LOW: "low"
};

const BottomLevelWorker = function (args, experience) {
  Worker.apply(this, args);
  this.experience = experience;
};

BottomLevelWorker.prototype = Object.create(Worker.prototype);
BottomLevelWorker.prototype.constructor = BottomLevelWorker;
BottomLevelWorker.prototype.getLoyaltyLevel = function () {
  // let loyalty = this.experience > 100 ? LOYALTY_LEVEL.HIGH : LOYALTY_LEVEL.LOW;
  return `У ${this.name} уровень преданности ${this.experience > 100 ? LOYALTY_LEVEL.HIGH : LOYALTY_LEVEL.LOW}.`
};

const worker11 = new BottomLevelWorker(["Ivan",
  "Ivanuch",
  36,
  "Developer",
  1220], 10);
// console.log(worker11);
// console.log(worker11.getLoyaltyLevel());


// ES6
// Переделать объект HIERARCHY_LEVEL (строка 202) в статичную функцию родительского класса которая будет возвращать данный объект
// Удалить свойство salary и метод getSalary, в классе Worker1 создать новое приватное свойство #salary (минимальное значение 500), доступ и изменение свойства salary будет возможно только через getter и setter. До того как можно будет добавить зарплату для TopLevelWorker1, надо проверять что параметр это цифра и #salary не превышает 5000, если зарплата снижается то надо проверить параметр на число и чтобы зп не была ниже 500.
// TopLevelWorker1 добавить метод setHierarchyLevel, которое принимает количество лет проведенные в компании и определяет значение свойства hierarchyLevel, если меньше года то функция пишет сообщение об этом
// Создать новый класс BottomLevelWorker который наследует TopLevelWorker1, в экземпляре BottomLevelWorker прибавить ему зарплату и определить hierarchyLevel с помощью метода setHierarchyLevel


class Worker1 {
  #salary;

  constructor(name, surname, age, position, salary) {
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.position = position;
    this.#salary = salary;
  }

  static HIERARCHY_LEVEL() {
  return { TOP: "top",
    BOTTOM: 'bottom'}
  };

  get salary() {
    if (this.#salary >= 500 && this.#salary < 5000) {
      return this.#salary;
    } else {
      return `Текущая зарплата указана неверно`;
    }
  }
  
  set salary(value) {
    if (value >= 500 && value < 5000) {
      this.#salary = value;
    } 
    console.error(`Error in salary definition`);
  }
 
}

class TopLevelWorker1 extends Worker1 {
  constructor(name, surname, age, position, salary, hierarchyLevel) {
    super(name, surname, age, position, salary);
    this.hierarchyLevel = hierarchyLevel;
  }

  setHierarchyLevel(years) {
    if (years < 1) {
      return `Вы проработали меньше 1 года`;
    }
     
    if (years > 1 && years < 3) {
      this.hierarchyLevel = HIERARCHY_LEVEL.BOTTOM;
    }

    if (years >= 3) {
      this.hierarchyLevel = HIERARCHY_LEVEL.TOP;
    }
  }
}

class BottomLevelWorker1 extends TopLevelWorker1 {
  constructor(name, surname, age, position, salary, hierarchyLevel) {
    super(name, surname, age, position, salary, hierarchyLevel);
  }
}

const worker2 = new TopLevelWorker1(
  "Ашот",
  "Осипян",
  27,
  "Developer",
  90,
  HIERARCHY_LEVEL.BOTTOM
);

// console.log(worker2);
// console.log(worker2.setHierarchyLevel(0.2));
//  console.log(worker2.getSalary());
//  console.log(Worker1.HIERARCHY_LEVEL());
// console.log(worker2.salary);
//  worker2.salary = 7999;
//  console.log(worker2.salary);

// console.log(worker2.setHierarchyLevel(2));

const worker3 = new BottomLevelWorker1("Poly",
  "Andersson",
  30,
  "Developer",
  540,
  HIERARCHY_LEVEL.BOTTOM);

// console.log(worker3);
// console.log(worker3.setHierarchyLevel(7));

