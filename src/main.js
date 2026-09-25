import './style.css'
import '@ionic/core/dist/ionic/ionic.esm.js'
import '@ionic/core/css/ionic.bundle.css'

import { setUserName } from './counter.js'
import { addExpense } from './counter.js'
import { addCredits } from './counter.js'
import { clear } from './counter.js'
import { showTotals } from './counter.js'
import { updateBalance } from './counter.js'
import { sumArray } from './counter.js'

document.querySelector('#app').innerHTML = `
<div id="modalName" 
  style="position:fixed; 
  inset: 0; 
  background:rgba(29, 3, 37, 0.81); 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  z-index: 1000;">
  <div style="background: white; padding:30px; border-radius:15px;">
    <ion-input id="nameInput" label="Enter Name" label-placement="floating" style="font-size: 30px;"></ion-input>
    <ion-button id="nameOk" style="width: 100%; height: 50px; margin-top: 50px;"> OKAY </ion-button>
  </div>
</div>

<div id="bb">
  <ion-card>
    <ion-card-title><ion-icon name="wallet-sharp"></ion-icon> BudgetBuddy</ion-card-title>
  </ion-card>
</div>


<div id="head">
  <ion-card>
    <ion-card-header>
      <ion-card-title id="welcome"> WELCOME </ion-card-title>
    </ion-card-header>
  </ion-card>
</div>

<div class="layout">
<div class="contents">
<div id="sub">
  <ion-card>
  <ion-card-title> CURRENT BALANCE: </ion-card-title>
    <ion-card-subtitle id="balance">₱0.00</ion-card-subtitle>
  </ion-card>

  <ion-card>
  <ion-card-title> TOTAL SPENT: </ion-card-title>
    <ion-card-subtitle id="totalSpent">₱0.00</ion-card-subtitle>
  </ion-card>
  </div>
</div>



<div id="actions">
  <div id="exp">
    <ion-card>
      <ion-card-header>
        <ion-card-subtitle><ion-icon name="add-sharp"></ion-icon> ADD EXPENSE </ion-card-subtitle>
      </ion-card-header>
    
      <ion-item>
        <ion-input id="inputExp" label="PHP" label-placement="floating" type="number" placeholder="0" min="0"></ion-input>
        <ion-button id="addExp">Enter</ion-button>
      </ion-item><br>
      
      <ion-item id="showExp"> Total Expense: </ion-item>
    </ion-card>
  </div>

  <div id="cred">
    <ion-card>
      <ion-card-header>
        <ion-card-subtitle> <ion-icon name="card-sharp"></ion-icon> ADD CREDIT </ion-card-subtitle>
      </ion-card-header>

      <ion-item>
        <ion-input id="inputCred" label="PHP" label-placement="floating" type="number" placeholder="0" min="0"></ion-input>
        <ion-button id="addCred">Enter</ion-button>
      </ion-item><br>
      
      <ion-item id="showCred">Total Credits: </ion-item>
    </ion-card>
  </div>
</div>

<div id="display">
  <ion-card id="listTitle">
    <ion-title><ion-icon name="calendar-number-sharp"></ion-icon> 
      BUDGET HISTORY 
    </ion-title><br>

    <ion-segment id="showTotal">
      <ion-segment-button value="expense">
        <ion-label> Expense </ion-label>
      </ion-segment-button>
      
      <ion-segment-button value="credit">
        <ion-label> Credit </ion-label>
      </ion-segment-button>
    </ion-segment>
  </ion-card>

  <ion-list id="expList"> </ion-list>
</div>

</div>

<br>

<ion-button id="clearButton"> CLEAR INPUTS </ion-button>
`

const segment = document.querySelector('ion-segment');
const expenseList = document.getElementById('expList');

const inputExp = document.getElementById('inputExp');
const addExp = document.getElementById('addExp');
const showExp = document.getElementById('showExp');
const totalSpent = document.getElementById('totalSpent');
addExpense(inputExp, addExp, showExp, totalSpent, expenseList, segment);

const inputCred = document.getElementById('inputCred');
const addCred = document.getElementById('addCred');
const showCred = document.getElementById('showCred');
addCredits(inputCred, addCred, showCred, expenseList, segment);


const nameInput = document.getElementById('nameInput');
const welcome = document.getElementById('welcome');
const modalName = document.getElementById('modalName');
const nameOk = document.getElementById('nameOk');
const savedName = localStorage.getItem('name');

if (savedName) {
  welcome.innerHTML = `WELCOME, ${savedName}!`;
    modalName.style.display = 'none';
} else {
    nameOk.addEventListener('click', () => setUserName(nameInput, welcome, modalName)); 
}

showTotals(segment, expenseList);
updateBalance();

const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
const savedCredits = JSON.parse(localStorage.getItem('credits')) || [];

document.getElementById('showExp').innerHTML = `Total Expense: ₱${sumArray(savedExpenses)}`;
document.getElementById('showCred').innerHTML = `Total Credits: ₱${sumArray(savedCredits)}`;
document.getElementById('totalSpent').innerHTML = `₱${sumArray(savedExpenses).toFixed(2)}`;

const clearButton = document.getElementById('clearButton');
clear(clearButton);