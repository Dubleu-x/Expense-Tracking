document.addEventListener('DOMContentLoaded', function() {
    //DOM Elements
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput= document.getElementById('expense-amount');
const expenseCategorySelect = document.getElementById('expense-category');
const addBtn = document.getElementById('add-btn');
const expensesList = document.getElementById('expenses');
const totalAmountElement = document.getElementById('total-amount')

//Initialize expenses array from local storage or empty array
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

//Render expense and update total
function renderExpenses() {

    //Clear the expenses list
    expensesList.innerHTML = ''; 

//Calculate total amount
    let totalAmount = 0;

    //Loop through expenses and add them to the list
    expenses.forEach((expense, index) => {
        totalAmount += parseFloat(expense.amount);

        const expenseItem = document.createElement('li');
        expenseItem.className = 'expense-items';
        expenseItem.innerHtml = `
        <div class="expense-info">
            <span class="expense-name">${expense.name}</span>
            <span class="expense-category">${expense.category}</span>
            </div>
            <div>

               <span class="expense-amount">$${parseFloat(expense.amount)}.toFixed(2)}</span>

               <button class="delete-btn" data-id="${index}">Delete</button>
             </div>
       `;
       
       expensesList.appendChild(expenseItem);
    });
      
    //update total amount
    totalAmountElement.textContent = `$${totalAmount.toFixed(2)}`;

    //add event listener to event button
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const expenseId = parseInt(this.getAttribute('data-id'));
            deleteExpense(expenseId);
        });
    });
}

//Add a new expense
function addExpense() {
    const name = expenseNameInput.value.trim();
    const amount = expenseAmountInput.value.trim();
    const category = expenseCategorySelect.value;

    //Validate inputs
    if (!name || !amount || isNaN(amount) || parseFloat(amount) <= 0) {
        alert('Please valid expense details');

        return;

    }

    //create new expense object
    const newExpense = {
        name,
        amount: parseFloat(amount).toFixed(2),
        category
    };

    //Add to expenses array
    expenses.push(newExpense);

    //Save to lacal storage
    localStorage.setItem('expenses', JSON.stringify(expenses));

    //Render expenses
    renderExpenses();

    //Clear inputs
    expenseNameInput.value = '';
    expenseAmountInput.value = '';
    expenseNameInput.focus();

}

//Delete an expense
function deleteExpense(id) {
    expenses.splice(id ,1);
    localStorage.setItem('expenses',JSON.stringify(expenses));
    renderExpenses();
}

//Event Listener
addBtn.addEventListener('click', addExpense);

//Allow adding expenses by pressing Enter in amount field
expenseAmountInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addExpense();
    }
});

//Initial render
 renderExpenses();

});
