import React, { useState, useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const initialState = {
    todos: [
    ]
  };

  function reducer(state, action) {
    switch (action.type) {
      case "ADD_TODO":
        return {
          ...state,
          todos: [
            ...state.todos,
            {
              title: action.payload.title,
              time: action.payload.time,
              id: uuidv4() // Generate unique ID for the new todo
            }
          ]
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const [title, setTitle] = useState("");

  const handleCreateTodo = () => {
    dispatch({
      type: "ADD_TODO",
      payload: {
        title: title,
        time: new Date().toLocaleTimeString(),
      }
    });
    setTitle("");
  };

  return (
    <>
      <h1 className="font-black text-[54px] block text-center mt-[200px]">Todos List</h1>
      <div className="w-[600px] h-[200px] bg-[#7676eb] mx-auto p-[30px]">
        <input
          type="text"
          placeholder="Enter Title"
          className="bg-white w-full py-[10px] px-[10px] font-medium"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="block w-full bg-[#121284] mt-[50px] py-[12px] text-[white] font-medium"
          onClick={handleCreateTodo}
        >
          Create Todo
        </button>
      </div>

      <div className="mt-8 mx-auto w-[600px]">
        <h2 className="text-2xl font-bold mb-4">Todos:</h2>
        <div className="w-[600px] flex items-center justify-between">
          <p>ID</p>
          <p>Title</p>
          <p>Time</p>
          <p>Checked</p>
        </div>
        <ul>
          {state.todos.map((todo, i) => (
            <li key={todo.id} className="bg-gray-200 p-2 mb-2 rounded">
              <div className="w-[600px] flex items-center justify-between px-[20px] py-[5px]">
                <p>{i+1}</p>
                <p>{todo.title}</p>
                <p>{todo.time}</p>
                <p>Completed</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
