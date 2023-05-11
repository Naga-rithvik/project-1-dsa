const form = document.querySelector('#my-form');
const expensesInput = document.querySelector('#expenses');
const categoryInput = document.querySelector('#category');
const descriptionInput = document.querySelector('#description');
const userList = document.querySelector('#users');

let expensesList;


if(localStorage.getItem('expenses') === null) {
  expensesList = [];
} else {
  expensesList = JSON.parse(localStorage.getItem('expenses'));
}


function displayExpenses() {
  userList.innerHTML = '';

  expensesList.forEach(function(expense, index) {
    const li = document.createElement('li');
    li.innerHTML = `
      ${expense.expenses} spent on ${expense.category} - ${expense.description} 
      <button class="delete" data-index="${index}">Delete</button>
      <button class="edit" data-index="${index}">Edit</button>
    `;
    userList.appendChild(li);
  });
}


displayExpenses();


form.addEventListener('submit', function(e) {
  e.preventDefault();

  
  const expense = {
    expenses: expensesInput.value,
    category: categoryInput.value,
    description: descriptionInput.value
  }

 
  expensesList.push(expense);

  
  displayExpenses();

  
  localStorage.setItem('expenses', JSON.stringify(expensesList));

  
  expensesInput.value = '';
  categoryInput.value = 'coffee';
  descriptionInput.value = '';
});

// Event listener for deleting an expense
userList.addEventListener('click', function(e) {
  if(e.target.classList.contains('delete')) {
    const index = e.target.getAttribute('data-index');
    expensesList.splice(index, 1);
    displayExpenses();
    localStorage.setItem('expenses', JSON.stringify(expensesList));
  }
});

// Event listener for editing an expense
userList.addEventListener('click', function(e) {
  if(e.target.classList.contains('edit')) {
    const index = e.target.getAttribute('data-index');
    const expense = expensesList[index];
    expensesInput.value = expense.expenses;
    categoryInput.value = expense.category;
    descriptionInput.value = expense.description;
    expensesList.splice(index, 1);
    displayExpenses();
    localStorage.setItem('expenses', JSON.stringify(expensesList));
  }
});
