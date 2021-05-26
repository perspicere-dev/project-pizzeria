// Twoim zadaniem jest stworzenie nowej, w której będą zawarte tylko imiona żeńskie obecne w tej oryginalnej. 
//Dla uproszczenia załóżmy, że imiona żeńskie to takie, które kończą się na a.
// Do wykonania ćwiczenia przydatne mogą być wbudowane w JS-a metody. 
//Zainteresuj się zwłaszcza metodami slice lub charAt. Być może pomocna będzie również informacja, że właściwość length użyta na stringu, zwraca jego długość.
const names = ['Kasia', 'Tomek', 'Amanda', 'Maja'];
const newNames = [];
console.log("newNames", newNames);


for(let name of names){
  if(name.charAt(name.length-1)  === 'a'){
 newNames.push(name);
  }
}

// Za pomocą pętli for przejdź po każdym obiekcie w employees i wygeneruj dwie nowe tablice. employeesNames powinno być listą imion pracowników (tylko imion!). employeesSalaries powinno być listą pensji.
// Uwaga! Bardzo przydatna może okazać się znana Ci już metoda split.

const employees = {
    john: {
      name: 'John Doe',
      salary: 3000
    },
    amanda: {
      name: 'Amanda Doe',
      salary: 4000
    },

