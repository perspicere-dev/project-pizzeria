//2
const employees = {
  john: {
    name: 'John Doe',
    salary: 3000,
  },
  amanda:{
    name: 'Amy Doe',
    salary: 4000,
  }
}

const names = [];
const salaries = [];

//pętla po employees
for(let key in employees){
  const employee = employees[key];
    
  const fullName = employee.name;
  const arrSplitNames = fullName.split(' ');
  const firstName = arrSplitNames[0];
  names.push(firstName);
  
  const salary = employee.salary;
  salaries.push(salary);
}
console.log('names&salaries', names, salaries);

//KODILLA:
// const employeesNames = []; 
// const employeesSalaries = [];

// for(const employeeId in employees) {
//   const employee = employees[employeeId];

//   // split name at ' ' and get first element
//   // (John Doe -> ['John', 'Doe'] -> 'John')
//   const name = employee.name.split(' ')[0];
//   employeesNames.push(name);
//   employeesSalaries.push(employee.salary);
// }

//3
cconst salaries = [2000, 3000, 1500, 6000, 3000];

let salariesSum = 0;
let highestSalary = 0;
let lowestSalary = salaries[0];

for(let salary of salaries){
  if(salary > highestSalary){
    highestSalary = salary;
  }
  if(salary < lowestSalary){
    lowestSalary = salary;
  }
  salariesSum += salary
}

console.log('salariesSum & highestSalary & lowestSalary', salariesSum, highestSalary, lowestSalary)

//4
const persons = {
    john: 2000,
    amanda: 3000,
    thomas: 1500,
    james: 6000,
    claire: 3000
  };
  let salariesSum = 0; // persons.john;
  let highestSalary = 0; //  persons.john;
  let lowestSalary = 100000000000;
  
  for(let personId in persons){
    const salary = persons[personId];
  
    salariesSum += salary;
   
   if(salary > highestSalary){
      highestSalary = salary;
    }
    if(salary < lowestSalary){
      lowestSalary = salary;
    }
  }
  console.log('salariesSum', salariesSum);
  console.log('highestSalary', highestSalary)
  console.log('lowestSalary', lowestSalary)

  //kodilla:
//   const persons = {
//     john: 2000,
//     amanda: 3000,
//     thomas: 1500,
//     james: 6000,
//     claire: 3000
//   }
//   // covert obj to array of its values ([2000, 3000, 1500...])
//   const salaries = Object.values(persons);
  
//   let sum = 0;
//   let highestSalary = salaries[0];
//   let lowestSalary = salaries[0];
  
//   for(const salary of salaries) {
//     sum += salary;
//     if(salary > highestSalary) highestSalary = salary;
//     if(salary < lowestSalary) lowestSalary = salary;
//   }
  
//   console.log(sum, highestSalary, lowestSalary);

//5.
const tags = ['news', 'code', 'news', 'sport', 'hot', 'news', 'code'];

const uniqueTags = {}

for(const tag of tags){
  if(uniqueTags[tag] == null){
    const apperancesObj = {};
    apperancesObj['apperances'] = 0;
    uniqueTags[tag] = apperancesObj;
    apperancesObj['apperances']++
  } else{
    uniqueTags[tag]['apperances']++
  }

}
console.log(uniqueTags)

//kodilla
// const uniqueTags = {};

// for(const tag of tags) {
//   if(!uniqueTags[tag]) uniqueTags[tag] = { appearances: 1 };
//   else uniqueTags[tag].appearances++;
// }

//6
const employees = [
    { name: 'Amanda Doe', salary: 3000 },
    { name: 'John Doe', salary: 4000 },
    { name: 'Claire Downson', salary: 2000 },
    { name: 'Freddie Clarkson', salary: 6000 },
    { name: 'Thomas Delaney', salary: 8200 }
  ];
  
  function filterEmployees(employees, salaryMin, salaryMax){
   const tmpEmployees = [];
   for(let employee of employees){
  
     const salary = employee.salary;
  
     if(salary > salaryMin && salary < salaryMax){
       tmpEmployees.push(employee);
  
     }
   }
   
   return tmpEmployees;
  }
  
  const filteredEmployees = filterEmployees(employees, 2000, 8000);
  console.log("filteredEmployees: ", filteredEmployees);
  
  const cheapEmployees = filterEmployees(employees, 1000, 3100);
  console.log("cheapEmployees: ", cheapEmployees);

  //7
  const obj = {
    firstName: 'John',
    lastName: 'Doe'
  }

  function objParams(){
    for(const key in obj){
      console.log(key + ': ' + obj[key]);
    }
  }

  objParams();

//7

function forEach(arr, callback){
    for(let element of arr){
      callback(element);
    }
  }
  
  const array = ['John', 'Amanda', 'Thomas']
  
  function someRandomFunction(element){
    console.log(element)
  }
  forEach(array, someRandomFunction);

  //8
  
  function formatName (nameSurname){
    const arrNameSurname = nameSurname.split(' ');
    let words = '';
    for(let word of arrNameSurname){
      const properChar = word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
      words += properChar;
      if(i != arrNameSurname.length - 1){
        words += ' ';
      }   
    }
    console.log(words);
  }
  formatName('aJax aMsterdaM')
  formatName('Rafał Michał Olek')
  formatName('Rafał')

  //kodilla
  function formatName(name) {
    const firstNameAndLastName = name.split(' ');
    let firstName = firstNameAndLastName[0];
    let lastName = firstNameAndLastName[1];
  
    firstName = firstName.charAt(0).toUpperCase() + firstName.substr(1).toLowerCase()
    lastName = lastName.charAt(0).toUpperCase() + lastName.substr(1).toLowerCase()
    return firstName + ' ' + lastName;
  }
  
  console.log(formatName('AMANdA doE')); // returns Amanda Doe

  //9
  function getEvensInRange (begin, end){
    const evenNum = [];
  
    for( i = begin; i <= end; i++){
      if(i % 2 === 0){
        evenNum.push(i);
      }
    }
    
    return evenNum;
  }
  
  const evenNumbers = getEvensInRange(0, 9);
  console.log(evenNumbers)

  //kodilla
  // function getEvensInRange(start, end) {
  //   const evensArray = [];
  
  //   for(let i = start; i <= end; i++) {
  //     if(i%2 === 0) evensArray.push(i);
  //   }
  
  //   return evensArray;
  // }

  //9
  // array: Int
// callback: function(param) { return Boolean }
function filter (array, callback){
  const filteredArray = [];

  for(let arrayItem of array){    
    if(callback(arrayItem)){
      filteredArray.push(arrayItem);
    }
  }

  return filteredArray
}

const result1 = filter([5, 6, 7], function(item) { return item%2 === 0 });
const result2 = filter([5, 6, 7, 9], function(item) { return item >= 7 });

console.log(result1, result2)


  