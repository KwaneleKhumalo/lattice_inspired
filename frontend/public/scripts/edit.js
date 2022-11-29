let idParams = new URLSearchParams(window.location.search).get('id');
let editForm = document.getElementById('edit-form');
let editBtn = document.querySelector('.edit-btn');
editForm.style.display = 'none';

fetch(`http://localhost:3000/todo-items/${idParams}`, {
        method: 'GET',
    })
    .then(res => res.json())
    .then(res => {
        const todo = res.findSingleItem;
        editItem(todo);
    });

const editItem =  (todo) =>  {
    let currentTitle = document.getElementById('title').value = todo.todoTitle;
    let currentDesc = document.getElementById('desc').value = todo.todoDesc;
    document.getElementById('hidden-id').value = todo._id
    document.getElementById('loading').style.display = 'none';
    editForm.style.display = 'inline-block';

    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        let updatedTitle = document.getElementById('title').value;
        let updatedDesc = document.getElementById('desc').value;
        let testTitle = {todoTitle: updatedTitle, todoDesc: updatedDesc}
        const url = `http://localhost:3000/todo-items/${idParams}`;

        // const editItem = await axios.patch(url, testTitle);
        // console.log(editItem.status);

        if(updatedTitle === '' || updatedDesc === ''){
            alert('Cannot submit blank items');
            return false;
        } 
        else if (updatedTitle === currentTitle || updatedDesc === currentDesc) {
            alert('no changes made');
            return false
        }
        else {
            const editItem = await axios.patch(url, testTitle);
            if(editItem.status === 200){
                alert('Item Has been edited!')
            }
        }
    });
};