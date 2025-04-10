import { useState } from 'react'

function TodoList({items, handleDelete, handleEdit}) {
  const listItems = items.map((item) => (
    <TodoItem
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

function TodoItem({item, handleDelete, handleEdit}) {
  const [editing,setEditing] = useState(false);
  const [newText, setNewText] = useState("");

  function finishEditing() {
    setEditing(false);
    handleEdit(item.id, newText);
  }

  if (editing) {
    return (
      <li
        key={item.id}
      >
        <input onChange={(e) => setNewText(e.target.value)}/>
        <button onClick={() => finishEditing()}>done editing</button>
      </li>
    )
  } else {
    return (
      <li
        key={item.id}
      >
        {item.name}
        <button onClick={() => handleDelete(item.id)}>delete</button>
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
  const [items, setItems] = useState([
    {id: 0, name: "one"},
    {id: 1, name: "two"},
    {id: 2, name: "three"}]);
  const [addItem, setAddItem] = useState("");

  function handleAddTodo() {
    if (addItem === "") {
      return;
    }
    const newItem = { id: items.length, name:addItem };
    setItems([...items, newItem]);
  }

  function handleDeleteTodo(id) {
    // Remove item
    const updatedItems = items.filter(item => item.id !== id);

    // Reassign keys
    const rekeyedItems = updatedItems.map((item, index) => ({
      ...item,
      id: index,
    }));

    // Set Items
    setItems(rekeyedItems);
  }

  function handleEditTodo(id, newText) {
    const newItems = items.map((item) => (
      item.id === id ? { ...item, name: newText } : item
    ));
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
