// Selecting Elements

const clear = document.getElementById("clear");                  // Get Clear Button

const amountEntered = document.getElementById("inputAmount");    // Get Input amount

const descEntered = document.getElementById("inputDesc");       // Get Input Desciption

const list = document.getElementById("list");                   // Get List Of Expenses

const heading = document.getElementById("headingEl");           // Get Heading Element

// Date
const now = new Date();
const options =  {weekday : "long", month :"short", day : "numeric" };
let getdate = now.toLocaleDateString('en-us', options); 

// Declaring Variables
let id = 0;
let totalExpense = 0;
let expenseArr = [];
let totalText = `Total Expense : ${totalExpense}`
heading.textContent = totalText;


// Check to see if items are already in localstorage
if(localStorage.getItem('Expense') != null) {
    console.log(localStorage.getItem('Expense'));
    expenseArr = JSON.parse(localStorage.getItem('Expense'));
}

// Displaying Previous list
function loadList() {
    for (let key in expenseArr) {
        const itemDesc = expenseArr[key].Desc;
        const itemAmount = expenseArr[key].Amount;
        const itemDate = expenseArr[key].Date;      
        let itemTotal = expenseArr[key].Total;
        let item;
        item = ` <li class="list-group-item d-flex justify-content-between">
        <div class="d-flex flex-column">
             ${itemDesc}
        <small class="text-muted"> ${itemDate} </small>
        </div>
        <div>     
        <span class="px-5"> ${itemAmount}</span>
        <button type="button" class="btn btn-outline-danger btn-sm mx-2" id="${id}"  onclick="DeleteItem(${itemTotal})" job="delete">
        <i class="fas fa-trash-alt"></i>
        </button>
        </div>
        </li>`;
        list.insertAdjacentHTML('beforeend', item);
       
        let totalText = `Total Expense : ${itemTotal}`
            heading.textContent = totalText;
        //     itemTotal += itemAmount;
        //            
    
        
        
            
    }
   
}
loadList();



// Add a New List Item When the Enter Key is Pressed
document.addEventListener('keyup', function(event) {
    let  inputAmountText, expenseDesc ,item, id;
    let expenseAmount;
    if (event.keyCode === 13) {
        // Only if the input is not empty
        
        if (amountEntered.value &&  descEntered.value) {
            inputAmountText = amountEntered.value;
            expenseAmount = parseFloat(inputAmountText,10);    // Converting string to number
            expenseDesc =  descEntered.value;
            if (expenseArr.length > 0) {
                id = expenseArr.length;
            } else {
                id = 0;
            }
              item = ` <li class="list-group-item d-flex justify-content-between">
                       <div class="d-flex flex-column">
                            ${expenseDesc}
                        <small class="text-muted"> ${getdate} </small>
                       </div>
                       <div>     
                       <span class="px-5"> ${expenseAmount}</span>
                       <button type="button" class="btn btn-outline-danger btn-sm mx-2" id="${id}" onclick="DeleteItem(${expenseAmount})" job="delete">
                        <i class="fas fa-trash-alt"></i>
                        </button>
                       </div>
                       </li>`;
            list.insertAdjacentHTML('beforeend', item);
            if(localStorage.getItem('Expense') != null ){
                for (let key in expenseArr) { 
                    totalExpense =  expenseArr[key].Total + expenseAmount ;
                    let totalText = `Total Expense : ${totalExpense}`
                    heading.textContent = totalText;
                }
          }
            else {
                totalExpense = totalExpense +  expenseAmount ;
                let totalText = `Total Expense : ${totalExpense}`
               heading.textContent = totalText;
            }
            expenseArr.push({Desc: expenseDesc, Amount: expenseAmount, Total:totalExpense, Date:getdate, id: id,  trash: false});
            localStorage.setItem('Expense', JSON.stringify(expenseArr));
            console.log(expenseArr);
            id++;
        }
        // Clear the input value
        amountEntered.value = '';
        descEntered.value = '';
       
    }});

// Add a New List Item When the Add Button is Pressed 
//Event listener
document.getElementById("addinfo").addEventListener("click",addExpense,false);
// Onclick event this function fires
function addExpense(){

    let  inputAmountText, expenseDesc ,item, id;
    let expenseAmount;
    // Only if the input is not empty
    if (amountEntered.value &&  descEntered.value) {
        inputAmountText = amountEntered.value;
        expenseAmount = parseFloat(inputAmountText,10);    // Converting string to number
        expenseDesc =  descEntered.value;
        if (expenseArr.length > 0) {
            id = expenseArr.length;
        } else {
            id = 0;
        }
          item = ` <li class="list-group-item d-flex justify-content-between">
                   <div class="d-flex flex-column">
                        ${expenseDesc}
                    <small class="text-muted"> ${getdate} </small>
                    </div>
                   <div>     
                   <span class="px-5"> ${expenseAmount}</span>
                   <button type="button" class="btn btn-outline-danger btn-sm mx-2" id="${id}" onclick="DeleteItem(${expenseAmount})" job="delete">
                   <i class="fas fa-trash-alt"></i>
                    </button>
                   </div>
                   </li>`;
        list.insertAdjacentHTML('beforeend', item);
        if(localStorage.getItem('Expense') != null ){
            for (let key in expenseArr) { 
                totalExpense =  expenseArr[key].Total + expenseAmount ;
                let totalText = `Total Expense : ${totalExpense}`
                heading.textContent = totalText;
            }
      }
        else {
            totalExpense = totalExpense +  expenseAmount ;
            let totalText = `Total Expense : ${totalExpense}`
           heading.textContent = totalText;
        }
        
        expenseArr.push({Desc: expenseDesc, Amount: expenseAmount, Total:totalExpense, Date:getdate, id: id,  trash: false});
        localStorage.setItem('Expense', JSON.stringify(expenseArr));
        //console.log(expenseArr);
        id++;
    }
    // Clear the input value
    amountEntered.value = '';
    descEntered.value = '';
  
};

// Delete Button
function DeleteItem(amount){
    
        totalExpense -= amount;
        heading.textContent = `Total Expense : ${totalExpense}`
    }
    
    


  
// Delete values
list.addEventListener('click', function(event) {
    const element = event.target;
    const children = element.childNodes;
      
if (children[1].classList.contains('fa-trash-alt')) {
    // If the element is trashed
    element.parentNode.parentNode.remove(element.parentNode);
    for (let key in expenseArr) {
        if (expenseArr[key].id == element.id) {
            expenseArr[key].trash = true;
            expenseArr.splice(key, 1);
       
        }
        
    }
    

    
    console.log(expenseArr);
    for (let key in expenseArr) {
        expenseArr[key].id = key;
    }
    console.log(expenseArr);
}


// Reset the Local Storage
localStorage.removeItem('Expense');
localStorage.setItem('Expense', JSON.stringify(expenseArr));
});

// // Clear the Local Storage
 clear.addEventListener('click', function() {
localStorage.removeItem('Expense');
location.reload();
});//




 