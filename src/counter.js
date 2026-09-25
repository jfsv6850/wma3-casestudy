export function setUserName(nameInput, welcome, modal) {
  const userName = nameInput.value.toUpperCase();
  if (!userName || userName.length > 10) {
    alert("Please enter a valid name (Maximum 10 characters).");
    return;
  }
  localStorage.setItem("name", userName);
  welcome.innerHTML = `WELCOME, ${userName}!`;
  modal.style.display = "none";
}

export function sumArray(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i].amount;
  }
  return sum;
}

export function updateBalance() {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const credits = JSON.parse(localStorage.getItem("credits")) || [];
  const balanceAmount = sumArray(credits) - sumArray(expenses);
  const balanceElement = document.getElementById("balance");
  if (balanceElement) {
    balanceElement.innerHTML = `Balance: ₱${balanceAmount.toFixed(2)}`;
    
    if (balanceAmount < 0) {
      balanceElement.style.color = "red";
      return;
    } else {
      balanceElement.style.color = "inherit";
    }
  }
}

export function addExpense(inputExp, addExp, showExp, totalSpent, listElement, segment) {
    addExp.addEventListener('click', () => {
        const expense = Number(inputExp.value);
        if (!expense || expense <= 0) {
            alert("Input a valid value.");
            return;
        }
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const creds = JSON.parse(localStorage.getItem('credits')) || [];
        const currentBalance = sumArray(creds) - sumArray(expenses);
        if (currentBalance - expense < 0) {
          alert("WARNING! You have insufficient balance.");
        }
      
        const currentDate = new Date().toLocaleDateString();
        expenses.push({ amount: expense, date: currentDate });
        localStorage.setItem('expenses', JSON.stringify(expenses));

        if (segment.value == 'expense') {
            displayList(expenses, listElement, segment);
        }

        const total = sumArray(expenses);
        showExp.innerHTML = `Total Expense: ₱${total}`;
        totalSpent.innerHTML = `Total Spent: ₱${total.toFixed(2)}`;
        updateBalance();
        inputExp.value = '';
    });
}

export function addCredits(inputCred, addCred, showCred, listElement, segment) {    
    addCred.addEventListener('click', () => {
        const amount = Number(inputCred.value);
        if (!amount || amount <= 0) {
            alert("Input a valid value.");
            return;
        }
        const credits = JSON.parse(localStorage.getItem('credits')) || [];

        const currentDate = new Date().toLocaleDateString();
        credits.push({ amount, date: currentDate });
        localStorage.setItem('credits', JSON.stringify(credits));
        
        if (segment.value == 'credit') {
            displayList(credits, listElement, segment);
        }

        showCred.innerHTML = `Total Credits: ₱${sumArray(credits)}`;
        updateBalance();
        inputCred.value = '';
    });
}

export function showTotals(segment, listElement) {
    let key = 'credits';
    if (segment.value == 'expense') {
        key = 'expenses';
    }
    const entries = JSON.parse(localStorage.getItem(key)) || [];
    displayList(entries, listElement, segment);

    segment.addEventListener('ionChange', () => {
        let key = 'credits';
        if (segment.value == 'expense') {
            key = 'expenses';
        }
        const entries = JSON.parse(localStorage.getItem(key)) || [];
        displayList(entries, listElement, segment);
    });
}

function displayList(entries, listElement, segment) {
  if (!entries || entries.length == 0) {
    let type = "expense";
    if (segment.value == "credit") {
      type = "credit";
    }
    listElement.innerHTML = `<ion-item>No ${type} recorded yet.</ion-item>`;
    return;
  }
  if (segment.value == "expense") {
    listElement.innerHTML = entries
      .map((i) => `<ion-item>- ₱${i.amount} <small style="margin-left: auto; color: gray;">${i.date || ''}</small></ion-item>`).join("");
  } else if (segment.value == "credit") {
    listElement.innerHTML = entries
      .map((i) => `<ion-item>+ ₱${i.amount} <small style="margin-left: auto; color: gray;">${i.date || ''}</small></ion-item>`).join("");
  }
}

export function clear(clearButton) {
    clearButton.addEventListener('click', () => {
        localStorage.clear();
        alert("Data cleared.")
        window.location.reload();
    });
}