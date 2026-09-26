import './style.css'
import '@ionic/core/dist/ionic/ionic.esm.js'
import '@ionic/core/css/ionic.bundle.css'


import { addExpense } from './counter.js'
import { addCredits } from './counter.js'
import { clear } from './counter.js'
import { showTotals } from './counter.js'
import { updateBalance } from './counter.js'
import { sumArray } from './counter.js'

document.querySelector('#app').innerHTML = `

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
    <ion-card-subtitle><ion-icon name="calendar-number-sharp"></ion-icon> 
      BUDGET HISTORY 
    </ion-card-subtitle><br>

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

<ion-button id="clearButton"> RESET </ion-button>
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

showTotals(segment, expenseList);
updateBalance();

const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
const savedCredits = JSON.parse(localStorage.getItem('credits')) || [];

document.getElementById('showExp').innerHTML = `Total Expense: ₱${sumArray(savedExpenses)}`;
document.getElementById('showCred').innerHTML = `Total Credits: ₱${sumArray(savedCredits)}`;
document.getElementById('totalSpent').innerHTML = `₱${sumArray(savedExpenses).toFixed(2)}`;

const clearButton = document.getElementById('clearButton');
clear(clearButton);