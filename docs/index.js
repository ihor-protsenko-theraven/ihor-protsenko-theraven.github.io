const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOpt = document.querySelector(".filter-todo")

todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOpt.addEventListener('click', filterTodo)
document.addEventListener('DOMContentLoaded', getTodo)

function addTodo(event) {

    event.preventDefault()

    const todoDiv = document.createElement("div")
    todoDiv.classList.add('todo')

    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)

    saveTodos(todoInput.value)

    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)

    const deletedButton = document.createElement('button')
    deletedButton.innerHTML = '<i class="fas fa-trash"></i>'
    deletedButton.classList.add('trash-btn')
    todoDiv.appendChild(deletedButton)

    if(todoInput.value !== ''){
        todoList.appendChild(todoDiv)
        todoInput.value = ''
    }
}

function deleteCheck(e){
    const item = e.target
    console.log(item.classList);
    if (item.classList[0].includes('trash')) {
        item.parentElement.classList.add('fall')
        removeTodo( item.parentElement)
        item.parentElement.addEventListener('transitionend',()=> {
           item.parentElement.remove()
       })
    }
    if(item.classList[0].includes('complete') ){
        item.parentElement.classList.toggle('completed')
    }

}

function filterTodo(e) {
    const todos = todoList.childNodes
    todos.forEach((todo) => {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex'
                break
            case "completed":
                todo.classList.contains('completed') ? todo.style.display = 'flex': todo.style.display = 'none'
                break
            case "uncompleted":
                !todo.classList.contains('completed') ? todo.style.display = 'flex' : todo.style.display = 'none'
                break
                
        }
    })
}

function saveTodos(todo) {
    let todos
    localStorage.getItem('todos') === null ? todos = [] : todos= JSON.parse(localStorage.getItem('todos'))
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodo() {

    let todos
    localStorage.getItem('todos') === null ? todos = [] : todos = JSON.parse(localStorage.getItem('todos'))
    
    todos.forEach((todo) => {
        const todoDiv = document.createElement("div")
        todoDiv.classList.add('todo')

        const newTodo = document.createElement('li')
        newTodo.innerText = todo
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)


        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton)

        const deletedButton = document.createElement('button')
        deletedButton.innerHTML = '<i class="fas fa-trash"></i>'
        deletedButton.classList.add('trash-btn')
        todoDiv.appendChild(deletedButton)

         todoList.appendChild(todoDiv)
    })
}

function removeTodo(todo ) {
    let todos
    localStorage.getItem('todos') === null ? todos = [] : todos = JSON.parse(localStorage.getItem('todos'))
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem("todos", JSON.stringify(todos))
}