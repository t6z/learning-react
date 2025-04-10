import { useState } from 'react'
import './App.css'

function TodoList({items, handleDelete, handleEdit}) {
  const listItems = items.map((item,index) => (
    <TodoItem
      index={index}
      item={item}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  ))

  return (
    <>
    <ul>
      {listItems}
    </ul>
    </>
  )
}

function TodoItem({index, item, handleDelete, handleEdit}) {
  const [editing,setEditing] = useState(false);
  const [newText, setNewText] = useState("");

  function finishEditing() {
    setEditing(false);
    handleEdit(index, newText);
  }

  if (editing) {
    return (
      <li
        key={index}
      >
        <input onChange={(e) => setNewText(e.target.value)}/>
        <button onClick={() => finishEditing()}>done editing</button>
      </li>
    )
  } else {
    return (
      <li
        key={index}
      >
        {item}
        <button onClick={() => handleDelete(index)}>delete</button>
        <button onClick={() => setEditing(true)}>edit</button>
      </li>
    )
  }
}

function AddTodo({handleChange, handleAdd}) {
  return (
    <>
      <input
        onChange={(e) => handleChange(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </>
  )
}

function FilterTodo() {

}

export default function App() {
  const [items, setItems] = useState(["one","two","three"]);
  const [addItem, setAddItem] = useState("");

  function handleAddTodo() {
    if (addItem === "") {
      return;
    }
    setItems([...items, addItem]);
  }

  function handleDeleteTodo(index) {
    setItems([...items].toSpliced(index,1));
  }

  function handleEditTodo(index, newText) {
    const newItems = [...items];
    newItems[index] = newText;
    setItems(newItems);
  }

  return (
    <>
    <h1>TODO List</h1>
    <AddTodo
      handleChange={(val) => setAddItem(val)}
      handleAdd={() => handleAddTodo()}
    />
    <FilterTodo />
    <TodoList
      items={items}
      handleDelete={(index) => handleDeleteTodo(index)}
      handleEdit={(index, newText) => handleEditTodo(index, newText)}
    />
    </>
  )
}
