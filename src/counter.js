export function sumArray(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i].amount;
  }
  return Number(sum.toFixed(2));
}

export function updateBalance() {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const credits = JSON.parse(localStorage.getItem("credits")) || [];
  const balanceAmount = sumArray(credits) - sumArray(expenses);
  const balanceElement = document.getElementById("balance");
    if (balanceElement) {
    balanceElement.innerHTML = `₱${balanceAmount.toFixed(2)}`;
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
  
      if (currentBalance <= 0) {
        alert("Insufficient Balance. Add credit before recording more expenses.");
        return;
      }
      if (currentBalance - expense < 0) {
        alert("WARNING! Insufficient balance.");
        return;
      }

    const currentDate = new Date().toLocaleDateString();
    expenses.push({ amount: expense, date: currentDate });
    localStorage.setItem('expenses', JSON.stringify(expenses));

    if (segment.value == 'expense') {
      displayList(expenses, listElement, segment);
    }

    const total = sumArray(expenses);

    showExp.innerHTML = `Total Expense: ₱${total}`;
    totalSpent.innerHTML = `₱${total.toFixed(2)}`;
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