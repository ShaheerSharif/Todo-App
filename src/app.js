const todoNote = document.getElementById('todoNoteID')
const todoList = document.getElementById('todoListID')

// dark background will have white text
// light background will have black text

const bgColors = [
  {id: 'dark-pink',   value: '#880e4f'},
  {id: 'dark-indigo', value: '#3949ab'},
  {id: 'dark-teal',   value: '#00695c'},
  {id: 'dark-grey',   value: '#424242'},
  {id: 'light-brown', value: '#bcaaa4'},
  {id: 'light-cyan',  value: '#4dd0e1'},
  {id: 'light-blue',  value: '#42a5f5'},
  {id: 'light-red',   value: '#e57373'},
]

function randomNumber(limit, startVal=0) {
  return Math.round(Math.random() * limit) + startVal
}

function getTextColor(colorID) {
  switch (colorID.substring(0, colorID.indexOf('-'))) {
    case 'dark':
      return '#fafafa'  // white text for dark background
    case 'light':
      return '#212121'  // black text for light background
    default:
      alert('Incorrect color id')
  }
}

let todos = []

function addNote() {
  const note = todoNote.value

  // If there is no text in the field
  if (note === '') {
    alert('Please fill out the field')
    return
  }

  const time = new Date()
  const month = time.getMonth().toLocaleString('en-US', {month: 'long'})
  const day = time.getDay().toLocaleString('en-US', {day: 'short'})
  const tempColor = bgColors[randomNumber(bgColors.length - 1)]
  
  // Push the curent task to todo-list
  todos.push({
    id: Date.now(),
    text: note,
    date: `${time.getDate()} ${month} ${time.getFullYear()}`,
    time: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
    day : day,
    bgcolor: tempColor.value,
    textcolor: getTextColor(tempColor.id)
  })

  // Reset the value of the field
  todoNote.value = ''

  // Renew the todo list
  renew()
}

function removeNote(id) {
  // Find the index of the note using todo.id attribute
  const todoIndex = todos.findIndex( todo => todo.id === id )

  // If index is not found
  if (todoIndex === -1) {
    return
  }

  // Remove the todos from the index
  todos.splice(todoIndex, 1)

  // Update list of todos
  renew()
}

function removeAll() {
  todoList.innerHTML = ''
  todos.splice(0)
}

function renew() {
  // Reset the list every time the renew() function is called
  todoList.innerHTML = ''

  todos.forEach( (todo) => {
    todoList.innerHTML = todoList.innerHTML.concat(`

    <div class='noteContainer' id='noteContainer${todo.id}'>
      <div class='noteContainerText' id='noteContainerText${todo.id}'>
        <p class='noteText' id='noteText${todo.id}'>${todo.text}</p>
      </div>
      <div class='noteContainerButton' id='noteContainerButton${todo.id}'>
        <button type='button' class='removeBtn' id='removeBtn${todo.id}' onclick='removeNote(${todo.id})'> 
        Remove
        </button>
      </div>
    </div>

    `)

    const noteContainer = document.getElementById(`noteContainer${todo.id}`)
    const noteContainerText = document.getElementById(`noteContainerText${todo.id}`)
    const noteContainerButton = document.getElementById(`noteContainerButton${todo.id}`)
    const noteText = document.getElementById(`noteText${todo.id}`)
    
    noteContainer.style.backgroundColor = todo.bgcolor
    noteContainerText.style.backgroundColor = 'inherit'
    noteContainerButton.style.backgroundColor = 'inherit'
    noteText.style.color = todo.textcolor
    noteText.style.backgroundColor = 'inherit'
  })
}
