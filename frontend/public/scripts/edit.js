let idParams = new URLSearchParams(window.location.search).get('id');
document.getElementById('edit-form').style.display = 'none';

fetch('http://localhost:3000/todo-items/'+idParams, {
        method: 'GET',
    })
    .then(res => res.json())
    .then(res => {
        const todo = res.findSingleItem;
        createTodoItem(todo);
    });


const createTodoItem = (todo) => {
    document.getElementById('title').value = todo.todoTitle
    document.getElementById('desc').value = todo.todoDesc
    document.getElementById('hidden-id').value = todo._id

    document.getElementById('loading').style.display = 'none';
    document.getElementById('edit-form').style.display = 'inline-block';

}