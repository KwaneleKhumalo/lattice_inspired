let sectionContainer = document.querySelector('.container');
let addTodoBtn = document.querySelector('.create-btn');
let todoForm = document.querySelector('.todo-list-container');
let closeTodoForm = document.querySelector('.close-btn');
let tableContainer = document.querySelector('.table-body-container');
let totalListItems = document.querySelector('.total-list');
let date = new Date();
let today = date.toLocaleDateString();


// Input validation
let todoInput = document.querySelectorAll('.todo-input');
let submitTodoBtn = document.querySelector('.submit-todo');



// Event Listeners
submitTodoBtn.addEventListener('click', todoValidation);
addTodoBtn.addEventListener('click', toggleForm);
closeTodoForm.addEventListener('click', closeForm)


// Functions
function todoValidation() {
    todoInput.forEach(inputField => {

        if(inputField.value === '')
        {
            alert('Add something');
            return false
        }

    });
}




// Form Modal
function toggleForm() {
    if(addTodoBtn)
    {
        todoForm.classList.add('open');
    } else
    {
        todoForm.classList.remove('open')
    }
   
}
// Close Modal
function closeForm() {
    if(closeTodoForm)
    {
        todoForm.classList.remove('open')
    } 
}



// get List Items
const getListItems = () => {
    // Fetch the data from the backend
    fetch('http://localhost:3000/todo-item').then((res) => res.json()).then((data) => {

        if(data.length === '')
        {
            totalListItems.innerText = `${data.length} TASK/S`; //Number of list items.
        } else if(data.length === 1)
        {
            totalListItems.innerText = `${data.length} TASK`;
        } else if(data.length > 1)
        {
            totalListItems.innerText = `${data.length} TASKS`;
        }
        



        data.map((todoList) => {

    // Declare output variables
            let divider = document.createElement('hr');
            let tableItemsContainer = document.createElement('div')
            let tableItemsTitle = document.createElement('div');
            let tableItemsInfo = document.createElement('div');

            let todoTitle = document.createElement('strong');
            let todoDesc = document.createElement('strong');
            let dueDate = document.createElement('strong');
            let dateCreated = document.createElement('strong');

            

    // Add Classes to the arrays
            divider.classList.add('container-divider');
            tableItemsContainer.classList.add('table-items');
            tableItemsTitle.classList.add('table-items-title');
            tableItemsInfo.classList.add('table-items-info')
             todoTitle.classList.add('todo-title');
             todoDesc.classList.add('todo-desc');
             dueDate.classList.add('due-date');
            

    // Append Elements to the container

            tableItemsTitle.appendChild(todoTitle);
            tableItemsTitle.appendChild(todoDesc);

            tableItemsInfo.appendChild(dateCreated);
            tableItemsInfo.appendChild(dueDate);


            tableItemsContainer.appendChild(tableItemsTitle)
            tableItemsContainer.appendChild(tableItemsInfo)
            tableContainer.appendChild(tableItemsContainer)
            tableContainer.appendChild(divider);

    
    //Iteration   
            todoTitle.innerText = todoList.todoTitle;
            todoDesc.innerText = todoList.todoDesc;
            dueDate.innerText = todoList.dueDate;
            dateCreated.innerText = today;


        })

    })
}

getListItems();