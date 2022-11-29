let sectionContainer = document.querySelector('.container');
let addTodoBtn = document.querySelector('.create-btn');
let todoForm = document.querySelector('.todo-list-container');
let closeTodoForm = document.querySelector('.close-btn');
let tableContainer = document.querySelector('.table-body-container');
let totalListItems = document.querySelector('.total-list');
let deleteForm = '';
let date = new Date();
let today = date.toLocaleDateString();



// Input validation
let todoInput = document.querySelectorAll('.todo-input');
let submitBtn = document.getElementById('todo-submit');

// Event Listeners
addTodoBtn.addEventListener('click', toggleForm);
closeTodoForm.addEventListener('click', closeForm)

// Functions

// Post list item to the server. 
submitBtn.addEventListener('submit', async (event) => {
    event.preventDefault();
    const url = 'http://localhost:3000/todo-items';
    let todoTitle = document.getElementById('todo-title').value;
    let todoDesc = document.getElementById('todo-desc').value;
    let dueDate = document.getElementById('todo-date').value;

    // Post
    if(todoTitle === '' || todoDesc === '' || dueDate === '')
        {
            alert('All Fields are required!');
            return false;

        } else {

        let validTodoItems = {todoTitle: todoTitle, todoDesc: todoDesc,dueDate: dueDate };

        try {
            const response = await axios.post (url, validTodoItems)
                if (response) {
                    
                    window.location.replace('http://127.0.0.1:5555/frontend/public/todo.html');
                    console.log(response);
                } 
            } catch (error) {
                console.log(error);
            }
// return products
    todoTitle.value = '';
    todoDesc.value = '';
    dueDate.value = '';
        };
});

// List items
const getListItems = () => {      
    // Fetch the data from the backend
    fetch('http://localhost:3000/todo-items').then((res) => res.json()).then((data) => {

        //Data is object with an Array FindDailyItem.
        let allItems = data.findDailyItem;
        createTodo(allItems);

        if(allItems.length < 1)
        {
            totalListItems.innerText = ` You currently have ${allItems.length} TASKS`; 
        } else if(allItems.length === 1)
        {
            totalListItems.innerText = `${allItems.length} TASK`;
        } else if(allItems.length > 1)
        {
            totalListItems.innerText = `${allItems.length} TASKS`;
        }

    });
};
const createTodo = (data) => {
    console.log(data);
    document.getElementById('todo-table').innerHTML += `<div class="todo-table-header">
    <div class="todo-table-header-title">
        <strong class="action">Action</strong>
        <strong class="title">Title</strong>
        <strong class="table-desc">Description</strong>
    </div>
    <div class="todo-table-header-items">
        <strong>Date Created
            <i class="material-icons">unfold_more</i>
        </strong>
        <strong>Due Date
            <i class="material-icons">unfold_more</i>
        </strong>
    </div>
</div>`;
    data.map((item) => {
        document.getElementById('table-body-container').innerHTML += `
        <div class="table-items">
            <div class="table-items-title">
                <div class="action">
                    <a class ='edit-btn'href="edit.html?id=${ item._id }" >
                        <i class="edit-btn material-icons">create</i>
                    </a>
                    <button waves-effect waves-teal onclick="removeItem('${item._id}')"> <i class="material-icons">delete_forever</i></button>
                </div>
                <p>${ item.todoTitle }</p>
                <p>${ item.todoDesc }</p>
            </div>
            <div class="table-items-info">
                <p>${ today }</p>
                <p>${ item.dueDate } </p>
            </div>
        </div>
        <hr class="container-divider">

        `
    });
}

const removeItem = (id) => {
    fetch('http://localhost:3000/todo-items/'+id, {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(res => console.log(res));
    window.location.replace('http://127.0.0.1:5555/frontend/public/todo.html');
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


getListItems();
